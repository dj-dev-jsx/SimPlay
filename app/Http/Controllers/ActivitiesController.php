<?php

namespace App\Http\Controllers;

use App\Models\Activities;
use App\Models\Classes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ActivitiesController extends Controller
{
    /* =========================================
     * TEACHER – CLASSES WITH ACTIVITY ACCESS
     * ========================================= */
    public function teacher_activities()
    {
        $classes = Classes::withCount([
                'students as student_count' => function ($q) {
                    $q->role('student');
                }
            ])
            ->with(['students' => function ($q) {
                $q->role('student');
            }])
            ->where('teacher_id', Auth::id())
            ->get();

        return Inertia::render('Teacher/Activities', [
            'initialClasses' => $classes,
        ]);
    }

    /* =========================================
     * LIST ACTIVITIES FOR A CLASS
     * ========================================= */
    public function list_of_activities($classId)
    {
        $class = Classes::with([
                'activities' => function ($q) {
                    $q->latest();
                }
            ])
            ->where('teacher_id', Auth::id())
            ->findOrFail($classId);

        return Inertia::render('Teacher/ListOfActivities', [
            'classroom' => $class,
            'activities' => $class->activities,
        ]);
    }

    /* =========================================
     * STORE ACTIVITY
     * ========================================= */
    public function store_activity(Request $request, $classId)
    {
        $request->validate([
            'title'        => 'required|string|max:255',
            'introduction' => 'nullable|string',
            'instructions' => 'nullable|string',
            'category'     => 'nullable|in:pre_activity,concept_activity,application,reference',
            'image'        => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $path = null;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('activities', 'public');
        }

        $activity = Activities::create([
            'class_id'     => $classId,
            'title'        => $request->title,
            'introduction' => $request->introduction,
            'instructions' => $request->instructions,
            'category'     => $request->category,
            'image_path'   => $path,
            'created_by'   => Auth::id(),
        ]);

        return response()->json([
            'activity' => $activity
        ], 201);
    }

    /* =========================================
     * UPDATE ACTIVITY
     * ========================================= */
    public function update_activity(Request $request, $activityId)
    {
        $activity = Activities::where('created_by', Auth::id())
            ->findOrFail($activityId);

        $request->validate([
            'title'        => 'required|string|max:255',
            'introduction' => 'nullable|string',
            'instructions' => 'nullable|string',
            'category'     => 'nullable|in:pre_activity,concept_activity,application,reference',
            'image'        => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if (
                $activity->image_path &&
                Storage::disk('public')->exists($activity->image_path)
            ) {
                Storage::disk('public')->delete($activity->image_path);
            }

            $activity->image_path = $request->file('image')->store('activities', 'public');
        }

        $activity->update([
            'title'        => $request->title,
            'introduction' => $request->introduction,
            'instructions' => $request->instructions,
            'category'     => $request->category,
        ]);

        return response()->json([
            'activity' => $activity
        ]);
    }

    /* =========================================
     * DELETE ACTIVITY
     * ========================================= */
    public function delete_activity($activityId)
    {
        $activity = Activities::where('created_by', Auth::id())
            ->findOrFail($activityId);

        if (
            $activity->image_path &&
            Storage::disk('public')->exists($activity->image_path)
        ) {
            Storage::disk('public')->delete($activity->image_path);
        }

        $activity->delete();

        return response()->json([
            'message' => 'Activity deleted successfully.'
        ]);
    }
}

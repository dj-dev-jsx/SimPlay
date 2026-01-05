<?php

namespace App\Http\Controllers;

use App\Models\Activities;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentActivitiesController extends Controller
{
    /**
     * Default activities page (optional / legacy)
     */
    public function student_activities()
    {
        $student = Auth::user();

        $class = $student->classesAsStudent()
            ->with('activities')
            ->first();

        return Inertia::render('Student/Activities', [
            'class' => $class,
            'activities' => $class?->activities ?? [],
            'category' => null,
        ]);
    }

    /**
     * Single activity page
     */
    public function show($id)
    {
        $student = Auth::user();

        $activity = Activities::findOrFail($id);

        $isCompleted = $activity->studentActivities()
            ->where('student_id', $student->id)
            ->where('status', 'completed')
            ->exists();

        $nextActivity = Activities::where('class_id', $activity->class_id)
            ->where('id', '>', $activity->id)
            ->whereDoesntHave('studentActivities', function ($query) use ($student) {
                $query->where('student_id', $student->id)
                      ->where('status', 'completed');
            })
            ->orderBy('id')
            ->first();

        $previousActivity = Activities::where('class_id', $activity->class_id)
            ->where('id', '<', $activity->id)
            ->orderBy('id', 'desc')
            ->first();

        return Inertia::render('Student/SelectedActivity', [
            'activity' => $activity,
            'nextActivityId' => $nextActivity?->id,
            'previousActivityId' => $previousActivity?->id,
            'isCompleted' => $isCompleted,
        ]);
    }

    /**
     * CATEGORY FOLDER PAGE
     */
    public function categories()
    {
        $student = Auth::user();

        $class = $student->classesAsStudent()->first();

        $categories = Activities::where('class_id', $class->id)
            ->select('category')
            ->distinct()
            ->pluck('category');

        return Inertia::render('Student/CategoryOfActivities', [
            'categories' => $categories,
        ]);
    }

    /**
     * ACTIVITIES FILTERED BY CATEGORY
     */
    public function byCategory($category)
    {
        $student = Auth::user();

        $class = $student->classesAsStudent()->first();

        $activities = Activities::where('class_id', $class->id)
            ->where('category', $category)
            ->oldest()
            ->get();

        return Inertia::render('Student/Activities', [
            'class' => $class,
            'category' => $category,
            'activities' => $activities,
        ]);
    }
}

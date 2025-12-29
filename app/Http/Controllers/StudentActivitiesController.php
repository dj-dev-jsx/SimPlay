<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentActivitiesController extends Controller
{
public function student_activities()
    {
        $student = Auth::user();

        // Get the student's class (first class only)
        $class = $student->classesAsStudent()
            ->with('activities')
            ->first();

        return Inertia::render('Student/Activities', [
            'class' => $class,
            'activities' => $class?->activities ?? [],
        ]);
    }

public function show($id)
{
    $student = Auth::user();

    $activity = \App\Models\Activities::findOrFail($id);

    $isCompleted = $activity->studentActivities()
        ->where('student_id', $student->id)
        ->where('status', 'completed')
        ->exists();

    $nextActivity = \App\Models\Activities::where('class_id', $activity->class_id)
        ->where('id', '>', $activity->id)
        ->whereDoesntHave('studentActivities', function ($query) use ($student) {
            $query->where('student_id', $student->id)
                  ->where('status', 'completed');
        })
        ->orderBy('id')
        ->first();

    $previousActivity = \App\Models\Activities::where('class_id', $activity->class_id)
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

}

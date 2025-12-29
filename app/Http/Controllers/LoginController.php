<?php

namespace App\Http\Controllers;

use App\Models\Activities;
use App\Models\Classes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\In;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function admin_dashboard()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function teacher_dashboard()
    {
        $classes = Classes::withCount(['students as student_count' => function ($query) {
            $query->role('student');
        }])->where('teacher_id', Auth::id())->get();

        // Total counts
        $totalClasses = $classes->count();
        $totalStudents = $classes->sum('student_count');

        // Total activities across all classes
        $totalActivities = Activities::whereIn('class_id', $classes->pluck('id'))->count();
        $teacherName = Auth::user()->firstname . ' ' . Auth::user()->lastname;

        return Inertia::render('Teacher/Dashboard', [
            'totalClasses' => $totalClasses,
            'totalStudents' => $totalStudents,
            'totalActivities' => $totalActivities,
            'classes' => $classes,
            'teacherName' => $teacherName,
        ]);
    }
    

    public function student_dashboard()
    {
        return Inertia::render('Student/Dashboard');  
    }

    public function app_guide()
    {
        return Inertia::render('Student/Guide');  
    }
}

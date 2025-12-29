<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\In;
use Inertia\Inertia;

class ClassesController extends Controller
{
    public function classes(){
        $classes = Classes::withCount(['students as student_count' => function($query) {
            $query->role('student');
        }])
        ->with(['students' => function ($query) {
            $query->role('student');
        }])
        ->where('teacher_id', Auth::id())
        ->get();

            return Inertia::render('Teacher/Classes', [
                'initialClasses' => $classes,
            ]);
    }
    public function add_class(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $class = Classes::create([
            'name' => $request->name,
            'teacher_id' => Auth::id(),
        ]);

        return redirect()->back()->with('success', 'Class added successfully!');
    }
}

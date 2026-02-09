<?php

use App\Http\Controllers\ActivitiesController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentActivitiesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherActivityRecordController;
use App\Models\StudentActivities;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    if (Auth::check()) {
        $user = Auth::user();

        if ($user->roles->contains('name', 'admin')) {
            return redirect()->route('admin.admin_dashboard');
        }

        if ($user->roles->contains('name', 'teacher')) {
            return redirect()->route('teacher.teacher_dashboard');
        }

        if ($user->roles->contains('name', 'student')) {
            return redirect()->route('student.student_dashboard');
        }

        // fallback: logged in but no role
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect()->route('login')->withErrors([
            'username' => 'Your account does not have an assigned role.',
        ]);
    }

    // guest only
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('dashboard');


// Route::get('/', function () {
//     if (Auth::check()) {
//         $user = Auth::user();

//         if ($user->roles->contains('name', 'admin')) {
//             return redirect()->route('admin.admin_dashboard');
//         } elseif ($user->roles->contains('name', 'teacher')) {
//             return redirect()->route('teacher.teacher_dashboard');
//         } elseif ($user->roles->contains('name', 'student')) {
//             return redirect()->route('student.student_dashboard');
//         }

//         // fallback if no role
//         Auth::logout();
//         request()->session()->invalidate();
//         request()->session()->regenerateToken();

//         return redirect()->route('login')->withErrors([
//             'username' => 'Your account does not have an assigned role.',
//         ]);
//     }

//     // guest user → go to login route
//     return redirect()->route('login');
// });





// Admin routes
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/', [LoginController::class, 'admin_dashboard'])->name('admin.admin_dashboard');
});

// Requester routes
Route::middleware(['auth', 'role:teacher'])->prefix('teacher')->group(function () {
Route::get('/', [LoginController::class, 'teacher_dashboard'])->name('teacher.teacher_dashboard');

    // ---------- Classes ----------
    Route::get('/classes', [ClassesController::class, 'classes'])->name('teacher.teacher_classes');
    Route::post('/add_class', [ClassesController::class, 'add_class'])->name('teacher.add_class');            // Add
    Route::put('/update_class/{class}', [ClassesController::class, 'update_class'])->name('teacher.update_class'); // Edit
    Route::delete('/delete_class/{class}', [ClassesController::class, 'delete_class'])->name('teacher.delete_class'); // Delete

    // ---------- Students ----------
    Route::post('/add_student/{classId}', [StudentController::class, 'add_student'])->name('teacher.add_student'); // Add
    Route::put('/update_student/{student}', [StudentController::class, 'update_student'])->name('teacher.update_student'); // Edit
    Route::delete('/delete_student/{student}', [StudentController::class, 'delete_student'])->name('teacher.delete_student'); // Delete

    // ---------- Activities ----------
    Route::get('/activities', [ActivitiesController::class, 'teacher_activities'])->name('teacher.teacher_activities');
    Route::get('/list_of_activities/{classId}', [ActivitiesController::class, 'list_of_activities'])->name('teacher.list_of_activities');
    Route::post('/classes/{classId}/activities', [ActivitiesController::class, 'store_activity'])->name('teacher.store_activity');
    Route::post('/activities/{activityId}/update', [ActivitiesController::class, 'update_activity'])->name('teacher.update_activity');
    Route::delete('/activities/{activityId}/delete', [ActivitiesController::class, 'delete_activity'])->name('teacher.delete_activity');

    // ---------- Teachers ----------
    Route::get('/teachers', [StudentController::class, 'teachers'])->name('teacher.teachers');
    Route::post('/teachers_store', [StudentController::class, 'store_teacher'])->name('teacher.store_teacher');

    // ---------- Activity Records ----------
    Route::get('/activities/{activity}/records', [TeacherActivityRecordController::class, 'index'])->name('teacher.activity.records');

Route::post(
  '/teacher/activities/{activity}/records/{student}/toggle',
  [TeacherActivityRecordController::class, 'toggleStatus']
)->name('teacher.activity.records.toggle');

});



// Approver routes
Route::middleware(['auth', 'role:student'])
    ->prefix('student')
    ->group(function () {

        Route::get(
            '/',
            [LoginController::class, 'student_dashboard']
        )->name('student.student_dashboard');

        Route::get(
            '/guide',
            [LoginController::class, 'app_guide']
        )->name('student.app_guide');

        // 🔹 Categories (folder view)
        Route::get(
            '/activities/categories',
            [StudentActivitiesController::class, 'categories']
        )->name('student.activities.categories');

        // 🔹 Activities filtered by category
        Route::get(
            '/activities/{category}',
            [StudentActivitiesController::class, 'byCategory']
        )->name('student.activities.byCategory');

        // 🔹 Single activity
        Route::get(
            '/activity/{id}',
            [StudentActivitiesController::class, 'show']
        )->name('student.activity.show');
    });


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Auth scaffolding
require __DIR__.'/auth.php';

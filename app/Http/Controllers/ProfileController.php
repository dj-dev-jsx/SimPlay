<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
public function edit(Request $request): Response
{
    return Inertia::render('Profile/Edit', [
        'user' => $request->user(),
        'mustVerifyEmail' => $request->user() instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,
        'status' => session('status'),
    ]);
}

/**
 * Update the user's profile information.
 */
public function update(Request $request): RedirectResponse
{
    $user = $request->user();

    $validated = $request->validate([
        'firstname' => ['sometimes', 'string', 'max:255'],
        'middlename' => ['nullable', 'string', 'max:255'],
        'lastname' => ['sometimes', 'string', 'max:255'],
        'username' => ['sometimes', 'string', 'max:255', 'unique:users,username,' . $user->id],
        'email' => ['sometimes', 'email', 'max:255', 'unique:users,email,' . $user->id],
        'password' => ['nullable', 'string', 'min:5', 'confirmed'],
        'profile_image' => ['nullable', 'image', 'max:2048'],
    ]);


    if (isset($validated['firstname'])) {
    $user->firstname = $validated['firstname'];
}
if (array_key_exists('middlename', $validated)) {
    $user->middlename = $validated['middlename'];
}
if (isset($validated['lastname'])) {
    $user->lastname = $validated['lastname'];
}
if (isset($validated['username'])) {
    $user->username = $validated['username'];
}
if (isset($validated['email']) && $user->email !== $validated['email']) {
    $user->email = $validated['email'];
    $user->email_verified_at = null;
}
if (!empty($validated['password'])) {
    $user->password = Hash::make($validated['password']);
}
if ($request->hasFile('profile_image')) {
    $path = $request->file('profile_image')->store('profile_images', 'public');
    $user->profile_image = $path;
}

$user->save();


    return Redirect::route('profile.edit')->with('status', 'Profile updated successfully!');
}

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\RedirectResponse;

class FeedbackController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ], [
            'name.required' => 'Nama harus diisi',
            'message.required' => 'Pesan harus diisi',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        Feedback::create([
            'name' => $request->name,
            'message' => $request->message,
        ]);

        return redirect()->back()->with('success', 'Terima kasih! Kritik dan saran Anda telah terkirim.');
    }
}

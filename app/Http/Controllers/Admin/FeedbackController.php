<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class FeedbackController extends Controller
{
    public function index(): Response
    {
        $feedbacks = Feedback::orderByDesc('created_at')
            ->paginate(15);

        return Inertia::render('admin/feedback/index', [
            'feedbacks' => $feedbacks
        ]);
    }

    public function show(Feedback $feedback): Response
    {
        // Mark as read when admin views it
        if (!$feedback->is_read) {
            $feedback->update(['is_read' => true]);
        }

        return Inertia::render('admin/feedback/show', [
            'feedback' => $feedback
        ]);
    }

    public function destroy(Feedback $feedback): RedirectResponse
    {
        $feedback->delete();

        return redirect()->route('admin.feedback.index')
            ->with('success', 'Feedback berhasil dihapus');
    }

    public function markAsRead(Feedback $feedback): RedirectResponse
    {
        $feedback->update(['is_read' => true]);

        return redirect()->back()
            ->with('success', 'Feedback ditandai sebagai sudah dibaca');
    }

    public function markAsUnread(Feedback $feedback): RedirectResponse
    {
        $feedback->update(['is_read' => false]);

        return redirect()->back()
            ->with('success', 'Feedback ditandai sebagai belum dibaca');
    }
}

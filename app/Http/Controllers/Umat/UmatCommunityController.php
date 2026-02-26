<?php

namespace App\Http\Controllers\Umat;

use App\Http\Controllers\Controller;
use App\Models\Community;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class UmatCommunityController extends Controller
{
    /**
     * Display a listing of all communities (read-only for umat).
     * Highlights the user's own community.
     */
    public function index(): Response
    {
        $user = Auth::user();

        $communities = Community::withCount('users')
            ->orderBy('name', 'asc')
            ->get(['id', 'name']);

        return Inertia::render('umat/communities/index', [
            'communities'      => $communities,
            'my_community_id'  => $user->community_id,
        ]);
    }
}

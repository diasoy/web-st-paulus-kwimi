<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Community;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommunityController extends Controller
{    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $communities = Community::withCount('users')
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/communities/index', [
            'communities' => $communities,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/communities/create');
    }    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Community::create($validated);

        return redirect()->route('admin.communities.index')
            ->with('success', 'Komunitas basis berhasil dibuat.');
    }    /**
     * Display the specified resource.
     */
    public function show(Community $community)
    {
        $community->load('users');

        return Inertia::render('admin/communities/show', [
            'community' => $community,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Community $community)
    {
        return Inertia::render('admin/communities/edit', [
            'community' => $community,
        ]);
    }    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Community $community)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $community->update($validated);

        return redirect()->route('admin.communities.index')
            ->with('success', 'Komunitas basis berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Community $community)
    {
        $community->delete();

        return redirect()->route('admin.communities.index')
            ->with('success', 'Komunitas basis berhasil dihapus.');
    }
}

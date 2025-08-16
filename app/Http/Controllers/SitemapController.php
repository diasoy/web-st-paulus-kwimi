<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $urls = [
            url('/'),
            url('/umat/announcements'),
            url('/umat/worship-schedules'),
            url('/umat/activities'),
        ];

        $xml = view('sitemap', compact('urls'))->render();
        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}

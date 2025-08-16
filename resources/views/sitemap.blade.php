<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>' . "\n"; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    @foreach ($urls ?? [] as $loc)
        @if (!empty($loc))
            <url>
                <loc>{{ $loc }}</loc>
            </url>
        @endif
    @endforeach
</urlset>

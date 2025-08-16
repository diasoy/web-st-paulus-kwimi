<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

    <title inertia>{{ config('app.name', 'St Paulus Kwimi') }}</title>

        <link rel="icon" href="/images/logo.png" sizes="any">
        <link rel="apple-touch-icon" href="/images/logo.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

         <meta name="description" content="Selamat datang di Gereja St. Paulus Kwimi. Temukan informasi jadwal ibadah, agenda kegiatan, dan pengumuman terbaru untuk jemaat." />
        <meta name="keywords" content="gereja, st paulus kwimi, ibadah, kegiatan, pengumuman, jemaat, kristen, papua, gereja terdekat, komunitas, paulus, kwimi" />
        <meta property="og:title" content="Gereja St. Paulus Kwimi" />
        <meta property="og:description" content="Informasi jadwal ibadah, agenda kegiatan, dan pengumuman terbaru untuk jemaat Gereja St. Paulus Kwimi." />
        <meta property="og:image" content="/images/logo.png" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://stpauluskwimi.my.id/" />
        <meta name="publisher" content="Gereja St. Paulus Kwimi"/>
        

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

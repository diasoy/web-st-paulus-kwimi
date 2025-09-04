<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Hardcode light mode: persist and apply immediately without changing other code --}}
    <script>
        try {
            localStorage.setItem('appearance', 'light');
            document.cookie = 'appearance=light;path=/;max-age=31536000;SameSite=Lax';
            document.documentElement.classList.remove('dark');
        } catch (e) {
            // no-op
        }
    </script>

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? 'system' }}';

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
            background-color: #1a4d20; /* Hijau tua seperti tema sidebar */
        }

        html.dark {
            background-color: #1a4d20; /* Sama untuk dark mode */
        }
    </style>

    <title inertia>{{ config('app.name', 'St Paulus Kwimi') }}</title>

    <link rel="icon" href="/images/logo.png" sizes="any">
    <link rel="apple-touch-icon" href="/images/logo.png">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>

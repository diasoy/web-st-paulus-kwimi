<?php


if (!function_exists('getImageUrl')) {
    /**
     * Generate full URL dari path image di storage
     * - Jika null -> fallback image
     * - Jika sudah full URL (http/https) -> kembalikan apa adanya
     * - Jika path mengandung "storage/" di awal -> hapus prefixnya agar tidak double
     * - Lalu prefix 'storage/' dan bungkus dengan asset()
     *
     * @param  string|null $path
     * @return string|null
     */
    function getImageUrl(?string $path): ?string
    {
        // fallback
        if (!$path) {
            return asset('images/default.png'); // ganti sesuai lokasi default gambarmu
        }

        // kalau sudah URL penuh, return langsung
        if (preg_match('#^https?://#i', $path)) {
            return $path;
        }

        // normalisasi: hapus semua leading slash
        $p = ltrim($path, '/');

        // jika sudah berawalan "storage/" hapus prefixnya
        if (str_starts_with($p, 'storage/')) {
            $p = substr($p, strlen('storage/'));
        }

        // sekarang pastikan tidak ada leading slash lalu prefix storage/ dan asset()
        $p = ltrim($p, '/');

        return asset('storage/' . $p);
    }
}

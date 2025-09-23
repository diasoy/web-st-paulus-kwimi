<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class ImageHelper
{
    /**
     * Get full URL for storage image
     */
    public static function getImageUrl($imagePath)
    {
        if (!$imagePath) {
            return null;
        }

        // Jika sudah berupa URL lengkap, return as is
        if (filter_var($imagePath, FILTER_VALIDATE_URL)) {
            return $imagePath;
        }

        // Untuk storage public disk
        return Storage::url($imagePath);
    }

    /**
     * Get image URL with fallback
     */
    public static function getImageUrlWithFallback($imagePath, $fallback = null)
    {
        $url = self::getImageUrl($imagePath);
        
        if (!$url || !self::imageExists($imagePath)) {
            return $fallback;
        }

        return $url;
    }

    /**
     * Check if image exists in storage
     */
    public static function imageExists($imagePath)
    {
        if (!$imagePath) {
            return false;
        }

        return Storage::disk('public')->exists($imagePath);
    }
}
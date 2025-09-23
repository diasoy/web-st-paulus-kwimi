<?php
// File: create_storage_link.php
// Upload file ini ke root website Anda, lalu akses via browser

echo "<h2>Creating Storage Symbolic Link</h2>";

// Path ke folder storage dan public
$target = __DIR__ . '/storage/app/public';
$link = __DIR__ . '/public/storage';

// Hapus link lama jika ada
if (is_link($link)) {
    unlink($link);
    echo "<p>✅ Old symlink removed</p>";
}

// Buat symbolic link baru
if (symlink($target, $link)) {
    echo "<p>✅ Storage link created successfully!</p>";
    echo "<p><strong>Target:</strong> " . realpath($target) . "</p>";
    echo "<p><strong>Link:</strong> " . $link . "</p>";
} else {
    echo "<p>❌ Failed to create storage link</p>";
    echo "<p>Trying alternative method...</p>";
    
    // Metode alternatif: copy .htaccess redirect
    $htaccess_content = "RewriteEngine On\n";
    $htaccess_content .= "RewriteCond %{REQUEST_FILENAME} !-f\n";
    $htaccess_content .= "RewriteCond %{REQUEST_FILENAME} !-d\n";
    $htaccess_content .= "RewriteRule ^storage/(.*)$ ../storage/app/public/$1 [L]\n";
    
    if (!is_dir($link)) {
        mkdir($link, 0755, true);
    }
    
    file_put_contents($link . '/.htaccess', $htaccess_content);
    echo "<p>✅ Alternative redirect method created</p>";
}

echo "<hr>";
echo "<h3>Testing Storage Access:</h3>";

// Test beberapa path
$test_paths = [
    '/storage' => $link,
    '/storage/app/public' => $target
];

foreach ($test_paths as $desc => $path) {
    if (is_dir($path)) {
        echo "<p>✅ <strong>$desc:</strong> Directory exists at $path</p>";
    } else {
        echo "<p>❌ <strong>$desc:</strong> Directory NOT found at $path</p>";
    }
}

echo "<hr>";
echo "<p><strong>⚠️ IMPORTANT:</strong> Delete this file after running it for security!</p>";
echo "<p><a href='?delete=1'>Click here to delete this file</a></p>";

// Self delete option
if (isset($_GET['delete']) && $_GET['delete'] == '1') {
    unlink(__FILE__);
    echo "<p>✅ File deleted successfully!</p>";
    exit;
}
?>
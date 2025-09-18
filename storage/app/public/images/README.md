# Storage Images Directory

This directory contains uploaded images organized by feature:

## Directory Structure
```
images/
├── announcements/    # Images for announcements/pengumuman
├── activities/       # Images for activities/kegiatan
├── profiles/         # Images for user profiles
└── documents/        # Images for documents (if needed)
```

## Important Notes

- All uploaded files in this directory are **ignored by Git** except for `.gitkeep` files
- This ensures user-uploaded content is not committed to the repository
- The folder structure is maintained by `.gitkeep` files
- Images are publicly accessible via `/storage/images/...` URL

## Development

When setting up a new environment:
1. Run `php artisan storage:link` to create symbolic link
2. Ensure proper folder permissions for web server
3. The folder structure will be created automatically by `.gitkeep` files

## Access Pattern

- **Upload Path**: `storage/app/public/images/{feature}/{filename}`
- **Web URL**: `/storage/images/{feature}/{filename}`
- **Storage URL**: `Storage::url('images/{feature}/{filename}')`
<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserPdf;
use Illuminate\Support\Facades\Storage; // Tambahkan ini

class DocumentController extends Controller
{
    /**
     * Display user's uploaded documents
     */
    public function index()
    {
        $user = Auth::user();
        $pdfs = $user->pdfs()->orderBy('id')->get()->map(function ($pdf) {
            // Menggunakan Storage::url() untuk mendapatkan URL publik yang benar
            $pdf->file_url = Storage::disk('public')->url($pdf->file_path);
            return $pdf;
        });

        return inertia('settings/documents', [
            'pdfs' => $pdfs,
        ]);
    }

    /**
     * Store uploaded PDFs for authenticated user
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'pdfs.*' => 'nullable|file|mimes:pdf|max:5120', // 5MB max
            'removePdf.*' => 'boolean',
        ]);

        $files = $request->file('pdfs', []);
        $removeFlags = $request->input('removePdf', []);

        // Get existing PDFs ordered by ID
        $existingPdfs = UserPdf::where('user_id', $user->id)->orderBy('id')->get();

        for ($i = 0; $i < 4; $i++) {
            $newFile = isset($files[$i]) ? $files[$i] : null;
            $shouldRemove = isset($removeFlags[$i]) ? $removeFlags[$i] : false;
            $existingPdf = $existingPdfs->get($i);

            // Handle removal of existing file
            if ($shouldRemove && $existingPdf) {
                // Hapus file dari storage menggunakan Storage::disk
                Storage::disk('public')->delete($existingPdf->file_path);
                $existingPdf->delete();
                $existingPdf = null;
            }

            // Handle new file upload
            if ($newFile) {
                // Remove existing file if there is one at this position
                if ($existingPdf) {
                    Storage::disk('public')->delete($existingPdf->file_path);
                    $existingPdf->delete();
                }

                // Simpan file baru ke folder 'pdfs' di disk 'public'
                $filename = uniqid('pdf_') . '_' . $newFile->getClientOriginalName();
                $path = $newFile->storeAs('pdfs', $filename, 'public');

                // Create new database record
                UserPdf::create([
                    'user_id' => $user->id,
                    'file_path' => $path, // Simpan jalur relatif
                    'file_name' => $newFile->getClientOriginalName(),
                ]);
            }
        }

        return redirect()->route('document.index')->with('success', 'Dokumen berhasil diperbarui.');
    }

    /**
     * Download a PDF file
     */
    public function download(UserPdf $pdf)
    {
        if ($pdf->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to this document.');
        }

        // Gunakan Storage::disk('public') untuk mengambil file
        if (!Storage::disk('public')->exists($pdf->file_path)) {
            return redirect()->route('document.index')->with('error', 'File tidak ditemukan.');
        }

        return Storage::disk('public')->download($pdf->file_path, $pdf->file_name);
    }

    /**
     * Delete a PDF file
     */
    public function destroy(UserPdf $pdf)
    {
        if ($pdf->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to this document.');
        }

        // Hapus file dari storage menggunakan Storage::disk
        Storage::disk('public')->delete($pdf->file_path);

        $pdf->delete();

        return redirect()->route('document.index')->with('success', 'Dokumen berhasil dihapus.');
    }

    /**
     * Show PDF file in browser
     */
    public function show(UserPdf $pdf)
    {
        if ($pdf->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to this document.');
        }

        // Gunakan Storage::disk('public') untuk memeriksa file
        if (!Storage::disk('public')->exists($pdf->file_path)) {
            abort(404, 'File not found.');
        }

        // Dapatkan jalur absolut dari file untuk response()->file()
        $filePath = Storage::disk('public')->path($pdf->file_path);

        return response()->file($filePath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . $pdf->file_name . '"'
        ]);
    }
}

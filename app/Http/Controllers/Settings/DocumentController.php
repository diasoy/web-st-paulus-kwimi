<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserPdf;

class DocumentController extends Controller
{
    /**
     * Display user's uploaded documents
     */
    public function index()
    {
        $user = Auth::user();
        $pdfs = $user->pdfs()->orderBy('id')->get();
        
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

        $destinationPath = public_path('assets');
        if (!is_dir($destinationPath)) {
            mkdir($destinationPath, 0755, true);
        }
        
        for ($i = 0; $i < 4; $i++) {
            $newFile = isset($files[$i]) ? $files[$i] : null;
            $shouldRemove = isset($removeFlags[$i]) ? $removeFlags[$i] : false;
            $existingPdf = $existingPdfs->get($i);

            // Handle removal of existing file
            if ($shouldRemove && $existingPdf) {
                $oldPath = public_path($existingPdf->file_path);
                if (file_exists($oldPath)) {
                    @unlink($oldPath);
                }
                $existingPdf->delete();
                $existingPdf = null;
            }

            // Handle new file upload
            if ($newFile) {
                // Remove existing file if there is one at this position
                if ($existingPdf) {
                    $oldPath = public_path($existingPdf->file_path);
                    if (file_exists($oldPath)) {
                        @unlink($oldPath);
                    }
                    $existingPdf->delete();
                }

                // Store new file in public/assets
                $filename = uniqid('pdf_') . '_' . $newFile->getClientOriginalName();
                $newFile->move($destinationPath, $filename);

                // Create new database record
                UserPdf::create([
                    'user_id' => $user->id,
                    'file_path' => 'assets/' . $filename,
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

        $filePath = public_path($pdf->file_path);
        if (!file_exists($filePath)) {
            return redirect()->route('document.index')->with('error', 'File tidak ditemukan.');
        }

        return response()->download($filePath, $pdf->file_name, [
            'Content-Type' => 'application/pdf',
        ]);
    }

    /**
     * Delete a PDF file
     */
    public function destroy(UserPdf $pdf)
    {
        if ($pdf->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to this document.');
        }

        $filePath = public_path($pdf->file_path);
        if (file_exists($filePath)) {
            @unlink($filePath);
        }

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

        $filePath = public_path($pdf->file_path);
        if (!file_exists($filePath)) {
            abort(404, 'File not found.');
        }

        return response()->file($filePath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . $pdf->file_name . '"'
        ]);
    }
}

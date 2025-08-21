<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\UserPdf;
use Symfony\Component\HttpFoundation\Response;

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
        
        for ($i = 0; $i < 4; $i++) {
            $newFile = isset($files[$i]) ? $files[$i] : null;
            $shouldRemove = isset($removeFlags[$i]) ? $removeFlags[$i] : false;
            $existingPdf = $existingPdfs->get($i);

            // Handle removal of existing file
            if ($shouldRemove && $existingPdf) {
                // Delete file from storage
                if (Storage::disk('public')->exists($existingPdf->file_path)) {
                    Storage::disk('public')->delete($existingPdf->file_path);
                }
                // Delete database record
                $existingPdf->delete();
                $existingPdf = null;
            }

            // Handle new file upload
            if ($newFile) {
                // Remove existing file if there is one at this position
                if ($existingPdf) {
                    if (Storage::disk('public')->exists($existingPdf->file_path)) {
                        Storage::disk('public')->delete($existingPdf->file_path);
                    }
                    $existingPdf->delete();
                }

                // Store new file
                $fileName = uniqid('pdf_') . '_' . $newFile->getClientOriginalName();
                $filePath = $newFile->storeAs('user_pdfs', $fileName, 'public');

                // Create new database record
                UserPdf::create([
                    'user_id' => $user->id,
                    'file_path' => $filePath,
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
        // Check if user owns this PDF
        if ($pdf->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to this document.');
        }

        // Check if file exists
        if (!Storage::disk('public')->exists($pdf->file_path)) {
            return redirect()->route('document.index')->with('error', 'File tidak ditemukan.');
        }

        // Return file download response
        return Storage::disk('public')->download($pdf->file_path, $pdf->file_name);
    }

    /**
     * Delete a PDF file
     */
    public function destroy(UserPdf $pdf)
    {
        // Check if user owns this PDF
        if ($pdf->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to this document.');
        }

        // Delete file from storage
        if (Storage::disk('public')->exists($pdf->file_path)) {
            Storage::disk('public')->delete($pdf->file_path);
        }

        // Delete database record
        $pdf->delete();

        return redirect()->route('document.index')->with('success', 'Dokumen berhasil dihapus.');
    }

    /**
     * Show PDF file in browser
     */
    public function show(UserPdf $pdf)
    {
        // Check if user owns this PDF
        if ($pdf->user_id !== Auth::id()) {
            abort(403, 'Unauthorized access to this document.');
        }

        // Check if file exists
        if (!Storage::disk('public')->exists($pdf->file_path)) {
            abort(404, 'File not found.');
        }

        // Return file response for inline viewing
        return Storage::disk('public')->response($pdf->file_path, $pdf->file_name, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . $pdf->file_name . '"'
        ]);
    }
}
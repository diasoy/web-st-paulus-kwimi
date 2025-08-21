import { Head, useForm, Link } from '@inertiajs/react';
import { Upload, Save, Download, Trash2, FileText, X } from 'lucide-react';
import { useCallback, FormEvent } from 'react';

import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface UserPdf {
  id: number;
  file_name: string;
  file_path: string;
  created_at: string;
}

interface DocumentProps {
  pdfs: UserPdf[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Document settings',
    href: '/settings/document',
  },
];

export default function Document({ pdfs = [] }: DocumentProps) {
  const { data, setData, post, processing, errors, delete: destroy } = useForm({
    pdfs: [null, null, null, null] as (File | null)[],
    removePdf: [false, false, false, false],
  });

  // Convert pdfs array to object with index-based access
  const existingPdfs: { [key: number]: UserPdf } = {};
  pdfs.forEach((pdf, index) => {
    if (index < 4) {
      existingPdfs[index] = pdf;
    }
  });

  const handleSinglePdfChange = useCallback((idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const newPdfs = [...data.pdfs];
    newPdfs[idx] = file;
    setData('pdfs', newPdfs);

    // Reset remove flag if new file is selected
    if (file) {
      const newRemovePdf = [...data.removePdf];
      newRemovePdf[idx] = false;
      setData('removePdf', newRemovePdf);
    }
  }, [data.pdfs, data.removePdf, setData]);

  const handleRemoveExisting = useCallback((idx: number) => {
    const newRemovePdf = [...data.removePdf];
    newRemovePdf[idx] = true;
    setData('removePdf', newRemovePdf);

    // Clear any new file selection
    const newPdfs = [...data.pdfs];
    newPdfs[idx] = null;
    setData('pdfs', newPdfs);

    // Reset file input
    const fileInput = document.getElementById(`pdf-input-${idx}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }, [data.removePdf, setData]);

  const handleUndoRemove = useCallback((idx: number) => {
    const newRemovePdf = [...data.removePdf];
    newRemovePdf[idx] = false;
    setData('removePdf', newRemovePdf);
  }, [data.removePdf, setData]);

  const handleClearNewFile = useCallback((idx: number) => {
    const newPdfs = [...data.pdfs];
    newPdfs[idx] = null; I
    setData('pdfs', newPdfs);

    // Reset file input
    const fileInput = document.getElementById(`pdf-input-${idx}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }, [data.pdfs, setData]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post(route('document.store'), {
      forceFormData: true,
      preserveScroll: true
    });
  };

  const handleDownload = (pdfId: number) => {
    window.open(route('document.download', pdfId), '_blank');
  };

  const handleDelete = (pdfId: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
      destroy(route('document.destroy', pdfId), {
        preserveScroll: true,
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dokumen" />
      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall title="Unggah Dokumen" description="Unggah dokumen penting Anda di sini." />
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Upload PDF (maksimal 4, opsional)</Label>
              <p className="text-xs text-muted-foreground mb-4">
                File lama akan tetap digunakan jika tidak memilih file baru atau tidak menghapus file lama.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[0, 1, 2, 3].map(idx => {
                  const existingPdf = existingPdfs[idx];
                  const isMarkedForRemoval = data.removePdf[idx];
                  const hasNewFile = data.pdfs[idx] !== null;
                  const hasExistingFile = existingPdf && !isMarkedForRemoval;

                  return (
                    <div key={idx} className="space-y-2 p-4 border rounded-lg">
                      <Label className="text-sm font-bold">Dokumen {idx + 1}</Label>

                      {/* Existing file display */}
                      {existingPdf && !isMarkedForRemoval && !hasNewFile && (
                        <div className="bg-green-50 border border-green-200 rounded-md p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-800">
                                {existingPdf.file_name}
                              </span>
                            </div>
                            <div className="flex space-x-1">
                              <button
                                type="button"
                                onClick={() => handleDownload(existingPdf.id)}
                                className="p-1 text-green-600 hover:bg-green-100 rounded"
                                title="Download"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveExisting(idx)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                                title="Hapus"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="text-xs text-green-600 mt-1">
                            Uploaded: {new Date(existingPdf.created_at).toLocaleDateString('id-ID')}
                          </div>
                        </div>
                      )}

                      {/* Marked for removal display */}
                      {isMarkedForRemoval && existingPdf && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <X className="w-4 h-4 text-red-600" />
                              <span className="text-sm text-red-800 line-through">
                                {existingPdf.file_name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleUndoRemove(idx)}
                              className="text-xs text-red-600 hover:text-red-800 underline"
                            >
                              Batal Hapus
                            </button>
                          </div>
                          <div className="text-xs text-red-600 mt-1">
                            Akan dihapus saat menyimpan
                          </div>
                        </div>
                      )}

                      {/* New file display */}
                      {hasNewFile && (
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Upload className="w-4 h-4 text-blue-600" />
                              <span className="text-sm text-blue-800">
                                {data.pdfs[idx]?.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleClearNewFile(idx)}
                              className="p-1 text-red-600 hover:bg-red-100 rounded"
                              title="Hapus file baru"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-xs text-blue-600 mt-1">
                            File baru - belum disimpan
                          </div>
                        </div>
                      )}

                      {/* File input */}
                      {!hasExistingFile || isMarkedForRemoval || hasNewFile ? (
                        <div>
                          <input
                            type="file"
                            accept="application/pdf"
                            id={`pdf-input-${idx}`}
                            onChange={handleSinglePdfChange(idx)}
                            className="hidden"
                          />
                          <label
                            htmlFor={`pdf-input-${idx}`}
                            className="flex items-center justify-center gap-2 cursor-pointer px-3 py-2 border border-dashed border-gray-300 rounded-md text-sm bg-background hover:bg-muted transition w-full"
                          >
                            <Upload className="w-4 h-4" />
                            <span>
                              {hasNewFile ? 'Pilih File Lain' : 'Pilih File PDF'}
                            </span>
                          </label>
                        </div>
                      ) : null}

                      {/* Replace existing file option */}
                      {hasExistingFile && !hasNewFile && (
                        <div>
                          <input
                            type="file"
                            accept="application/pdf"
                            id={`pdf-input-${idx}`}
                            onChange={handleSinglePdfChange(idx)}
                            className="hidden"
                          />
                          <label
                            htmlFor={`pdf-input-${idx}`}
                            className="flex items-center justify-center gap-2 cursor-pointer px-3 py-2 border border-blue-300 rounded-md text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 transition w-full"
                          >
                            <Upload className="w-4 h-4" />
                            <span>Ganti File</span>
                          </label>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {errors.pdfs && <p className="text-sm text-red-600">{errors.pdfs}</p>}
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Button
              type="submit"
              disabled={processing}
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded hover:opacity-90 disabled:opacity-50"
              onClick={() => {
                setTimeout(() => window.location.reload(), 1000);
              }}
              >
              <Save className="mr-2 h-4 w-4" />
              {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
              </Button>
              <Link href="/settings/document">
              <Button
                type="button"
                className="inline-flex items-center px-4 py-2 bg-white border border-secondary text-secondary rounded hover:opacity-80"
              >
                Batal
              </Button>
              </Link>
            </div>
          </form>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
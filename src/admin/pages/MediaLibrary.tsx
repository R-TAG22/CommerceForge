import React, { useState, useEffect, useRef } from 'react';
import {
  ImageIcon,
  Upload,
  Trash2,
  Copy,
  Check,
  Search,
  ExternalLink,
  Eye,
  AlertCircle,
} from 'lucide-react';
import { mediaService } from '../../services/cms/mediaService';
import { MediaItem } from '../../types/cms';
import { useToast } from '../components/Toast';
import { ConfirmDialog } from '../components/ConfirmDialog';

export const MediaLibrary: React.FC = () => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const items = await mediaService.getMedia();
      setMediaItems(items);
    } catch {
      showToast('error', 'Error', 'Failed to load media assets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        await mediaService.uploadMedia(file, { altText: file.name });
      } catch (err: unknown) {
        showToast('error', 'Upload failed', err instanceof Error ? err.message : 'Upload failed');
      }
    }

    setIsUploading(false);
    showToast('success', 'Uploaded', 'Media file(s) added successfully.');
    loadMedia();
  };

  const handleCopy = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    showToast('info', 'Copied URL', `Copied path to clipboard: ${item.url}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    try {
      await mediaService.deleteMedia(deletingId);
      setMediaItems((prev) => prev.filter((m) => m.id !== deletingId));
      showToast('info', 'Deleted', 'Media asset removed.');
    } catch (err: unknown) {
      showToast('error', 'Delete failed', err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = mediaItems.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
            <ImageIcon className="w-4 h-4" />
            <span>Asset Repository</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">Media Library</h1>
          <p className="text-xs text-white/60">
            Upload screenshots, client logos, and brand graphics for use across the site
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e.target.files)}
            multiple
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B7E84B] hover:bg-[#a6d83b] text-[#0F241A] text-xs font-black uppercase tracking-wider transition-colors shadow-md cursor-pointer disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
          </button>
        </div>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFileUpload(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className="p-8 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#B7E84B]/60 bg-[#12241A]/50 hover:bg-[#12241A] transition-all flex flex-col items-center justify-center text-center cursor-pointer group"
      >
        <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-[#B7E84B]/20 group-hover:text-[#B7E84B] transition-colors mb-3">
          <Upload className="w-6 h-6 text-white/60 group-hover:text-[#B7E84B]" />
        </div>
        <p className="text-xs font-bold uppercase tracking-wider text-white">
          Click to upload or drag and drop images
        </p>
        <p className="text-[11px] text-white/50 mt-1">PNG, JPG, SVG, WebP up to 10MB each</p>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-[#12241A] border border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter media by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#B7E84B]"
          />
        </div>

        <span className="text-xs text-white/50">
          {filtered.length} of {mediaItems.length} assets
        </span>
      </div>

      {/* Grid of Media Assets */}
      {loading ? (
        <div className="p-12 text-center text-white/50 text-xs">Loading media assets...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-[#12241A] border border-white/10 hover:border-[#B7E84B]/50 transition-all group flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div
                onClick={() => setPreviewItem(item)}
                className="aspect-video rounded-xl bg-black/40 overflow-hidden relative border border-white/10 cursor-pointer"
              >
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Name & Size */}
              <div className="mt-3">
                <p className="text-xs font-bold text-white truncate" title={item.name}>
                  {item.name}
                </p>
                <p className="text-[10px] text-white/40 mt-0.5">
                  {item.size ? `${(item.size / 1024).toFixed(1)} KB` : 'Preset asset'}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleCopy(item)}
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-[#B7E84B] hover:underline"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-[#B7E84B]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setDeletingId(item.id)}
                  className="p-1 text-white/40 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Preview Modal */}
      {previewItem && (
        <div
          onClick={() => setPreviewItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#12241A] border border-[#B7E84B]/30 rounded-3xl p-6 max-w-3xl w-full text-white space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold truncate max-w-md">{previewItem.name}</span>
              <button
                onClick={() => setPreviewItem(null)}
                className="px-3 py-1 rounded-lg bg-white/10 text-xs font-bold uppercase"
              >
                Close
              </button>
            </div>
            <div className="max-h-[60vh] overflow-hidden rounded-2xl bg-black/40 flex items-center justify-center">
              <img
                src={previewItem.url}
                alt={previewItem.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-white/60">
              <span className="truncate max-w-md">{previewItem.url}</span>
              <button
                onClick={() => handleCopy(previewItem)}
                className="px-3 py-1.5 rounded-xl bg-[#B7E84B] text-[#0F241A] font-black uppercase text-[11px]"
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingId}
        title="Delete Media Asset"
        message="Are you sure you want to remove this media item? Any sections linking directly to this URL will need to be updated."
        confirmLabel="Delete Media"
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};

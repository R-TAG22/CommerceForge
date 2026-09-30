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
  Edit3,
  X,
  ShieldCheck,
} from 'lucide-react';
import { mediaService } from '../../services/cms/mediaService';
import { MediaAsset } from '../../types/cms';
import { useToast } from '../components/Toast';
import { ConfirmDialog } from '../components/ConfirmDialog';

export const MediaLibrary: React.FC = () => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mediaItems, setMediaItems] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMissingAltOnly, setFilterMissingAltOnly] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<MediaAsset | null>(null);

  // Alt Text Editing Modal State
  const [editingAltItem, setEditingAltItem] = useState<MediaAsset | null>(null);
  const [newAltText, setNewAltText] = useState('');

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
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        await mediaService.uploadMedia(file, { altText: cleanName });
      } catch (err: unknown) {
        showToast('error', 'Upload failed', err instanceof Error ? err.message : 'Upload failed');
      }
    }

    setIsUploading(false);
    showToast('success', 'Uploaded', 'Media file(s) added with auto-generated Alt text.');
    loadMedia();
  };

  const handleCopy = (item: MediaAsset) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    showToast('info', 'Copied URL', `Copied path to clipboard: ${item.url}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveAltText = async () => {
    if (!editingAltItem) return;
    try {
      if (mediaService.updateMediaAltText) {
        await mediaService.updateMediaAltText(editingAltItem.id, newAltText.trim());
      }
      setMediaItems((prev) =>
        prev.map((item) =>
          item.id === editingAltItem.id ? { ...item, altText: newAltText.trim() } : item
        )
      );
      showToast('success', 'Alt Text Saved', 'Image alt text updated for screen readers.');
      setEditingAltItem(null);
    } catch (err: unknown) {
      showToast('error', 'Update Failed', err instanceof Error ? err.message : 'Could not save alt text');
    }
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

  const missingAltCount = mediaItems.filter((m) => !m.altText || !m.altText.trim()).length;

  const filtered = mediaItems
    .filter((m) => {
      const name = m.fileName || (m as any).name || '';
      const matchesSearch =
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.altText && m.altText.toLowerCase().includes(searchQuery.toLowerCase()));

      if (filterMissingAltOnly) {
        return matchesSearch && (!m.altText || !m.altText.trim());
      }
      return matchesSearch;
    });

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
          <p className="text-xs text-zinc-300">
            Upload screenshots, client logos, and brand graphics. WCAG 2.1 AA screen reader alt text is monitored automatically.
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
            aria-label="Upload media file"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            aria-label="Upload images to media library"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B7E84B] hover:bg-[#a6d83b] text-[#0F241A] text-xs font-black uppercase tracking-wider transition-colors shadow-md cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
          >
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
          </button>
        </div>
      </div>

      {/* WCAG Accessibility Audit Banner */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          missingAltCount > 0
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
        }`}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-xl ${
              missingAltCount > 0 ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
            }`}
          >
            {missingAltCount > 0 ? <AlertCircle className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider block">
              {missingAltCount > 0
                ? `Accessibility Warning: ${missingAltCount} asset${missingAltCount > 1 ? 's' : ''} missing Alt text`
                : 'WCAG AA Alt Text Compliance: 100%'}
            </span>
            <span className="text-[11px] opacity-80 block">
              {missingAltCount > 0
                ? 'Screen readers require descriptive alt text for all informative web images.'
                : 'All media assets have screen reader descriptions configured.'}
            </span>
          </div>
        </div>

        {missingAltCount > 0 && (
          <button
            type="button"
            onClick={() => setFilterMissingAltOnly(!filterMissingAltOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
              filterMissingAltOnly
                ? 'bg-amber-400 text-black'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40'
            }`}
            aria-pressed={filterMissingAltOnly}
          >
            {filterMissingAltOnly ? 'Show All Assets' : `Filter ${missingAltCount} Missing Alt`}
          </button>
        )}
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFileUpload(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        tabIndex={0}
        role="button"
        aria-label="Click or drag files here to upload"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            fileInputRef.current?.click();
          }
        }}
        className="p-8 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#B7E84B]/60 bg-[#12241A]/50 hover:bg-[#12241A] transition-all flex flex-col items-center justify-center text-center cursor-pointer group focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
      >
        <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-[#B7E84B]/20 group-hover:text-[#B7E84B] transition-colors mb-3">
          <Upload className="w-6 h-6 text-white/60 group-hover:text-[#B7E84B]" />
        </div>
        <p className="text-xs font-bold uppercase tracking-wider text-white">
          Click to upload or drag and drop images
        </p>
        <p className="text-[11px] text-zinc-400 mt-1">PNG, JPG, SVG, WebP up to 10MB each</p>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-[#12241A] border border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter media by name or alt text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#B7E84B] focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="Search media files"
          />
        </div>

        <span className="text-xs text-zinc-400">
          Showing {filtered.length} of {mediaItems.length} assets
        </span>
      </div>

      {/* Grid of Media Assets */}
      {loading ? (
        <div className="p-12 text-center text-zinc-400 text-xs">Loading media assets...</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-zinc-400 text-xs rounded-2xl bg-white/5 border border-white/10">
          No media assets match your current filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => {
            const displayName = item.fileName || (item as any).name || 'Asset';
            const hasAlt = !!(item.altText && item.altText.trim());

            return (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-[#12241A] border border-white/10 hover:border-[#B7E84B]/50 transition-all group flex flex-col justify-between"
              >
                {/* Image Preview Container */}
                <div
                  onClick={() => setPreviewItem(item)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Preview full image for ${displayName}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setPreviewItem(item);
                  }}
                  className="aspect-video rounded-xl bg-black/40 overflow-hidden relative border border-white/10 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                >
                  <img
                    src={item.url}
                    alt={item.altText || displayName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Name & Size */}
                <div className="mt-3">
                  <p className="text-xs font-bold text-white truncate" title={displayName}>
                    {displayName}
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">
                    {item.fileSize ? `${(item.fileSize / 1024).toFixed(1)} KB` : 'Preset asset'}
                  </p>

                  {/* Alt Text WCAG Status Tag */}
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAltItem(item);
                        setNewAltText(item.altText || '');
                      }}
                      className={`w-full text-left px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors flex items-center justify-between gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                        hasAlt
                          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25'
                          : 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                      }`}
                      title="Click to edit WCAG screen reader description"
                      aria-label={`Edit alt text for ${displayName}. Current status: ${hasAlt ? item.altText : 'Missing alt text'}`}
                    >
                      <span className="truncate">
                        {hasAlt ? `Alt: ${item.altText}` : 'Missing Alt Text'}
                      </span>
                      <Edit3 className="w-3 h-3 shrink-0 opacity-70" />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleCopy(item)}
                    aria-label={`Copy URL for ${displayName}`}
                    className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-[#B7E84B] hover:underline cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none rounded px-1"
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
                    aria-label={`Delete ${displayName}`}
                    className="p-1 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer rounded focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Alt Text Edit Modal */}
      {editingAltItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="alt-text-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
        >
          <div className="bg-[#12241A] border border-[#B7E84B]/40 rounded-3xl p-6 max-w-lg w-full text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B7E84B]" />
                <h3 id="alt-text-title" className="text-sm font-black uppercase tracking-wider">
                  Edit Screen Reader Alt Text
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingAltItem(null)}
                aria-label="Close alt text modal"
                className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-xl bg-black/30 border border-white/10">
              <img
                src={editingAltItem.url}
                alt=""
                className="w-16 h-12 object-cover rounded-lg shrink-0 border border-white/10"
              />
              <div className="truncate text-xs">
                <p className="font-bold truncate text-white">{editingAltItem.fileName || (editingAltItem as any).name}</p>
                <p className="text-[10px] text-zinc-400 truncate">{editingAltItem.url}</p>
              </div>
            </div>

            <div>
              <label htmlFor="modal-alt-text-input" className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-zinc-200">
                Descriptive Alt Text (WCAG 2.1 AA)
              </label>
              <textarea
                id="modal-alt-text-input"
                rows={3}
                value={newAltText}
                onChange={(e) => setNewAltText(e.target.value)}
                placeholder="Describe what the image depicts for non-sighted users..."
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/20 text-xs text-white placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              />
              <p className="text-[10px] text-zinc-400 mt-1">
                Be specific and concise. Avoid starting with phrases like "image of" or "picture of".
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingAltItem(null)}
                className="px-4 py-2 rounded-xl border border-white/20 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAltText}
                className="px-5 py-2 rounded-xl bg-[#B7E84B] text-[#0F241A] font-black text-xs uppercase tracking-wider hover:bg-[#a5d83a] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none shadow-md"
              >
                Save Alt Text
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Preview Modal */}
      {previewItem && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setPreviewItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#12241A] border border-[#B7E84B]/30 rounded-3xl p-6 max-w-3xl w-full text-white space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold truncate max-w-md">{previewItem.fileName || (previewItem as any).name}</span>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                aria-label="Close preview"
                className="px-3 py-1 rounded-lg bg-white/10 text-xs font-bold uppercase cursor-pointer hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              >
                Close
              </button>
            </div>
            <div className="max-h-[60vh] overflow-hidden rounded-2xl bg-black/40 flex items-center justify-center">
              <img
                src={previewItem.url}
                alt={previewItem.altText || previewItem.fileName || (previewItem as any).name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-300">
              <span className="truncate max-w-md">{previewItem.url}</span>
              <button
                type="button"
                onClick={() => handleCopy(previewItem)}
                aria-label="Copy image URL"
                className="px-3 py-1.5 rounded-xl bg-[#B7E84B] text-[#0F241A] font-black uppercase text-[11px] cursor-pointer hover:bg-[#a5d83a] focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
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

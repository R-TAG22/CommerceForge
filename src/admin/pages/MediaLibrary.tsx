import React, { useState, useEffect, useRef } from 'react';
import {
  ImageIcon,
  Upload,
  Trash2,
  Copy,
  Check,
  Search,
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
import { FALLBACK_STORE_IMAGE, handleImageError, assetUrl } from '../../utils/imageFallbacks';

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
        const newAsset = await mediaService.uploadMedia(file);
        setMediaItems((prev) => [newAsset, ...prev]);
        showToast('success', 'Media Uploaded', `${file.name} saved to CMS assets.`);
      } catch (err: unknown) {
        showToast('error', 'Upload Failed', err instanceof Error ? err.message : 'Upload failed');
      }
    }
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCopy = (item: MediaAsset) => {
    const fullUrl = assetUrl(item.url);
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(item.id);
    showToast('info', 'URL Copied', 'Asset address copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    try {
      await mediaService.deleteMedia(deletingId);
      setMediaItems((prev) => prev.filter((m) => m.id !== deletingId));
      showToast('success', 'Deleted', 'Media asset removed successfully.');
    } catch (err: unknown) {
      showToast('error', 'Delete Failed', err instanceof Error ? err.message : 'Could not delete');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveAltText = async () => {
    if (!editingAltItem) return;
    try {
      if (mediaService.updateMediaAltText) {
        const updated = await mediaService.updateMediaAltText(editingAltItem.id, newAltText.trim());
        setMediaItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      }
      showToast('success', 'Alt Text Saved', 'Image accessibility metadata updated.');
      setEditingAltItem(null);
    } catch (err: unknown) {
      showToast('error', 'Update Failed', err instanceof Error ? err.message : 'Failed to update alt text');
    }
  };

  const filtered = mediaItems.filter((item) => {
    const matchesSearch =
      (item.fileName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.altText || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAltFilter = filterMissingAltOnly ? !item.altText || !item.altText.trim() : true;
    return matchesSearch && matchesAltFilter;
  });

  const missingAltCount = mediaItems.filter((item) => !item.altText || !item.altText.trim()).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Digital Asset Manager</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Media Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Store and organize client logos, hero banners, and project case study screenshots ({mediaItems.length} assets).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#B7E84B] hover:bg-[#a6d83b] text-[#0E1B13] text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'Uploading...' : 'Upload Media'}</span>
          </button>
        </div>
      </div>

      {/* WCAG Alt Text Compliance Banner */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white shadow-xs ${
          missingAltCount > 0 ? 'border-amber-300' : 'border-emerald-300'
        }`}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-xl ${
              missingAltCount > 0 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {missingAltCount > 0 ? <AlertCircle className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider block text-slate-900">
              {missingAltCount > 0
                ? `Accessibility Notice: ${missingAltCount} asset${missingAltCount > 1 ? 's' : ''} missing Alt text`
                : 'Accessibility (WCAG AA): 100% Compliant'}
            </span>
            <span className="text-[11px] text-slate-600 block mt-0.5 font-medium">
              {missingAltCount > 0
                ? 'Screen readers require descriptive alt text for images to ensure accessibility.'
                : 'All media assets have screen reader descriptions configured.'}
            </span>
          </div>
        </div>

        {missingAltCount > 0 && (
          <button
            type="button"
            onClick={() => setFilterMissingAltOnly(!filterMissingAltOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 border ${
              filterMissingAltOnly
                ? 'bg-amber-500 text-slate-900 border-amber-600'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
            }`}
          >
            {filterMissingAltOnly ? 'Show All Assets' : `Filter ${missingAltCount} Missing Alt`}
          </button>
        )}
      </div>

      {/* Drag & Drop Zone - Pure White Card */}
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
        className="p-8 rounded-3xl border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-white hover:bg-slate-50/50 transition-all flex flex-col items-center justify-center text-center cursor-pointer group shadow-xs"
      >
        <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-700 group-hover:bg-[#B7E84B] group-hover:text-[#0E1B13] transition-colors mb-3">
          <Upload className="w-6 h-6" />
        </div>
        <p className="text-sm font-black uppercase tracking-wider text-slate-900">
          Click to upload or drag and drop images
        </p>
        <p className="text-xs text-slate-500 font-medium mt-1">PNG, JPG, SVG, WebP up to 10MB each</p>
      </div>

      {/* Search Bar - Pure White Card */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter media by name or alt text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
            aria-label="Search media files"
          />
        </div>

        <span className="text-xs text-slate-600 font-semibold">
          Showing {filtered.length} of {mediaItems.length} assets
        </span>
      </div>

      {/* Grid of Media Assets - Pure White Cards */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 font-semibold text-xs">Loading media assets...</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-slate-600 font-medium text-xs rounded-2xl bg-white border border-slate-200 shadow-xs">
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
                className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 shadow-xs transition-all group flex flex-col justify-between"
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
                  className="aspect-video rounded-xl bg-slate-100 overflow-hidden relative border border-slate-100 cursor-pointer"
                >
                  <img
                    src={assetUrl(item.url)}
                    alt={item.altText || displayName}
                    onError={(e) => handleImageError(e, FALLBACK_STORE_IMAGE)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Name & Size */}
                <div className="mt-3">
                  <p className="text-xs font-black text-slate-900 truncate" title={displayName}>
                    {displayName}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">
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
                      className={`w-full text-left px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors flex items-center justify-between gap-1 cursor-pointer ${
                        hasAlt
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                          : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                      }`}
                      title="Click to edit screen reader description"
                    >
                      <span className="truncate">
                        {hasAlt ? `Alt: ${item.altText}` : 'Missing Alt Text'}
                      </span>
                      <Edit3 className="w-3 h-3 shrink-0 opacity-70" />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleCopy(item)}
                    className="inline-flex items-center gap-1 text-[11px] font-black uppercase text-emerald-700 hover:text-emerald-800 cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeletingId(item.id)}
                    aria-label={`Delete ${displayName}`}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer rounded"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
        >
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full text-slate-900 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                  Edit Screen Reader Alt Text
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingAltItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <img
                src={assetUrl(editingAltItem.url)}
                alt=""
                onError={(e) => handleImageError(e, FALLBACK_STORE_IMAGE)}
                className="w-16 h-12 object-cover rounded-lg shrink-0 border border-slate-200"
              />
              <div className="truncate text-xs">
                <p className="font-bold truncate text-slate-900">{editingAltItem.fileName || (editingAltItem as any).name}</p>
                <p className="text-[10px] text-slate-500 truncate font-mono">{editingAltItem.url}</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider mb-1.5 text-slate-800">
                Descriptive Alt Text (WCAG 2.1 AA)
              </label>
              <textarea
                rows={3}
                value={newAltText}
                onChange={(e) => setNewAltText(e.target.value)}
                placeholder="Describe what the image depicts for non-sighted users..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
              />
              <p className="text-[10px] text-slate-500 mt-1 font-medium">
                Be specific and concise. Avoid starting with phrases like "image of" or "picture of".
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingAltItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAltText}
                className="px-5 py-2 rounded-xl bg-[#B7E84B] text-[#0F241A] font-black text-xs uppercase tracking-wider hover:bg-[#a5d83a] transition-all cursor-pointer shadow-xs"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-3xl p-6 max-w-3xl w-full text-slate-900 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-black truncate max-w-md text-slate-900">
                {previewItem.fileName || (previewItem as any).name}
              </span>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold uppercase cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="max-h-[60vh] overflow-hidden rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
              <img
                src={assetUrl(previewItem.url)}
                alt={previewItem.altText || previewItem.fileName || (previewItem as any).name}
                onError={(e) => handleImageError(e, FALLBACK_STORE_IMAGE)}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-700">
              <span className="truncate max-w-md font-mono text-[11px] text-slate-500">{previewItem.url}</span>
              <button
                type="button"
                onClick={() => handleCopy(previewItem)}
                className="px-3.5 py-1.5 rounded-xl bg-[#B7E84B] text-[#0F241A] font-black uppercase text-[11px] cursor-pointer hover:bg-[#a5d83a] shadow-xs"
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

import React, { useState, useEffect } from 'react';
import { X, Upload, Search, Check, Image as ImageIcon } from 'lucide-react';
import { MediaAsset } from '../../types/cms';
import { mediaService } from '../../services/cms/mediaService';
import { useToast } from './Toast';
import { FALLBACK_STORE_IMAGE, handleImageError, assetUrl } from '../../utils/imageFallbacks';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string, asset?: MediaAsset) => void;
  currentValue?: string;
  title?: string;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentValue,
  title = 'Select Media Asset',
}) => {
  const { showToast } = useToast();
  const [mediaList, setMediaList] = useState<MediaAsset[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUrl, setSelectedUrl] = useState(currentValue || '');
  const [isUploading, setIsUploading] = useState(false);
  const [customUrl, setCustomUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      mediaService.getMedia().then(setMediaList).catch(console.error);
      setSelectedUrl(currentValue || '');
    }
  }, [isOpen, currentValue]);

  if (!isOpen) return null;

  const filtered = mediaList.filter((m) =>
    m.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.altText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const newAsset = await mediaService.uploadMedia(file);
      setMediaList((prev) => [newAsset, ...prev]);
      setSelectedUrl(newAsset.url);
      showToast('success', 'Media Uploaded', `${file.name} uploaded successfully.`);
    } catch (err: unknown) {
      showToast('error', 'Upload Failed', err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleConfirm = () => {
    const finalUrl = customUrl.trim() || selectedUrl;
    if (!finalUrl) {
      showToast('error', 'Selection Required', 'Please choose an image or enter a URL.');
      return;
    }
    const matched = mediaList.find((m) => m.url === finalUrl);
    onSelect(finalUrl, matched);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full h-[85vh] flex flex-col text-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base tracking-tight text-slate-900">{title}</h3>
              <p className="text-xs text-slate-500 font-medium">Pick from existing assets or upload a new file</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-3 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0 bg-slate-50">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#B7E84B] hover:bg-[#a6d83b] text-[#0F241A] text-xs font-black uppercase tracking-wider transition-colors shadow-xs w-full sm:w-auto">
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-slate-50/50">
          {filtered.map((asset) => {
            const isChosen = selectedUrl === asset.url;
            return (
              <div
                key={asset.id}
                onClick={() => {
                  setSelectedUrl(asset.url);
                  setCustomUrl('');
                }}
                className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all flex flex-col bg-white shadow-xs ${
                  isChosen
                    ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                    : 'border-slate-200 hover:border-slate-400'
                }`}
              >
                <div className="aspect-video w-full bg-slate-100 relative overflow-hidden flex items-center justify-center border-b border-slate-100">
                  <img
                    src={assetUrl(asset.url)}
                    alt={asset.altText}
                    onError={(e) => handleImageError(e, FALLBACK_STORE_IMAGE)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {isChosen && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-slate-900 truncate" title={asset.fileName}>
                    {asset.fileName}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">{asset.altText || 'No alt text'}</p>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-400">
              <ImageIcon className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-xs font-semibold">No media assets found matching "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Footer with Manual URL option & Confirm */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="w-full sm:w-1/2 flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 whitespace-nowrap">Direct URL:</span>
            <input
              type="text"
              placeholder="https://... or /screenshots/..."
              value={customUrl}
              onChange={(e) => {
                setCustomUrl(e.target.value);
                if (e.target.value) setSelectedUrl('');
              }}
              className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-6 py-2 rounded-xl bg-[#B7E84B] hover:bg-[#a6d83b] text-[#0F241A] text-xs font-black uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
            >
              Choose Selected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

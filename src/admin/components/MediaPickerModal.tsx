import React, { useState, useEffect } from 'react';
import { X, Upload, Search, Check, Image as ImageIcon } from 'lucide-react';
import { MediaAsset } from '../../types/cms';
import { mediaService } from '../../services/cms/mediaService';
import { useToast } from './Toast';

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
    <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#12241A] border border-[#B7E84B]/30 rounded-2xl max-w-4xl w-full h-[85vh] flex flex-col text-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#B7E84B]/20 text-[#B7E84B]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">{title}</h3>
              <p className="text-xs text-white/50">Pick from existing assets or upload a new file</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-3 border-b border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0 bg-[#162C20]">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#B7E84B]"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#B7E84B] hover:bg-[#a6d83b] text-[#0F241A] text-xs font-black uppercase tracking-wider transition-colors shadow-sm w-full sm:w-auto">
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
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((asset) => {
            const isChosen = selectedUrl === asset.url;
            return (
              <div
                key={asset.id}
                onClick={() => {
                  setSelectedUrl(asset.url);
                  setCustomUrl('');
                }}
                className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all flex flex-col bg-[#0F241A] ${
                  isChosen
                    ? 'border-[#B7E84B] ring-2 ring-[#B7E84B]/50'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <div className="aspect-video w-full bg-black/40 relative overflow-hidden flex items-center justify-center">
                  <img
                    src={asset.url}
                    alt={asset.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {isChosen && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#B7E84B] text-[#0F241A] flex items-center justify-center shadow-md">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-white truncate" title={asset.fileName}>
                    {asset.fileName}
                  </p>
                  <p className="text-[10px] text-white/50 truncate mt-0.5">{asset.altText}</p>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="col-span-full py-16 text-center text-white/50">
              <ImageIcon className="w-10 h-10 mx-auto text-white/20 mb-2" />
              <p className="text-xs">No media assets found matching "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Footer with Manual URL option & Confirm */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#162C20] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="w-full sm:w-1/2 flex items-center gap-2">
            <span className="text-xs text-white/60 whitespace-nowrap">Or Direct URL:</span>
            <input
              type="text"
              placeholder="https://... or /screenshots/..."
              value={customUrl}
              onChange={(e) => {
                setCustomUrl(e.target.value);
                if (e.target.value) setSelectedUrl('');
              }}
              className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#B7E84B]"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold uppercase tracking-wider text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-6 py-2 rounded-xl bg-[#B7E84B] hover:bg-[#a6d83b] text-[#0F241A] text-xs font-black uppercase tracking-wider transition-colors shadow-md"
            >
              Choose Selected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

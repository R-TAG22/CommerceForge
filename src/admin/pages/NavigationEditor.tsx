import React, { useState } from 'react';
import { 
  Compass, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useToast } from '../components/Toast';
import { NavigationItem } from '../../types/cms';

export const NavigationEditor: React.FC = () => {
  const { draftContent, updateSection, setPreviewMode } = useCMS();
  const { showToast } = useToast();

  const [headerData, setHeaderData] = useState(draftContent.header);
  const [navItems, setNavItems] = useState<NavigationItem[]>(draftContent.header?.navItems || []);
  const [editingItem, setEditingItem] = useState<{ index: number; data: NavigationItem } | null>(null);

  React.useEffect(() => {
    if (draftContent.header) {
      setHeaderData(draftContent.header);
      setNavItems(draftContent.header.navItems || []);
    }
  }, [draftContent.header]);

  const handleSaveNav = async (updated: NavigationItem[]) => {
    setNavItems(updated);
    await updateSection('header', {
      ...headerData,
      navItems: updated,
    });
    showToast('success', 'Navigation Saved', 'Header navigation updated on public website.');
  };

  const handleSaveCta = async () => {
    await updateSection('header', {
      ...headerData,
      navItems,
    });
    showToast('success', 'Header CTA Saved', 'Action button updated.');
  };

  const handleAddItem = () => {
    const newItem: NavigationItem = {
      id: `nav-${Date.now()}`,
      label: 'NEW LINK',
      url: '/about',
      sectionId: 'about',
      sortOrder: navItems.length,
      visible: true,
    };
    const updated = [...navItems, newItem];
    handleSaveNav(updated);
    setEditingItem({ index: navItems.length, data: newItem });
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= navItems.length) return;
    const updated = [...navItems];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    const sorted = updated.map((item, idx) => ({ ...item, sortOrder: idx }));
    handleSaveNav(sorted);
  };

  const handleToggleVisible = (index: number) => {
    const updated = [...navItems];
    updated[index] = { ...updated[index], visible: !updated[index].visible };
    handleSaveNav(updated);
  };

  const handleDeleteItem = (index: number) => {
    if (window.confirm(`Delete menu item "${navItems[index].label}"?`)) {
      const updated = navItems.filter((_, i) => i !== index);
      handleSaveNav(updated);
      if (editingItem?.index === index) {
        setEditingItem(null);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            Navigation
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Navigation Menu Editor
          </h1>
          <p className="mt-1 text-sm text-slate-600 font-medium">
            Control the top navbar links, their visual order, and the header call to action button.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddItem}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Menu Link</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setPreviewMode(true);
              window.open('#/', '_blank');
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 shadow-xs transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            <span>Preview Navbar</span>
          </button>
        </div>
      </div>

      {/* Nav Items List - White Card */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-600">
          Navbar Links (Order Left-to-Right)
        </h2>

        <div className="space-y-3">
          {navItems.map((item, index) => (
            <div
              key={item.id || index}
              className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 text-xs font-black text-slate-800">
                  {index + 1}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900 tracking-wider">
                      {item.label}
                    </span>
                    {!item.visible && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-50 text-rose-700 border border-rose-200">
                        Hidden
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-500">
                    Destination: {item.url}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50 shadow-xs">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMoveItem(index, 'up')}
                    className="p-1.5 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer"
                    title="Move left"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === navItems.length - 1}
                    onClick={() => handleMoveItem(index, 'down')}
                    className="p-1.5 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer"
                    title="Move right"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleVisible(index)}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer shadow-xs ${
                    item.visible
                      ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      : 'border-rose-300 bg-rose-50 text-rose-700'
                  }`}
                  title={item.visible ? 'Hide link' : 'Show link'}
                >
                  {item.visible ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-rose-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => setEditingItem({ index, data: { ...item } })}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider bg-[#B7E84B] text-[#0E1B13] hover:bg-[#a6d93b] cursor-pointer shadow-xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteItem(index)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                  title="Delete link"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Header CTA Button - White Card */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-700">
          Header Call To Action Button
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
              Button Text
            </label>
            <input
              type="text"
              value={headerData.ctaText || ''}
              onChange={(e) => setHeaderData({ ...headerData, ctaText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-bold shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              placeholder="HIRE US"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5">
              Button Action
            </label>
            <input
              type="text"
              value={headerData.ctaAction || ''}
              onChange={(e) => setHeaderData({ ...headerData, ctaAction: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              placeholder="open-inquiry or /hire-us"
            />
          </div>
        </div>

        <div>
          <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={headerData.ctaVisible !== false}
              onChange={(e) => setHeaderData({ ...headerData, ctaVisible: e.target.checked })}
              className="rounded text-emerald-600"
            />
            <span>Show CTA Button on Desktop &amp; Mobile Header</span>
          </label>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSaveCta}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Save Header CTA</span>
          </button>
        </div>
      </div>

      {/* Edit Link Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                Edit Menu Link
              </h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Menu Label
                </label>
                <input
                  type="text"
                  value={editingItem.data.label}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    data: { ...editingItem.data, label: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-bold shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Destination URL
                </label>
                <input
                  type="text"
                  value={editingItem.data.url}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    data: { ...editingItem.data, url: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-mono shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  placeholder="/about or /work or /packages"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const updated = [...navItems];
                  updated[editingItem.index] = editingItem.data;
                  handleSaveNav(updated);
                  setEditingItem(null);
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-black uppercase bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer"
              >
                Save Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

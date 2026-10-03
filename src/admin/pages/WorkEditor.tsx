import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Check, 
  ExternalLink,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useToast } from '../components/Toast';
import { MediaPickerModal } from '../components/MediaPickerModal';
import { PortfolioProject } from '../../types/cms';

export const WorkEditor: React.FC = () => {
  const { draftContent, updateSection, setPreviewMode } = useCMS();
  const { showToast } = useToast();

  const [projects, setProjects] = useState<PortfolioProject[]>(draftContent.portfolio || []);
  const [editingProject, setEditingProject] = useState<{ index: number; data: PortfolioProject } | null>(null);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  React.useEffect(() => {
    setProjects(draftContent.portfolio || []);
  }, [draftContent.portfolio]);

  const handleSaveProjects = async (updated: PortfolioProject[]) => {
    setProjects(updated);
    await updateSection('portfolio', updated);
    showToast('success', 'Work Saved', 'Portfolio projects updated on public site.');
  };

  const handleAddProject = () => {
    const newProj: PortfolioProject = {
      id: `project-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: 'New Client Store',
      clientName: 'New Client',
      category: 'ecommerce',
      categoryLabel: 'E-COMMERCE DTC',
      tagline: 'High-converting custom storefront with instant checkout.',
      rebuildHighlight: 'Re-engineered from slow bloated theme to sub-second headless experience.',
      url: 'https://example.com',
      displayUrl: 'example.com',
      previewImage: `${import.meta.env.BASE_URL}screenshots/placeholder.png`,
      buttonText: 'VISIT LIVE STORE',
      metricsLabel: 'Conversion Lift',
      metricsValue: '+38%',
      speedScore: '99/100 Core Vitals',
      accentColor: '#B7E84B',
      stack: ['Shopify Plus', 'Next.js / Vite', 'Tailwind CSS'],
      deliverables: ['Custom Mobile PDP', 'Express Checkout', 'Sub-800ms Edge CDN'],
      beforeProblems: ['High bounce on mobile', 'Sluggish 4.2s load time'],
      afterSolutions: ['Sub-second page speeds', 'Instant cart drawer'],
      sortOrder: projects.length,
      published: true,
    };
    const updated = [...projects, newProj];
    handleSaveProjects(updated);
    setEditingProject({ index: projects.length, data: newProj });
  };

  const handleMoveProject = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    const sorted = updated.map((p, idx) => ({ ...p, sortOrder: idx }));
    handleSaveProjects(sorted);
  };

  const handleTogglePublish = (index: number) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], published: !updated[index].published };
    handleSaveProjects(updated);
  };

  const handleDeleteProject = (index: number) => {
    if (window.confirm(`Delete "${projects[index].title}"? This cannot be undone.`)) {
      const updated = projects.filter((_, i) => i !== index);
      handleSaveProjects(updated);
      if (editingProject?.index === index) {
        setEditingProject(null);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
            Page Editor
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Work / Portfolio Editor
          </h1>
          <p className="mt-1 text-sm text-slate-600 font-medium">
            Add, edit, reorder, and showcase client rebuild case studies ({projects.length} total).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddProject}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setPreviewMode(true);
              window.open('#/work', '_blank');
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 shadow-xs transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            <span>View Work Page</span>
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((proj, index) => (
          <div
            key={proj.id || index}
            className={`p-5 rounded-2xl border transition-all duration-200 bg-white shadow-sm ${
              proj.published !== false 
                ? 'border-slate-200 hover:border-slate-300' 
                : 'border-dashed border-slate-300 bg-slate-50 opacity-75'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={proj.previewImage || `${import.meta.env.BASE_URL}screenshots/placeholder.png`}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}screenshots/placeholder.png`;
                    }}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-700">
                      {index + 1}
                    </span>
                    <h3 className="text-base font-black text-slate-900">
                      {proj.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {proj.metricsValue} {proj.metricsLabel}
                    </span>
                    {proj.published === false && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-50 text-rose-700 border border-rose-200">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-1 font-medium">
                    {proj.tagline || proj.rebuildHighlight}
                  </p>
                  <span className="text-[11px] font-mono text-slate-500 mt-0.5 block">
                    {proj.displayUrl || proj.url}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Reorder Buttons */}
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50 shadow-xs">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMoveProject(index, 'up')}
                    className="p-1.5 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer"
                    title="Move up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === projects.length - 1}
                    onClick={() => handleMoveProject(index, 'down')}
                    className="p-1.5 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer"
                    title="Move down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Visibility Toggle */}
                <button
                  type="button"
                  onClick={() => handleTogglePublish(index)}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer shadow-xs ${
                    proj.published !== false
                      ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      : 'border-rose-300 bg-rose-50 text-rose-700'
                  }`}
                  title={proj.published !== false ? 'Hide from public site' : 'Show on public site'}
                >
                  {proj.published !== false ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-rose-600" />}
                </button>

                {/* Edit Button */}
                <button
                  type="button"
                  onClick={() => setEditingProject({ index, data: { ...proj } })}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider bg-[#B7E84B] text-[#0E1B13] hover:bg-[#a6d93b] cursor-pointer shadow-xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleDeleteProject(index)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                  title="Delete project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Project Modal / Drawer - Crisp White */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                Edit Project: {editingProject.data.title}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1">
                    Project / Client Name
                  </label>
                  <input
                    type="text"
                    value={editingProject.data.title}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      data: { ...editingProject.data, title: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-bold shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1">
                    Industry / Category Label
                  </label>
                  <input
                    type="text"
                    value={editingProject.data.categoryLabel || ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      data: { ...editingProject.data, categoryLabel: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-semibold shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    placeholder="e.g. LUXURY BATH & HOME DTC"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1">
                    Live Website URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.data.url}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      data: { ...editingProject.data, url: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-mono shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1">
                    Display URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.data.displayUrl || ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      data: { ...editingProject.data, displayUrl: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-mono shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    placeholder="e.g. willowbath.com"
                  />
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/70">
                <div>
                  <label className="block text-[10px] font-black text-slate-700 uppercase mb-1">
                    Metric Value (e.g. +54%)
                  </label>
                  <input
                    type="text"
                    value={editingProject.data.metricsValue || ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      data: { ...editingProject.data, metricsValue: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-black text-emerald-700 shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-700 uppercase mb-1">
                    Metric Label
                  </label>
                  <input
                    type="text"
                    value={editingProject.data.metricsLabel || ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      data: { ...editingProject.data, metricsLabel: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-semibold shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    placeholder="AOV Expansion"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-700 uppercase mb-1">
                    Speed / Core Vitals
                  </label>
                  <input
                    type="text"
                    value={editingProject.data.speedScore || ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      data: { ...editingProject.data, speedScore: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-semibold shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    placeholder="99/100 Vitals"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1">
                  Preview Screenshot URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingProject.data.previewImage}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      data: { ...editingProject.data, previewImage: e.target.value }
                    })}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaPickerOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Select Media
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1">
                  Tagline / Pitch
                </label>
                <input
                  type="text"
                  value={editingProject.data.tagline || ''}
                  onChange={(e) => setEditingProject({
                    ...editingProject,
                    data: { ...editingProject.data, tagline: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  placeholder="e.g. High-AOV bathroom vanities, freestanding tubs & smart LED mirrors."
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1">
                  Rebuild Highlight
                </label>
                <textarea
                  rows={2}
                  value={editingProject.data.rebuildHighlight || ''}
                  onChange={(e) => setEditingProject({
                    ...editingProject,
                    data: { ...editingProject.data, rebuildHighlight: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-1">
                  Tech Stack (Comma Separated)
                </label>
                <input
                  type="text"
                  value={(editingProject.data.stack || []).join(', ')}
                  onChange={(e) => setEditingProject({
                    ...editingProject,
                    data: {
                      ...editingProject.data,
                      stack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-mono shadow-xs focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  placeholder="Shopify Plus, Hydrogen, Tailwind CSS"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const updated = [...projects];
                  updated[editingProject.index] = editingProject.data;
                  handleSaveProjects(updated);
                  setEditingProject(null);
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-black uppercase bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Picker */}
      {mediaPickerOpen && (
        <MediaPickerModal
          isOpen={mediaPickerOpen}
          onClose={() => setMediaPickerOpen(false)}
          onSelect={(url) => {
            if (editingProject) {
              setEditingProject({
                ...editingProject,
                data: { ...editingProject.data, previewImage: url }
              });
            }
            setMediaPickerOpen(false);
          }}
        />
      )}
    </div>
  );
};

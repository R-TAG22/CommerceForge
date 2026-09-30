import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Search,
  Save,
  X,
  Image as ImageIcon,
  CheckCircle2,
  UploadCloud,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { PortfolioProject } from '../../types/cms';
import { useToast } from '../components/Toast';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { MediaPickerModal } from '../components/MediaPickerModal';

export const PortfolioEditor: React.FC = () => {
  const { draftContent, updateSection, publishSection } = useCMS();
  const { showToast } = useToast();

  const [projects, setProjects] = useState<PortfolioProject[]>(
    JSON.parse(JSON.stringify(draftContent.portfolio))
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Deliverables / Problems temp textareas in edit mode
  const [deliverablesText, setDeliverablesText] = useState('');
  const [problemsText, setProblemsText] = useState('');
  const [solutionsText, setSolutionsText] = useState('');
  const [stackText, setStackText] = useState('');

  const handleSaveAll = async (updatedList?: PortfolioProject[]) => {
    const toSave = updatedList || projects;
    setIsSaving(true);
    try {
      await updateSection('portfolio', toSave);
      showToast('success', 'Portfolio Draft Saved', 'Portfolio projects updated in draft. Click "Publish Live" to push changes to public site.');
    } catch (err: unknown) {
      showToast('error', 'Save Failed', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishNow = async (listToPublish?: PortfolioProject[]) => {
    setIsPublishing(true);
    try {
      const toSave = listToPublish || projects;
      await publishSection('portfolio', toSave);
      showToast('success', 'Published Live!', 'Portfolio projects are now live on the public website.');
    } catch (err: unknown) {
      showToast('error', 'Publish Failed', err instanceof Error ? err.message : 'Publish failed');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleOpenEdit = (project: PortfolioProject) => {
    setEditingProject(JSON.parse(JSON.stringify(project)));
    setDeliverablesText(project.deliverables?.join('\n') || '');
    setProblemsText(project.beforeProblems?.join('\n') || '');
    setSolutionsText(project.afterSolutions?.join('\n') || '');
    setStackText(project.stack?.join(', ') || '');
  };

  const handleSaveEditModal = (publishImmediately = false) => {
    if (!editingProject) return;

    const updatedProject: PortfolioProject = {
      ...editingProject,
      deliverables: deliverablesText.split('\n').map((s) => s.trim()).filter(Boolean),
      beforeProblems: problemsText.split('\n').map((s) => s.trim()).filter(Boolean),
      afterSolutions: solutionsText.split('\n').map((s) => s.trim()).filter(Boolean),
      stack: stackText.split(',').map((s) => s.trim()).filter(Boolean),
      updatedAt: new Date().toISOString(),
    };

    const next = projects.map((p) => (p.id === updatedProject.id ? updatedProject : p));
    setProjects(next);
    setEditingProject(null);
    if (publishImmediately) {
      handlePublishNow(next);
    } else {
      handleSaveAll(next);
    }
  };

  const handleAddNew = () => {
    const newProject: PortfolioProject = {
      id: `project-${Date.now()}`,
      title: 'New Client Project',
      clientName: 'Client Name',
      url: 'https://example.com',
      displayUrl: 'example.com',
      previewImage: '/screenshots/new/goldandgrove.png',
      buttonText: 'Visit Live',
      category: 'ecommerce',
      categoryLabel: 'E-COMMERCE & DTC',
      tagline: 'Short one-sentence client summary.',
      rebuildHighlight: 'Engineered high-converting storefront architecture.',
      metricsLabel: 'Conversion Lift',
      metricsValue: '+150%',
      speedScore: '99/100 Core Vitals',
      accentColor: '#B7E84B',
      stack: ['React', 'TypeScript', 'Tailwind'],
      deliverables: ['Custom Mobile Design', 'Sub-600ms load', 'Clean code'],
      beforeProblems: ['Outdated layout', 'Sluggish load'],
      afterSolutions: ['Instant page speed', '1-tap checkout'],
      sortOrder: projects.length,
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const next = [newProject, ...projects];
    setProjects(next);
    handleOpenEdit(newProject);
  };

  const handleDuplicate = (project: PortfolioProject) => {
    const copy: PortfolioProject = {
      ...JSON.parse(JSON.stringify(project)),
      id: `project-${Date.now()}`,
      title: `${project.title} (Copy)`,
      sortOrder: projects.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const next = [...projects, copy];
    setProjects(next);
    handleSaveAll(next);
    showToast('info', 'Project Duplicated', `Created copy of ${project.title}`);
  };

  const handleDeleteConfirm = () => {
    if (!isDeletingId) return;
    const next = projects.filter((p) => p.id !== isDeletingId);
    setProjects(next);
    setIsDeletingId(null);
    handleSaveAll(next);
    showToast('info', 'Project Deleted', 'Project removed from portfolio.');
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= projects.length) return;

    const list = [...projects];
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;
    list.forEach((p, idx) => (p.sortOrder = idx));
    setProjects(list);
    handleSaveAll(list);
  };

  const handleTogglePublished = (id: string) => {
    const next = projects.map((p) => (p.id === id ? { ...p, published: !p.published } : p));
    setProjects(next);
    handleSaveAll(next);
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Title & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
            <Briefcase className="w-4 h-4" />
            <span>Case Studies & Showcase</span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">Portfolio Projects</h1>
          <p className="text-xs text-white/60">
            Manage live client projects ({projects.length} total, {projects.filter((p) => p.published).length} published)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSaveAll()}
            disabled={isSaving || isPublishing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/10 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#B7E84B]" />
            <span>{isSaving ? 'Saving...' : 'Save Drafts'}</span>
          </button>
          <button
            type="button"
            onClick={() => handlePublishNow()}
            disabled={isSaving || isPublishing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#B7E84B] hover:bg-[#a6d83b] text-[#0F241A] text-xs font-black uppercase tracking-wider transition-colors shadow-md disabled:opacity-50 cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{isPublishing ? 'Publishing...' : 'Publish Live'}</span>
          </button>
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/15 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#B7E84B]" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Search Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#12241A] border border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by name, client, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#B7E84B]"
          />
        </div>

        <span className="text-xs text-white/50">
          Showing {filtered.length} of {projects.length} projects
        </span>
      </div>

      {/* Projects List */}
      <div className="space-y-3.5">
        {filtered.map((project, index) => (
          <div
            key={project.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              project.published
                ? 'bg-[#12241A] border-white/10 hover:border-[#B7E84B]/40'
                : 'bg-[#101C14] border-white/5 opacity-70'
            }`}
          >
            {/* Reorder Buttons */}
            <div className="flex sm:flex-col items-center gap-1 shrink-0">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => handleMove(index, 'up')}
                className="p-1 text-white/40 hover:text-white disabled:opacity-20"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={index === filtered.length - 1}
                onClick={() => handleMove(index, 'down')}
                className="p-1 text-white/40 hover:text-white disabled:opacity-20"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail Preview */}
            <div className="w-24 h-16 rounded-xl bg-black/40 overflow-hidden shrink-0 border border-white/10 relative">
              <img
                src={project.previewImage}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black uppercase text-white truncate">{project.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80 font-bold uppercase tracking-wider">
                  {project.categoryLabel}
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: project.accentColor || '#B7E84B' }}
                  title="Brand accent color"
                />
              </div>

              <p className="text-xs text-white/60 truncate mt-1">{project.tagline}</p>

              <div className="flex items-center gap-4 text-[11px] text-white/50 mt-1.5 flex-wrap">
                <span className="text-[#B7E84B] font-bold">
                  {project.metricsLabel}: {project.metricsValue}
                </span>
                <span>•</span>
                <span>{project.speedScore}</span>
                <span>•</span>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 underline decoration-white/30"
                >
                  <span>{project.displayUrl}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              {/* Publish Toggle */}
              <button
                type="button"
                onClick={() => handleTogglePublished(project.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                  project.published
                    ? 'bg-[#EAF3E8]/10 text-[#B7E84B] border border-[#B7E84B]/30'
                    : 'bg-white/5 text-white/40 border border-white/10'
                }`}
              >
                {project.published ? 'Published' : 'Draft'}
              </button>

              {/* Duplicate */}
              <button
                type="button"
                onClick={() => handleDuplicate(project)}
                title="Duplicate project"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>

              {/* Edit */}
              <button
                type="button"
                onClick={() => handleOpenEdit(project)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5 text-[#B7E84B]" />
                <span>Edit</span>
              </button>

              {/* Delete */}
              <button
                type="button"
                onClick={() => setIsDeletingId(project.id)}
                className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#12241A] border border-[#B7E84B]/30 rounded-3xl max-w-3xl w-full my-8 p-6 sm:p-8 text-white shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight">Edit Portfolio Project</h3>
                <p className="text-xs text-white/60">Configure project details, metrics, and live URLs</p>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Client Name
                </label>
                <input
                  type="text"
                  value={editingProject.clientName}
                  onChange={(e) => setEditingProject({ ...editingProject, clientName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Live Website URL
                </label>
                <input
                  type="text"
                  value={editingProject.url}
                  onChange={(e) => setEditingProject({ ...editingProject, url: e.target.value })}
                  placeholder="https://goldandgrove.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Display URL (clean text)
                </label>
                <input
                  type="text"
                  value={editingProject.displayUrl}
                  onChange={(e) => setEditingProject({ ...editingProject, displayUrl: e.target.value })}
                  placeholder="goldandgrove.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Category Label
                </label>
                <input
                  type="text"
                  value={editingProject.categoryLabel}
                  onChange={(e) => setEditingProject({ ...editingProject, categoryLabel: e.target.value })}
                  placeholder="SKIN NUTRITION & WELLNESS"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Accent Color (Hex)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={editingProject.accentColor || '#B7E84B'}
                    onChange={(e) => setEditingProject({ ...editingProject, accentColor: e.target.value })}
                    className="w-9 h-9 rounded-lg border border-white/15 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editingProject.accentColor || '#B7E84B'}
                    onChange={(e) => setEditingProject({ ...editingProject, accentColor: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
                  />
                </div>
              </div>
            </div>

            {/* Preview Screenshot Image Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                Preview Screenshot Image
              </label>
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#162C20] border border-white/10">
                <div className="w-28 h-18 rounded-xl bg-black/40 overflow-hidden shrink-0 border border-white/10">
                  <img
                    src={editingProject.previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={editingProject.previewImage}
                    onChange={(e) => setEditingProject({ ...editingProject, previewImage: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => setIsMediaPickerOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B7E84B] text-[#0F241A] text-xs font-bold uppercase tracking-wider"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Choose From Media Library</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tagline & Rebuild Highlight */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Tagline (Brief description)
                </label>
                <input
                  type="text"
                  value={editingProject.tagline}
                  onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Rebuild Highlight
                </label>
                <textarea
                  rows={2}
                  value={editingProject.rebuildHighlight}
                  onChange={(e) => setEditingProject({ ...editingProject, rebuildHighlight: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B7E84B]"
                />
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Metrics Label
                </label>
                <input
                  type="text"
                  value={editingProject.metricsLabel}
                  onChange={(e) => setEditingProject({ ...editingProject, metricsLabel: e.target.value })}
                  placeholder="Subscription Retention"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
                  Metrics Value
                </label>
                <input
                  type="text"
                  value={editingProject.metricsValue}
                  onChange={(e) => setEditingProject({ ...editingProject, metricsValue: e.target.value })}
                  placeholder="+220%"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-[#B7E84B]/40 text-xs text-[#B7E84B] font-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Speed Score
                </label>
                <input
                  type="text"
                  value={editingProject.speedScore}
                  onChange={(e) => setEditingProject({ ...editingProject, speedScore: e.target.value })}
                  placeholder="99/100 Core Vitals"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>
            </div>

            {/* Lists: Deliverables, Problems, Solutions, Stack */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Deliverables (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={deliverablesText}
                  onChange={(e) => setDeliverablesText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Tech Stack (comma separated)
                </label>
                <textarea
                  rows={3}
                  value={stackText}
                  onChange={(e) => setStackText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-red-300 mb-1">
                  Before Problems (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={problemsText}
                  onChange={(e) => setProblemsText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#B7E84B] mb-1">
                  After Solutions (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={solutionsText}
                  onChange={(e) => setSolutionsText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveEditModal(false)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/10"
              >
                Save to Draft
              </button>
              <button
                type="button"
                onClick={() => handleSaveEditModal(true)}
                className="px-6 py-2 rounded-xl bg-[#B7E84B] hover:bg-[#a6d83b] text-[#0F241A] text-xs font-black uppercase tracking-wider shadow-md transition-colors"
              >
                Save & Publish Live
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        currentValue={editingProject?.previewImage}
        onSelect={(url) => {
          if (editingProject) {
            setEditingProject({ ...editingProject, previewImage: url });
          }
        }}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!isDeletingId}
        title="Delete Portfolio Project"
        message="Are you sure you want to permanently remove this case study from the portfolio? This cannot be undone."
        confirmLabel="Delete Project"
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeletingId(null)}
      />
    </div>
  );
};

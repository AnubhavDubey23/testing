import React, { useState } from 'react';
import { mockTemplatesData } from '../data/mockDashboard';

const templateCategories = ['Restaurants & Cafes', 'Lawyers & Advocates', 'Hotels & Resorts', 'Fitness & Wellness', 'Catering Service', 'Doctors & Clinics'];

export default function TemplatesManagementPage() {
  const [templates, setTemplates] = useState(mockTemplatesData);
  const [showModal, setShowModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [formData, setFormData] = useState({
    name: '', category: '', description: '', image: '', previewUrl: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setEditingTemplate(null);
    setFormData({ name: '', category: '', description: '', image: '', previewUrl: '' });
    setShowModal(true);
  };

  const openEditModal = (template) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      category: template.category,
      description: template.description,
      image: template.image,
      previewUrl: template.previewUrl,
    });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingTemplate) {
      setTemplates(prev => prev.map(t => t.id === editingTemplate.id ? { ...t, ...formData } : t));
    } else {
      const newTemplate = {
        id: Date.now(),
        ...formData,
      };
      setTemplates(prev => [...prev, newTemplate]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      setTemplates(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <section className="relative min-h-screen bg-cloud dark:bg-dark-900 pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 reveal">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy dark:text-white mb-2">
              Templates Management
            </h1>
            <p className="text-navy/50 dark:text-white/50 text-sm">Manage your website template library</p>
          </div>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy dark:bg-teal text-white text-sm font-medium hover:shadow-glow transition-all"
          >
            <i className="fas fa-plus" /> Add New Template
          </button>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
          {templates.map(template => (
            <div key={template.id} className="glass-card overflow-hidden group">
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(template)}
                      className="px-4 py-2 rounded-lg bg-white/90 text-navy text-xs font-medium hover:bg-white transition-colors"
                    >
                      <i className="fas fa-edit mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(template.id)}
                      className="px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-colors"
                    >
                      <i className="fas fa-trash mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-base font-semibold text-navy dark:text-white">{template.name}</h3>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-teal/10 text-teal font-medium">{template.category}</span>
                </div>
                <p className="text-navy/60 dark:text-white/60 text-xs leading-relaxed">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg glass-card p-8 shadow-2xl max-h-[90vh] overflow-y-auto" style={{ background: 'var(--bg-card, #fff)' }}>
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-navy/40 dark:text-white/40 hover:text-navy dark:hover:text-white transition-colors">
              <i className="fas fa-times text-lg" />
            </button>

            <h2 className="font-display text-xl font-bold text-navy dark:text-white mb-6">
              {editingTemplate ? 'Edit Template' : 'Add New Template'}
            </h2>

            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-navy/80 dark:text-white/80 mb-1.5">Template Name</label>
                <input
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  placeholder="e.g. Restaurant Pro"
                  className="w-full px-4 py-3 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 transition-all placeholder:text-navy/30 dark:placeholder:text-white/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy/80 dark:text-white/80 mb-1.5">Category</label>
                <select
                  name="category" required value={formData.category} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 transition-all"
                >
                  <option value="">Select category...</option>
                  {templateCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy/80 dark:text-white/80 mb-1.5">Description</label>
                <textarea
                  name="description" required value={formData.description} onChange={handleChange}
                  rows={3} placeholder="Brief description of the template..."
                  className="w-full px-4 py-3 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 transition-all resize-none placeholder:text-navy/30 dark:placeholder:text-white/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy/80 dark:text-white/80 mb-1.5">Image URL</label>
                <input
                  type="url" name="image" required value={formData.image} onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 transition-all placeholder:text-navy/30 dark:placeholder:text-white/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy/80 dark:text-white/80 mb-1.5">Live Preview URL</label>
                <input
                  type="url" name="previewUrl" value={formData.previewUrl} onChange={handleChange}
                  placeholder="https://preview.example.com"
                  className="w-full px-4 py-3 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 transition-all placeholder:text-navy/30 dark:placeholder:text-white/30"
                />
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div className="rounded-xl overflow-hidden border border-navy/5 dark:border-white/5">
                  <img src={formData.image} alt="Preview" className="w-full h-40 object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl border border-navy/10 dark:border-white/10 text-navy dark:text-white text-sm font-medium hover:bg-navy/5 dark:hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-navy dark:bg-teal text-white text-sm font-medium hover:shadow-glow transition-all"
                >
                  {editingTemplate ? 'Save Changes' : 'Add Template'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { mockBlogs, blogCategories } from '../data/mockBlogs';

export default function BlogEditorPage() {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const navigate = useNavigate();

  const existingBlog = editId ? mockBlogs.find(b => b.id === editId) : null;

  const [title, setTitle] = useState(existingBlog?.title || '');
  const [category, setCategory] = useState(existingBlog?.category || '');
  const [tagsInput, setTagsInput] = useState('');
  const [tags, setTags] = useState(existingBlog?.tags || []);
  const [thumbnailUrl, setThumbnailUrl] = useState(existingBlog?.thumbnail || '');
  const [content, setContent] = useState(existingBlog?.content || '');
  const [submitted, setSubmitted] = useState(false);
  const editorRef = useRef(null);

  // Simple content-editable rich text editor
  useEffect(() => {
    if (editorRef.current && existingBlog?.content) {
      editorRef.current.innerHTML = existingBlog.content;
    }
  }, []);

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagsInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagsInput.trim())) {
        setTags([...tags, tagsInput.trim()]);
      }
      setTagsInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  const execCommand = (cmd, value = null) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
  };

  const handleSubmit = (status) => {
    const htmlContent = editorRef.current?.innerHTML || '';
    const blogData = {
      title,
      category,
      tags,
      thumbnail: thumbnailUrl,
      content: htmlContent,
      status,
      date: new Date().toISOString().split('T')[0],
    };
    console.log('Blog submitted:', blogData);
    setSubmitted(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (submitted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-cloud dark:bg-dark-900 pt-28 pb-20 px-4">
        <div className="text-center glass-card p-12 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check-circle text-3xl text-emerald-500" />
          </div>
          <h2 className="font-display text-2xl font-bold text-navy dark:text-white mb-2">Blog Submitted!</h2>
          <p className="text-navy/60 dark:text-white/60 text-sm">
            Your blog post has been submitted for approval. Redirecting to dashboard...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-cloud dark:bg-dark-900 pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 reveal">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy dark:text-white mb-2">
            {editId ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
          <p className="text-navy/50 dark:text-white/50 text-sm">Write and publish your article</p>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div className="glass-card p-6 reveal">
            <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title..."
              className="w-full px-4 py-3 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-teal/40 transition-all placeholder:text-navy/30 dark:placeholder:text-white/30"
            />
          </div>

          {/* Category + Thumbnail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-6 reveal">
              <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 transition-all"
              >
                <option value="">Select category...</option>
                {blogCategories.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="glass-card p-6 reveal">
              <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Thumbnail URL</label>
              <input
                type="url"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 transition-all placeholder:text-navy/30 dark:placeholder:text-white/30"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="glass-card p-6 reveal">
            <label className="block text-sm font-semibold text-navy dark:text-white mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal/10 text-teal text-xs font-medium">
                  #{tag}
                  <button onClick={() => handleRemoveTag(tag)} className="text-teal/60 hover:text-red-500 transition-colors ml-1">
                    <i className="fas fa-times text-[10px]" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type a tag and press Enter..."
              className="w-full px-4 py-3 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 transition-all placeholder:text-navy/30 dark:placeholder:text-white/30"
            />
          </div>

          {/* Rich Text Editor */}
          <div className="glass-card overflow-hidden reveal">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-3 border-b border-navy/5 dark:border-white/5 bg-navy/3 dark:bg-white/3">
              <button onClick={() => execCommand('bold')} className="w-8 h-8 rounded-lg flex items-center justify-center text-navy/60 dark:text-white/60 hover:bg-teal/10 hover:text-teal transition-colors" title="Bold">
                <i className="fas fa-bold text-xs" />
              </button>
              <button onClick={() => execCommand('italic')} className="w-8 h-8 rounded-lg flex items-center justify-center text-navy/60 dark:text-white/60 hover:bg-teal/10 hover:text-teal transition-colors" title="Italic">
                <i className="fas fa-italic text-xs" />
              </button>
              <button onClick={() => execCommand('underline')} className="w-8 h-8 rounded-lg flex items-center justify-center text-navy/60 dark:text-white/60 hover:bg-teal/10 hover:text-teal transition-colors" title="Underline">
                <i className="fas fa-underline text-xs" />
              </button>
              <div className="w-px h-6 bg-navy/10 dark:bg-white/10 self-center mx-1" />
              <button onClick={() => execCommand('formatBlock', 'h2')} className="w-8 h-8 rounded-lg flex items-center justify-center text-navy/60 dark:text-white/60 hover:bg-teal/10 hover:text-teal transition-colors text-xs font-bold" title="Heading 2">
                H2
              </button>
              <button onClick={() => execCommand('formatBlock', 'h3')} className="w-8 h-8 rounded-lg flex items-center justify-center text-navy/60 dark:text-white/60 hover:bg-teal/10 hover:text-teal transition-colors text-xs font-bold" title="Heading 3">
                H3
              </button>
              <button onClick={() => execCommand('formatBlock', 'p')} className="w-8 h-8 rounded-lg flex items-center justify-center text-navy/60 dark:text-white/60 hover:bg-teal/10 hover:text-teal transition-colors" title="Paragraph">
                <i className="fas fa-paragraph text-xs" />
              </button>
              <div className="w-px h-6 bg-navy/10 dark:bg-white/10 self-center mx-1" />
              <button onClick={() => execCommand('insertUnorderedList')} className="w-8 h-8 rounded-lg flex items-center justify-center text-navy/60 dark:text-white/60 hover:bg-teal/10 hover:text-teal transition-colors" title="Bullet List">
                <i className="fas fa-list-ul text-xs" />
              </button>
              <button onClick={() => execCommand('insertOrderedList')} className="w-8 h-8 rounded-lg flex items-center justify-center text-navy/60 dark:text-white/60 hover:bg-teal/10 hover:text-teal transition-colors" title="Numbered List">
                <i className="fas fa-list-ol text-xs" />
              </button>
              <button onClick={() => {
                const url = prompt('Enter link URL:');
                if (url) execCommand('createLink', url);
              }} className="w-8 h-8 rounded-lg flex items-center justify-center text-navy/60 dark:text-white/60 hover:bg-teal/10 hover:text-teal transition-colors" title="Insert Link">
                <i className="fas fa-link text-xs" />
              </button>
            </div>

            {/* Editable Content */}
            <div
              ref={editorRef}
              contentEditable
              className="min-h-[300px] p-6 text-navy dark:text-white text-sm leading-relaxed focus:outline-none prose prose-sm prose-slate dark:prose-invert max-w-none"
              style={{ direction: 'ltr' }}
              suppressContentEditableWarning
              data-placeholder="Start writing your blog post..."
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-end reveal">
            <button
              onClick={() => handleSubmit('Draft')}
              className="px-6 py-3 rounded-xl border border-navy/10 dark:border-white/10 text-navy dark:text-white text-sm font-medium hover:bg-navy/5 dark:hover:bg-white/5 transition-all"
            >
              <i className="fas fa-save mr-2" />Save as Draft
            </button>
            <button
              onClick={() => handleSubmit('Pending')}
              className="px-6 py-3 rounded-xl bg-navy dark:bg-teal text-white text-sm font-medium hover:shadow-glow transition-all"
            >
              <i className="fas fa-paper-plane mr-2" />Submit for Approval
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockBlogs, blogCategories } from '../data/mockBlogs';

export default function BlogListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');

  const allTags = [...new Set(mockBlogs.flatMap(b => b.tags))];

  const publishedBlogs = mockBlogs.filter(b => b.status === 'Published');

  const filteredBlogs = publishedBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <section className="relative min-h-screen bg-cloud dark:bg-dark-900 pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <h1 className="font-display text-display-2 text-navy dark:text-white mb-4">Our Blog</h1>
          <p className="text-navy/60 dark:text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            Insights, tips, and stories from the Codexveer team
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/40 dark:text-white/40">
              <i className="fas fa-search text-sm"></i>
            </span>
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 transition-all"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/40"
            >
              {blogCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Tag Filter */}
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/40"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>#{tag}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <i className="fas fa-search text-4xl text-navy/20 dark:text-white/20 mb-4"></i>
            <p className="text-navy/50 dark:text-white/50">No blogs found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="glass-card overflow-hidden group cursor-pointer no-underline"
              >
                <div className="relative overflow-hidden aspect-[16/9]">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-teal/90 text-white text-xs font-medium">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-navy/40 dark:text-white/40 mb-3">
                    <span>{new Date(blog.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>•</span>
                    <span>{blog.author.name}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-navy dark:text-white mb-2 group-hover:text-teal transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-navy/60 dark:text-white/60 text-sm leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {blog.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-md bg-navy/5 dark:bg-white/5 text-navy/50 dark:text-white/50">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

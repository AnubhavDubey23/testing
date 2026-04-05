import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockBlogs } from '../data/mockBlogs';

export default function BlogDetailPage() {
  const { id } = useParams();
  const blog = mockBlogs.find(b => b.id === id);
  const [userRating, setUserRating] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(blog?.comments || []);
  const [copied, setCopied] = useState(false);

  if (!blog) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-cloud dark:bg-dark-900 pt-28">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-5xl text-navy/20 dark:text-white/20 mb-4"></i>
          <h2 className="font-display text-2xl text-navy dark:text-white mb-2">Blog Not Found</h2>
          <Link to="/blog" className="text-teal hover:underline text-sm">← Back to blogs</Link>
        </div>
      </section>
    );
  }

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      id: comments.length + 1,
      author: 'Guest User',
      text: commentText,
      date: new Date().toISOString().split('T')[0],
    };
    setComments([...comments, newComment]);
    setCommentText('');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out: ${blog.title}`;
    const links = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }
    window.open(links[platform], '_blank', 'width=600,height=400');
  };

  return (
    <section className="relative min-h-screen bg-cloud dark:bg-dark-900 pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-navy/50 dark:text-white/50 hover:text-teal transition-colors mb-8 no-underline">
          <i className="fas fa-arrow-left"></i> Back to Blogs
        </Link>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden mb-8 aspect-[2/1]">
          <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <span className="inline-block px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-medium">{blog.category}</span>
          <span className="text-xs text-navy/40 dark:text-white/40">
            {new Date(blog.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy dark:text-white mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-navy/5 dark:border-white/5">
          <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-white font-bold">
            {blog.author.avatar}
          </div>
          <div>
            <p className="text-sm font-semibold text-navy dark:text-white">{blog.author.name}</p>
            <p className="text-xs text-navy/40 dark:text-white/40">{blog.author.role}</p>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose prose-slate dark:prose-invert max-w-none mb-12 text-navy/80 dark:text-white/80 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {blog.tags.map(tag => (
            <span key={tag} className="text-sm px-3 py-1.5 rounded-lg bg-navy/5 dark:bg-white/5 text-navy/60 dark:text-white/60">
              #{tag}
            </span>
          ))}
        </div>

        {/* Star Rating */}
        <div className="mb-8 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-navy/5 dark:border-white/5">
          <h3 className="font-display font-semibold text-navy dark:text-white mb-3">Rate this article</h3>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setUserRating(star)}
                className={`text-2xl transition-colors ${star <= userRating ? 'text-yellow-400' : 'text-navy/15 dark:text-white/15'} hover:text-yellow-400`}
              >
                <i className="fas fa-star"></i>
              </button>
            ))}
            <span className="ml-3 text-sm text-navy/50 dark:text-white/50">
              {userRating > 0 ? `You rated ${userRating}/5` : `Average: ${blog.rating}/5`}
            </span>
          </div>
        </div>

        {/* Social Share */}
        <div className="mb-8 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-navy/5 dark:border-white/5">
          <h3 className="font-display font-semibold text-navy dark:text-white mb-3">Share this article</h3>
          <div className="flex gap-3">
            <button onClick={() => handleShare('twitter')} className="w-10 h-10 rounded-xl bg-navy/5 dark:bg-white/5 flex items-center justify-center text-navy/60 dark:text-white/60 hover:bg-sky-500 hover:text-white transition-all">
              <i className="fab fa-x-twitter"></i>
            </button>
            <button onClick={() => handleShare('whatsapp')} className="w-10 h-10 rounded-xl bg-navy/5 dark:bg-white/5 flex items-center justify-center text-navy/60 dark:text-white/60 hover:bg-green-500 hover:text-white transition-all">
              <i className="fab fa-whatsapp"></i>
            </button>
            <button onClick={() => handleShare('linkedin')} className="w-10 h-10 rounded-xl bg-navy/5 dark:bg-white/5 flex items-center justify-center text-navy/60 dark:text-white/60 hover:bg-blue-600 hover:text-white transition-all">
              <i className="fab fa-linkedin-in"></i>
            </button>
            <button onClick={() => handleShare('copy')} className="w-10 h-10 rounded-xl bg-navy/5 dark:bg-white/5 flex items-center justify-center text-navy/60 dark:text-white/60 hover:bg-teal hover:text-white transition-all">
              <i className={`fas ${copied ? 'fa-check' : 'fa-link'}`}></i>
            </button>
          </div>
        </div>

        {/* Comments */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-navy/5 dark:border-white/5">
          <h3 className="font-display font-semibold text-navy dark:text-white mb-6">
            Comments ({comments.length})
          </h3>

          {comments.length > 0 && (
            <div className="space-y-4 mb-6">
              {comments.map(comment => (
                <div key={comment.id} className="p-4 rounded-xl bg-navy/3 dark:bg-white/3 border border-navy/5 dark:border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center">
                      <span className="text-teal text-xs font-bold">{comment.author[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy dark:text-white">{comment.author}</p>
                      <p className="text-xs text-navy/40 dark:text-white/40">{comment.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-navy/70 dark:text-white/70">{comment.text}</p>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleAddComment} className="flex gap-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-4 py-3 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-navy dark:bg-teal text-white text-sm font-medium transition-all hover:shadow-glow"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

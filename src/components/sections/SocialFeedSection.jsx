import React from 'react';

const mockInstagramPosts = [
  { image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop', likes: 245 },
  { image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=300&fit=crop', likes: 189 },
  { image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=300&fit=crop', likes: 312 },
  { image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop', likes: 167 },
  { image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=300&h=300&fit=crop', likes: 421 },
  { image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&h=300&fit=crop', likes: 278 },
];

const mockTweets = [
  {
    author: 'Codexveer',
    handle: '@codexveer',
    content: '🚀 Excited to launch our new template collection for restaurants and cafes! Check it out at codexveer.com #WebDesign #Templates',
    time: '2h ago',
    likes: 45,
    retweets: 12,
  },
  {
    author: 'Codexveer',
    handle: '@codexveer',
    content: '💡 Building a strong online presence starts with a clean, professional website. Let us help you get there! #DigitalSolutions',
    time: '5h ago',
    likes: 89,
    retweets: 23,
  },
  {
    author: 'Codexveer',
    handle: '@codexveer',
    content: '📱 Mobile app development done right. From idea to launch, we\'ve got you covered. Contact us today! #MobileApps',
    time: '1d ago',
    likes: 134,
    retweets: 45,
  },
];

export default function SocialFeedSection() {
  return (
    <section id="social-feed" className="relative py-20 sm:py-24 bg-cloud dark:bg-slate-950 z-10 section-spacing overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <h2 className="font-display text-display-2 text-navy dark:text-white mb-4">
            Follow Us Online
          </h2>
          <p className="text-navy/60 dark:text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            Stay connected with our latest updates and projects
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal-stagger">
          {/* YouTube */}
          <div className="glass-card overflow-hidden">
            <div className="p-4 border-b border-navy/5 dark:border-white/5 flex items-center gap-3">
              <i className="fab fa-youtube text-red-500 text-xl"></i>
              <h3 className="font-display font-semibold text-navy dark:text-white">YouTube</h3>
            </div>
            <div className="p-4">
              <div className="aspect-video bg-navy/5 dark:bg-white/5 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <i className="fas fa-play-circle text-4xl text-red-500/40 mb-3"></i>
                  <p className="text-sm text-navy/40 dark:text-white/40">Coming Soon</p>
                  <p className="text-xs text-navy/30 dark:text-white/30 mt-1">Subscribe to our channel</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instagram */}
          <div className="glass-card overflow-hidden">
            <div className="p-4 border-b border-navy/5 dark:border-white/5 flex items-center gap-3">
              <i className="fab fa-instagram text-pink-500 text-xl"></i>
              <h3 className="font-display font-semibold text-navy dark:text-white">Instagram</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2">
                {mockInstagramPosts.map((post, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden cursor-pointer">
                    <img
                      src={post.image}
                      alt={`Instagram post ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        <i className="fas fa-heart mr-1"></i>{post.likes}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Twitter/X */}
          <div className="glass-card overflow-hidden">
            <div className="p-4 border-b border-navy/5 dark:border-white/5 flex items-center gap-3">
              <i className="fab fa-x-twitter text-navy dark:text-white text-xl"></i>
              <h3 className="font-display font-semibold text-navy dark:text-white">X / Twitter</h3>
            </div>
            <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
              {mockTweets.map((tweet, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-navy/3 dark:bg-white/3 border border-navy/5 dark:border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center">
                      <span className="text-white text-xs font-bold">C</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy dark:text-white leading-none">{tweet.author}</p>
                      <p className="text-xs text-navy/40 dark:text-white/40">{tweet.handle} · {tweet.time}</p>
                    </div>
                  </div>
                  <p className="text-sm text-navy/70 dark:text-white/70 mb-3 leading-relaxed">{tweet.content}</p>
                  <div className="flex items-center gap-4 text-xs text-navy/40 dark:text-white/40">
                    <span><i className="far fa-heart mr-1"></i>{tweet.likes}</span>
                    <span><i className="fas fa-retweet mr-1"></i>{tweet.retweets}</span>
                    <span><i className="far fa-comment mr-1"></i></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

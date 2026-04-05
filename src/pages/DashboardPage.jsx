import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dashboardStats, recentActivity, monthlyData, pendingApprovals, upcomingAppointments } from '../data/mockDashboard';
import { mockBlogs } from '../data/mockBlogs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';

/* ─── Stat Card ─── */
function StatCard({ icon, label, value, color }) {
  return (
    <div className="glass-card p-6 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
        <i className={`${icon} text-xl`} style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-bold text-navy dark:text-white">{value}</p>
        <p className="text-xs text-navy/50 dark:text-white/50">{label}</p>
      </div>
    </div>
  );
}

/* ═══════════════════ ADMIN DASHBOARD ═══════════════════ */
function AdminDashboard() {
  return (
    <>
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 reveal-stagger">
        <StatCard icon="fas fa-users" label="Total Users" value={dashboardStats.totalUsers.toLocaleString()} color="#3b82f6" />
        <StatCard icon="fas fa-blog" label="Total Blogs" value={dashboardStats.totalBlogs} color="#10b981" />
        <StatCard icon="fas fa-calendar-check" label="Appointments" value={dashboardStats.totalAppointments} color="#f59e0b" />
        <StatCard icon="fas fa-palette" label="Templates" value={dashboardStats.totalTemplates} color="#8b5cf6" />
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 glass-card p-6 reveal">
          <h3 className="font-display text-lg font-semibold text-navy dark:text-white mb-4">Monthly Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorBlogs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,100,100,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 12, color: '#fff', fontSize: 13 }} />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="url(#colorUsers)" strokeWidth={2} />
                <Area type="monotone" dataKey="blogs" stroke="#10b981" fill="url(#colorBlogs)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6 reveal">
          <h3 className="font-display text-lg font-semibold text-navy dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/dashboard/editor" className="flex items-center gap-3 p-3 rounded-xl bg-navy/5 dark:bg-white/5 hover:bg-teal/10 transition-colors no-underline text-navy dark:text-white">
              <i className="fas fa-plus-circle text-teal" /> <span className="text-sm font-medium">New Blog Post</span>
            </Link>
            <Link to="/dashboard/templates" className="flex items-center gap-3 p-3 rounded-xl bg-navy/5 dark:bg-white/5 hover:bg-teal/10 transition-colors no-underline text-navy dark:text-white">
              <i className="fas fa-palette text-purple-500" /> <span className="text-sm font-medium">Manage Templates</span>
            </Link>
            <Link to="/appointment" className="flex items-center gap-3 p-3 rounded-xl bg-navy/5 dark:bg-white/5 hover:bg-teal/10 transition-colors no-underline text-navy dark:text-white">
              <i className="fas fa-calendar-alt text-amber-500" /> <span className="text-sm font-medium">View Appointments</span>
            </Link>
            <Link to="/blog" className="flex items-center gap-3 p-3 rounded-xl bg-navy/5 dark:bg-white/5 hover:bg-teal/10 transition-colors no-underline text-navy dark:text-white">
              <i className="fas fa-eye text-blue-500" /> <span className="text-sm font-medium">View Blog</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6 reveal">
        <h3 className="font-display text-lg font-semibold text-navy dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map(item => (
            <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-navy/3 dark:bg-white/3 border border-navy/5 dark:border-white/5">
              <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className={`${item.icon} text-teal text-xs`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-navy/80 dark:text-white/80">{item.message}</p>
                <p className="text-xs text-navy/40 dark:text-white/40 mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════ MANAGER DASHBOARD ═══════════════════ */
function ManagerDashboard() {
  const [approvals, setApprovals] = useState(pendingApprovals);

  const handleApprove = (id) => {
    setApprovals(prev => prev.filter(a => a.id !== id));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 reveal-stagger">
        <StatCard icon="fas fa-clock" label="Pending Approvals" value={approvals.length} color="#f59e0b" />
        <StatCard icon="fas fa-calendar-check" label="Upcoming Appointments" value={upcomingAppointments.length} color="#3b82f6" />
        <StatCard icon="fas fa-chart-line" label="Published Blogs" value={mockBlogs.filter(b => b.status === 'Published').length} color="#10b981" />
      </div>

      {/* Pending Blog Approvals */}
      <div className="glass-card p-6 mb-8 reveal">
        <h3 className="font-display text-lg font-semibold text-navy dark:text-white mb-4">
          <i className="fas fa-clock text-amber-500 mr-2" />Pending Blog Approvals
        </h3>
        {approvals.length === 0 ? (
          <p className="text-sm text-navy/50 dark:text-white/50 py-4 text-center">No pending approvals 🎉</p>
        ) : (
          <div className="space-y-3">
            {approvals.map(item => (
              <div key={item.id} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-navy/3 dark:bg-white/3 border border-navy/5 dark:border-white/5">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-navy dark:text-white truncate">{item.title}</p>
                  <p className="text-xs text-navy/40 dark:text-white/40 mt-1">By {item.author} · {item.date} · {item.category}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleApprove(item.id)} className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-xs font-medium hover:bg-emerald-600 transition-colors">
                    Approve
                  </button>
                  <button onClick={() => handleApprove(item.id)} className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 text-xs font-medium hover:bg-red-500/20 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Appointments */}
      <div className="glass-card p-6 reveal">
        <h3 className="font-display text-lg font-semibold text-navy dark:text-white mb-4">
          <i className="fas fa-calendar-alt text-blue-500 mr-2" />Upcoming Appointments
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-navy/50 dark:text-white/50 border-b border-navy/5 dark:border-white/5">
                <th className="pb-3 font-medium">Client</th>
                <th className="pb-3 font-medium">Service</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map(apt => (
                <tr key={apt.id} className="border-b border-navy/3 dark:border-white/3">
                  <td className="py-3 text-navy dark:text-white font-medium">{apt.name}</td>
                  <td className="py-3 text-navy/70 dark:text-white/70">{apt.service}</td>
                  <td className="py-3 text-navy/70 dark:text-white/70">{apt.date}</td>
                  <td className="py-3 text-navy/70 dark:text-white/70">{apt.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════ INTERN DASHBOARD ═══════════════════ */
function InternDashboard() {
  const internBlogs = mockBlogs.filter(b => b.author.role === 'Intern');

  const statusColor = {
    Published: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    Pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    Draft: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 reveal-stagger">
        <StatCard icon="fas fa-file-alt" label="My Blogs" value={internBlogs.length} color="#3b82f6" />
        <StatCard icon="fas fa-check-circle" label="Published" value={internBlogs.filter(b => b.status === 'Published').length} color="#10b981" />
        <StatCard icon="fas fa-clock" label="Pending" value={internBlogs.filter(b => b.status === 'Pending').length} color="#f59e0b" />
      </div>

      <div className="flex items-center justify-between mb-6 reveal">
        <h3 className="font-display text-lg font-semibold text-navy dark:text-white">My Blog Posts</h3>
        <Link to="/dashboard/editor" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy dark:bg-teal text-white text-sm font-medium hover:shadow-glow transition-all no-underline">
          <i className="fas fa-plus" /> New Blog
        </Link>
      </div>

      <div className="space-y-4 reveal">
        {internBlogs.map(blog => (
          <div key={blog.id} className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <img src={blog.thumbnail} alt="" className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-navy dark:text-white truncate">{blog.title}</p>
                <p className="text-xs text-navy/40 dark:text-white/40 mt-1">{blog.date} · {blog.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[blog.status]}`}>
                {blog.status}
              </span>
              <Link to={`/dashboard/editor?edit=${blog.id}`} className="text-navy/40 dark:text-white/40 hover:text-teal transition-colors">
                <i className="fas fa-edit" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════ USER DASHBOARD ═══════════════════ */
function UserDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 reveal-stagger">
        <StatCard icon="fas fa-calendar-check" label="My Appointments" value={2} color="#3b82f6" />
        <StatCard icon="fas fa-star" label="Blog Ratings Given" value={5} color="#f59e0b" />
      </div>

      <div className="glass-card p-6 mb-8 reveal">
        <h3 className="font-display text-lg font-semibold text-navy dark:text-white mb-4">Quick Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/appointment" className="flex items-center gap-3 p-4 rounded-xl bg-navy/5 dark:bg-white/5 hover:bg-teal/10 transition-colors no-underline text-navy dark:text-white">
            <i className="fas fa-calendar-plus text-teal text-lg" />
            <div>
              <p className="text-sm font-semibold">Book Appointment</p>
              <p className="text-xs text-navy/40 dark:text-white/40">Schedule a consultation</p>
            </div>
          </Link>
          <Link to="/blog" className="flex items-center gap-3 p-4 rounded-xl bg-navy/5 dark:bg-white/5 hover:bg-teal/10 transition-colors no-underline text-navy dark:text-white">
            <i className="fas fa-book-open text-blue-500 text-lg" />
            <div>
              <p className="text-sm font-semibold">Read Blog</p>
              <p className="text-xs text-navy/40 dark:text-white/40">Latest articles & tips</p>
            </div>
          </Link>
          <Link to="/templates" className="flex items-center gap-3 p-4 rounded-xl bg-navy/5 dark:bg-white/5 hover:bg-teal/10 transition-colors no-underline text-navy dark:text-white">
            <i className="fas fa-th-large text-purple-500 text-lg" />
            <div>
              <p className="text-sm font-semibold">Browse Templates</p>
              <p className="text-xs text-navy/40 dark:text-white/40">Explore designs</p>
            </div>
          </Link>
          <Link to="/contact" className="flex items-center gap-3 p-4 rounded-xl bg-navy/5 dark:bg-white/5 hover:bg-teal/10 transition-colors no-underline text-navy dark:text-white">
            <i className="fas fa-headset text-emerald-500 text-lg" />
            <div>
              <p className="text-sm font-semibold">Contact Support</p>
              <p className="text-xs text-navy/40 dark:text-white/40">Get help</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════ MAIN DASHBOARD PAGE ═══════════════════ */
export default function DashboardPage() {
  const { user } = useAuth();

  const dashboardView = {
    Admin: <AdminDashboard />,
    Manager: <ManagerDashboard />,
    Intern: <InternDashboard />,
    User: <UserDashboard />,
  };

  return (
    <section className="relative min-h-screen bg-cloud dark:bg-dark-900 pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 reveal">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy dark:text-white mb-2">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-navy/50 dark:text-white/50 text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-medium">
              <i className="fas fa-shield-alt" /> {user?.role}
            </span>
          </p>
        </div>

        {dashboardView[user?.role] || <UserDashboard />}
      </div>
    </section>
  );
}

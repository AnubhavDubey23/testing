import React, { useState } from 'react';
import Calendar from 'react-calendar';

const services = [
  'Portfolio Website',
  'Business Website',
  'Website Maintenance',
  'Mobile App Development',
  'Custom Mobile App',
  'Version Upgrade',
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM',
];

// Mock booked slots
const bookedSlots = {
  '2026-04-05': ['10:00 AM', '02:00 PM'],
  '2026-04-06': ['09:00 AM', '11:00 AM', '03:00 PM'],
  '2026-04-07': ['11:30 AM'],
};

export default function AppointmentPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '' });
  const [submitted, setSubmitted] = useState(false);

  const dateKey = selectedDate.toISOString().split('T')[0];
  const bookedForDate = bookedSlots[dateKey] || [];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      date: dateKey,
      time: selectedTime,
    };
    console.log('Appointment booked:', bookingData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-cloud dark:bg-dark-900 pt-28 pb-20 px-4">
        <div className="text-center glass-card p-12 max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-calendar-check text-4xl text-emerald-500" />
          </div>
          <h2 className="font-display text-2xl font-bold text-navy dark:text-white mb-3">Appointment Confirmed!</h2>
          <p className="text-navy/60 dark:text-white/60 text-sm mb-6">
            Your appointment has been booked successfully.
          </p>
          <div className="inline-flex flex-col gap-2 text-sm text-left bg-navy/5 dark:bg-white/5 rounded-xl p-5">
            <p className="text-navy dark:text-white"><strong>Name:</strong> {formData.name}</p>
            <p className="text-navy dark:text-white"><strong>Service:</strong> {formData.service}</p>
            <p className="text-navy dark:text-white"><strong>Date:</strong> {selectedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="text-navy dark:text-white"><strong>Time:</strong> {selectedTime}</p>
          </div>
          <button
            onClick={() => { setSubmitted(false); setSelectedTime(''); setFormData({ name: '', email: '', phone: '', service: '' }); }}
            className="mt-6 px-6 py-3 rounded-xl bg-navy dark:bg-teal text-white text-sm font-medium hover:shadow-glow transition-all"
          >
            Book Another Appointment
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-cloud dark:bg-dark-900 pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <h1 className="font-display text-display-2 text-navy dark:text-white mb-4">Book an Appointment</h1>
          <p className="text-navy/60 dark:text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            Schedule a consultation with our team. Pick a date, choose a time slot, and fill in your details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Calendar + Time Slots */}
          <div className="space-y-6">
            {/* Calendar */}
            <div className="glass-card p-6 reveal">
              <h3 className="font-display text-lg font-semibold text-navy dark:text-white mb-4">
                <i className="fas fa-calendar-alt text-teal mr-2" />Select Date
              </h3>
              <style>{`
                .react-calendar {
                  width: 100% !important;
                  border: none !important;
                  background: transparent !important;
                  font-family: 'Inter', sans-serif !important;
                }
                .react-calendar__tile {
                  border-radius: 10px !important;
                  padding: 10px !important;
                  font-size: 13px !important;
                  color: inherit !important;
                }
                .react-calendar__tile:hover {
                  background: rgba(47, 142, 146, 0.1) !important;
                }
                .react-calendar__tile--active {
                  background: #2f8e92 !important;
                  color: white !important;
                }
                .react-calendar__tile--now {
                  background: rgba(47, 142, 146, 0.08) !important;
                }
                .react-calendar__navigation button {
                  font-size: 14px !important;
                  font-weight: 600 !important;
                  border-radius: 10px !important;
                  color: inherit !important;
                }
                .react-calendar__navigation button:hover {
                  background: rgba(47, 142, 146, 0.1) !important;
                }
                .react-calendar__month-view__weekdays {
                  font-size: 11px !important;
                  font-weight: 600 !important;
                  text-transform: uppercase !important;
                }
                .react-calendar__month-view__weekdays abbr {
                  text-decoration: none !important;
                }
              `}</style>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                minDate={new Date()}
                className="text-navy dark:text-white"
              />
            </div>

            {/* Time Slots */}
            <div className="glass-card p-6 reveal">
              <h3 className="font-display text-lg font-semibold text-navy dark:text-white mb-4">
                <i className="fas fa-clock text-amber-500 mr-2" />Available Time Slots
              </h3>
              <p className="text-xs text-navy/40 dark:text-white/40 mb-4">
                {selectedDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(slot => {
                  const isBooked = bookedForDate.includes(slot);
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => !isBooked && setSelectedTime(slot)}
                      disabled={isBooked}
                      className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all ${
                        isBooked
                          ? 'bg-red-500/10 text-red-400 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-teal text-white shadow-glow'
                          : 'bg-navy/5 dark:bg-white/5 text-navy dark:text-white hover:bg-teal/10 hover:text-teal'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              {bookedForDate.length > 0 && (
                <p className="text-xs text-red-400/60 mt-3"><i className="fas fa-info-circle mr-1" />Strikethrough slots are already booked</p>
              )}
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="glass-card p-8 reveal h-fit lg:sticky lg:top-28">
            <h3 className="font-display text-lg font-semibold text-navy dark:text-white mb-6">
              <i className="fas fa-user-edit text-blue-500 mr-2" />Your Details
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-navy/80 dark:text-white/80 mb-1.5">Full Name</label>
                <input
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 transition-all placeholder:text-navy/30 dark:placeholder:text-white/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy/80 dark:text-white/80 mb-1.5">Email</label>
                <input
                  type="email" name="email" required value={formData.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 transition-all placeholder:text-navy/30 dark:placeholder:text-white/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy/80 dark:text-white/80 mb-1.5">Phone</label>
                <input
                  type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                  placeholder="+91 XXXXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 transition-all placeholder:text-navy/30 dark:placeholder:text-white/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy/80 dark:text-white/80 mb-1.5">Service Type</label>
                <select
                  name="service" required value={formData.service} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 transition-all"
                >
                  <option value="">Select service...</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Selected Summary */}
              {selectedTime && (
                <div className="p-4 rounded-xl bg-teal/5 border border-teal/10">
                  <p className="text-xs text-teal font-semibold mb-1">Selected Slot</p>
                  <p className="text-sm text-navy dark:text-white">
                    {selectedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at {selectedTime}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={!selectedTime}
                className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  selectedTime
                    ? 'bg-navy dark:bg-teal text-white hover:shadow-glow'
                    : 'bg-navy/20 text-navy/40 cursor-not-allowed'
                }`}
              >
                <i className="fas fa-check-circle" />
                {selectedTime ? 'Confirm Appointment' : 'Select a time slot first'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

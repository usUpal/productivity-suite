'use client'

import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const presets = [
  { label: '2 min', value: 2 },
  { label: '5 min', value: 5 },
  { label: '15 min', value: 15 },
  { label: 'Custom', value: null },
]

const recentSessions = [
  { id: 1, title: 'Morning Clarity', icon: 'sunny', iconBg: 'bg-primary/20', iconColor: 'text-primary', time: 'Today, 8:00 AM', duration: '10m' },
  { id: 2, title: 'Evening Wind Down', icon: 'bedtime', iconBg: 'bg-indigo-500/20', iconColor: 'text-indigo-400', time: 'Yesterday, 9:30 PM', duration: '15m' },
  { id: 3, title: 'Focus Reset', icon: 'psychology', iconBg: 'bg-teal-500/20', iconColor: 'text-teal-400', time: 'Yesterday, 2:15 PM', duration: '5m' },
  { id: 4, title: 'Morning Clarity', icon: 'sunny', iconBg: 'bg-primary/20', iconColor: 'text-primary', time: 'Oct 24, 7:45 AM', duration: '20m' },
]

export default function MeditationPage() {
  const [selectedPreset, setSelectedPreset] = useState(15)
  const [minutes, setMinutes] = useState(15)
  const [seconds, setSeconds] = useState(0)

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full relative overflow-y-auto">
        {/* Page Header */}
        <header className="flex flex-wrap justify-between items-end gap-4 p-8 pb-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-black leading-tight tracking-[-0.033em] dark:text-white text-slate-900">
              Meditation
            </h2>
            <p className="text-text-secondary text-base font-normal">Find your focus and breathe.</p>
          </div>
          {/* Contextual Action: Ambience */}
          <div className="flex items-center gap-2 bg-white dark:bg-[#233f48] p-2 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="material-symbols-outlined text-text-secondary pl-2">water_drop</span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Rain Sounds</span>
            <button className="size-8 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-white/10 transition">
              <span className="material-symbols-outlined text-primary text-[20px]">volume_up</span>
            </button>
          </div>
        </header>

        <div className="p-8 pt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 h-full content-start">
          {/* Left Column: Timer & Controls */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Main Timer Card */}
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#233f48] border border-slate-200 dark:border-transparent flex flex-col items-center justify-center p-10 lg:p-16 gap-10 shadow-sm" style={{ boxShadow: '0 0 60px -20px rgba(17, 164, 212, 0.15)' }}>
              {/* Subtle Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>

              {/* Timer Display */}
              <div className="flex gap-4 sm:gap-6 z-10">
                {/* Minutes */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-24 sm:h-32 w-24 sm:w-32 items-center justify-center rounded-2xl bg-slate-100 dark:bg-surface-dark border-2 border-slate-200 dark:border-slate-700">
                    <p className="text-6xl sm:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white">
                      {String(minutes).padStart(2, '0')}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-text-secondary uppercase tracking-widest">Minutes</span>
                </div>
                {/* Separator */}
                <div className="flex h-24 sm:h-32 items-center pb-4">
                  <span className="text-4xl sm:text-6xl font-thin text-slate-300 dark:text-slate-600">:</span>
                </div>
                {/* Seconds */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-24 sm:h-32 w-24 sm:w-32 items-center justify-center rounded-2xl bg-slate-100 dark:bg-surface-dark border-2 border-slate-200 dark:border-slate-700">
                    <p className="text-6xl sm:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white">
                      {String(seconds).padStart(2, '0')}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-text-secondary uppercase tracking-widest">Seconds</span>
                </div>
              </div>

              {/* Controls Section */}
              <div className="flex flex-col items-center gap-8 w-full z-10">
                {/* Presets */}
                <div className="flex flex-wrap justify-center gap-3">
                  {presets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        if (preset.value) {
                          setSelectedPreset(preset.value)
                          setMinutes(preset.value)
                          setSeconds(0)
                        }
                      }}
                      className={`flex h-9 items-center justify-center px-4 rounded-full transition-colors border ${
                        selectedPreset === preset.value
                          ? 'bg-primary/20 border-primary/50'
                          : 'bg-slate-100 dark:bg-surface-dark hover:bg-slate-200 dark:hover:bg-slate-700 border-transparent hover:border-primary/30'
                      }`}
                    >
                      <span className={`text-sm font-bold ${selectedPreset === preset.value ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`}>
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Main Action */}
                <div className="flex gap-4">
                  <button className="flex items-center justify-center gap-2 h-14 pl-6 pr-8 bg-primary hover:bg-sky-500 text-white rounded-xl transition-all shadow-lg shadow-primary/25 active:scale-95">
                    <span className="material-symbols-outlined text-[28px]">play_arrow</span>
                    <span className="text-lg font-bold tracking-wide">Start Session</span>
                  </button>
                  <button 
                    onClick={() => {
                      setMinutes(selectedPreset || 15)
                      setSeconds(0)
                    }}
                    className="flex items-center justify-center size-14 rounded-xl bg-slate-200 dark:bg-surface-dark text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined">restart_alt</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quote / Inspiration */}
            <div className="bg-primary/10 rounded-xl p-6 border border-primary/10 flex gap-4 items-start">
              <span className="material-symbols-outlined text-primary mt-1">format_quote</span>
              <div>
                <p className="text-slate-700 dark:text-slate-200 font-medium italic text-lg leading-relaxed">
                  &quot;Quiet the mind, and the soul will speak.&quot;
                </p>
                <p className="text-text-secondary text-sm mt-2">— Ma Jaya Sati Bhagavati</p>
              </div>
            </div>
          </div>

          {/* Right Column: Stats & History */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {/* Total Time */}
              <div className="bg-white dark:bg-[#233f48] p-5 rounded-xl border border-slate-200 dark:border-transparent flex items-center justify-between group hover:border-primary/30 transition-colors">
                <div className="flex flex-col gap-1">
                  <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">Total Mindful Time</p>
                  <p className="text-2xl font-bold dark:text-white text-slate-900">
                    12<span className="text-base font-medium text-text-secondary">h</span> 30<span className="text-base font-medium text-text-secondary">m</span>
                  </p>
                </div>
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">hourglass_bottom</span>
                </div>
              </div>

              {/* Streak */}
              <div className="bg-white dark:bg-[#233f48] p-5 rounded-xl border border-slate-200 dark:border-transparent flex items-center justify-between group hover:border-primary/30 transition-colors">
                <div className="flex flex-col gap-1">
                  <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">Current Streak</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold dark:text-white text-slate-900">4</p>
                    <p className="text-sm text-text-secondary">days</p>
                  </div>
                </div>
                <div className="size-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-orange-500">local_fire_department</span>
                </div>
              </div>

              {/* Average */}
              <div className="bg-white dark:bg-[#233f48] p-5 rounded-xl border border-slate-200 dark:border-transparent flex items-center justify-between group hover:border-primary/30 transition-colors">
                <div className="flex flex-col gap-1">
                  <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">Avg Session</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold dark:text-white text-slate-900">18</p>
                    <p className="text-sm text-text-secondary">min</p>
                  </div>
                </div>
                <div className="size-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-green-500">bar_chart</span>
                </div>
              </div>
            </div>

            {/* Recent History */}
            <div className="flex flex-col grow bg-white dark:bg-[#233f48] rounded-xl border border-slate-200 dark:border-transparent overflow-hidden">
              <div className="p-5 pb-2 flex justify-between items-center border-b border-slate-100 dark:border-slate-700/50">
                <h3 className="font-bold text-lg dark:text-white text-slate-900">Recent Sessions</h3>
                <a className="text-xs font-bold text-primary hover:text-sky-400 uppercase tracking-wide" href="#">
                  View All
                </a>
              </div>
              <div className="flex flex-col overflow-y-auto max-h-[300px] lg:max-h-full">
                {recentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-b border-slate-100 dark:border-slate-700/50 last:border-0"
                  >
                    <div className={`${session.iconBg} rounded-lg p-2 ${session.iconColor}`}>
                      <span className="material-symbols-outlined text-[20px]">{session.icon}</span>
                    </div>
                    <div className="flex flex-col grow min-w-0">
                      <p className="text-sm font-bold dark:text-white text-slate-900 truncate">{session.title}</p>
                      <p className="text-xs text-text-secondary">{session.time}</p>
                    </div>
                    <div className="text-sm font-medium dark:text-slate-300 text-slate-600">{session.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

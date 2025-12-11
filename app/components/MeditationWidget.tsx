export default function MeditationWidget() {
  return (
    <div className="bg-card-dark border border-[#233f48] rounded-2xl p-6 shadow-xl relative overflow-hidden group">
      {/* Background Decoration */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <span className="material-symbols-outlined">self_improvement</span>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold tracking-wide">MEDITATION</h3>
            <p className="text-[#587a8a] text-xs font-medium">Daily Mindfulness</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 text-[#0bda57]">
            <span className="material-symbols-outlined text-base">trending_up</span>
            <span className="text-sm font-bold">+1 Day</span>
          </div>
          <span className="text-white text-xs opacity-50">vs yesterday</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 items-center">
        {/* Circular Progress */}
        <div className="relative size-32 flex-shrink-0">
          <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            {/* Background Circle */}
            <path
              className="text-[#233f48]"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            {/* Progress Circle (65%) */}
            <path
              className="text-primary drop-shadow-[0_0_10px_rgba(17,164,212,0.5)]"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeDasharray="65, 100"
              strokeLinecap="round"
              strokeWidth="3"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <span className="text-2xl font-bold">20</span>
            <span className="text-[10px] text-[#92bbc9] uppercase">Mins</span>
          </div>
        </div>

        {/* Streak Stats */}
        <div className="flex flex-col gap-4 w-full">
          <div>
            <p className="text-[#92bbc9] text-sm font-medium mb-1">Current Streak</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">12</span>
              <span className="text-base text-white/60">Days</span>
            </div>
          </div>
          <div className="w-full bg-[#233f48] h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-400 h-full w-[85%] rounded-full shadow-[0_0_10px_rgba(129,140,248,0.5)]"></div>
          </div>
          <p className="text-xs text-[#587a8a]">You&apos;re on fire! 3 more days to hit your record.</p>
        </div>
      </div>
    </div>
  )
}

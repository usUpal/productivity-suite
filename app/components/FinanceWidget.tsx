export default function FinanceWidget() {
  return (
    <div className="bg-card-dark border border-[#233f48] rounded-2xl p-6 shadow-xl flex-1 flex flex-col justify-between group relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all"></div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold tracking-wide">FINANCE</h3>
            <p className="text-[#587a8a] text-xs font-medium">Monthly Rollover</p>
          </div>
        </div>
        <button className="text-[#587a8a] hover:text-white transition-colors">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
        <div className="p-3 rounded-lg bg-[#233f48]/30 border border-[#233f48]">
          <p className="text-[#92bbc9] text-xs font-bold uppercase mb-1">Spent</p>
          <p className="text-white text-xl font-bold">$1,200</p>
        </div>
        <div className="p-3 rounded-lg bg-[#233f48]/30 border border-[#233f48]">
          <p className="text-[#92bbc9] text-xs font-bold uppercase mb-1">Remaining</p>
          <p className="text-primary text-xl font-bold">$800</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 relative z-10">
        <div className="flex justify-between text-xs font-medium text-[#92bbc9]">
          <span>Total Budget: $2,000</span>
          <span>60%</span>
        </div>
        {/* Multi-segment progress bar */}
        <div className="flex h-3 w-full rounded-full bg-[#233f48] overflow-hidden">
          <div className="w-[40%] bg-emerald-500 hover:bg-emerald-400 transition-colors" title="Essentials"></div>
          <div className="w-[20%] bg-primary hover:bg-[#3bc2ee] transition-colors" title="Discretionary"></div>
          <div className="w-full bg-transparent"></div>
        </div>
        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-emerald-500"></div>
            <span className="text-[10px] text-[#587a8a] uppercase font-bold">Essentials</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-primary"></div>
            <span className="text-[10px] text-[#587a8a] uppercase font-bold">Wants</span>
          </div>
        </div>
      </div>
    </div>
  )
}

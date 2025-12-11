interface HeaderProps {
  date: string
  greeting: string
  name: string
  quote: string
  taskCount: number
}

export default function Header({ date, greeting, name, quote, taskCount }: HeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-[#92bbc9] text-sm font-bold uppercase tracking-widest">{date}</h2>
        <h1 className="text-white text-3xl lg:text-5xl font-extrabold leading-tight tracking-tight">
          {greeting}, {name}
        </h1>
        <p className="text-[#92bbc9] text-base lg:text-lg font-normal max-w-xl">
          &quot;{quote}&quot; — You have{' '}
          <span className="text-white font-bold border-b border-primary">{taskCount} tasks</span> remaining today.
        </p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#325a67] text-[#92bbc9] hover:text-white hover:border-primary hover:bg-[#233f48] transition-all text-sm font-bold">
        <span className="material-symbols-outlined text-lg">tune</span>
        Customize Layout
      </button>
    </header>
  )
}

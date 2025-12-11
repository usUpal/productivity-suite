interface Note {
  id: number
  icon: string
  iconColor: string
  title: string
  content: string
  time: string
}

const notes: Note[] = [
  {
    id: 1,
    icon: 'sticky_note_2',
    iconColor: 'text-amber-400',
    title: 'Meeting Minutes',
    content: 'Discussed Q4 roadmap with the design team. Action items: finalize the new dashboard layout...',
    time: '2h ago',
  },
  {
    id: 2,
    icon: 'list_alt',
    iconColor: 'text-rose-400',
    title: 'Grocery List',
    content: '- Almond milk\n- Spinach\n- Chicken breast\n- Sparkling water',
    time: 'Yesterday',
  },
  {
    id: 3,
    icon: 'lightbulb',
    iconColor: 'text-violet-400',
    title: 'App Idea',
    content: 'A habit tracker that uses AI to suggest optimal times for habits based on calendar events.',
    time: 'Oct 20',
  },
]

export default function NotesWidget() {
  return (
    <div className="lg:col-span-3 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[#92bbc9] text-sm font-bold uppercase tracking-widest">Recent Notes</h3>
        <button className="text-primary hover:text-white transition-colors">
          <span className="material-symbols-outlined text-lg">add</span>
        </button>
      </div>

      {notes.map((note) => (
        <div
          key={note.id}
          className="group bg-card-dark border border-[#233f48] rounded-xl p-4 hover:border-primary/50 transition-all cursor-pointer shadow-lg hover:shadow-primary/5"
        >
          <div className="flex justify-between items-start mb-2">
            <span className={`material-symbols-outlined ${note.iconColor} text-xl`}>{note.icon}</span>
            <span className="text-[#587a8a] text-[10px] font-medium">{note.time}</span>
          </div>
          <h4 className="text-white text-base font-bold mb-1 group-hover:text-primary transition-colors">
            {note.title}
          </h4>
          <p className="text-[#92bbc9] text-xs leading-relaxed line-clamp-3">{note.content}</p>
        </div>
      ))}

      <button className="mt-2 w-full py-3 rounded-xl border border-dashed border-[#325a67] text-[#587a8a] hover:text-white hover:border-primary hover:bg-[#233f48]/30 transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
        View All Notes <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </button>
    </div>
  )
}

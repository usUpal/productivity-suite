'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Note {
  id: number
  title: string
  preview: string
  time: string
  date: 'today' | 'yesterday'
  tags?: { label: string; color: string }[]
  content?: string
}

const notes: Note[] = [
  {
    id: 1,
    title: 'Project Alpha Brainstorm',
    preview: 'Key objectives for Q4 including the new...',
    time: '10:42 AM',
    date: 'today',
    tags: [
      { label: '#brainstorming', color: 'primary' },
      { label: '#work', color: 'orange' },
    ],
    content: `Key Objectives for Q4:

1. Launch the new mobile interface beta.
2. Optimize database queries for faster load times.
3. Conduct user interviews with the top 10% of active users.

Notes from the team meeting:
- Sarah suggested we look into a new color palette for the dark mode. Specifically, the contrast on the secondary buttons feels a bit too low.
- Mark is worried about the API rate limits. We need to check the documentation for the new endpoint.

Ideas for next week:
- [ ] Schedule a brainstorming session for the marketing campaign.
- [ ] Review the analytics dashboard.`,
  },
  {
    id: 2,
    title: 'Grocery List',
    preview: 'Almond milk, eggs, spinach, coffee beans...',
    time: '9:15 AM',
    date: 'today',
  },
  {
    id: 3,
    title: 'Meeting with Design Team',
    preview: 'Discussed the new color palette constraints...',
    time: '4:30 PM',
    date: 'yesterday',
  },
  {
    id: 4,
    title: 'Book Recommendations',
    preview: 'Atomic Habits, Deep Work, The Mom Test...',
    time: '11:00 AM',
    date: 'yesterday',
  },
]

const navItems = [
  { href: '/meditation', icon: 'self_improvement', label: 'Meditation' },
  { href: '/finance', icon: 'attach_money', label: 'Finance' },
  { href: '/todos', icon: 'check_circle', label: 'Todos' },
  { href: '/notes', icon: 'description', label: 'Notes' },
]

export default function NotesPage() {
  const pathname = usePathname()
  const [selectedNote, setSelectedNote] = useState<Note>(notes[0])
  const [noteTitle, setNoteTitle] = useState(notes[0].title)
  const [noteContent, setNoteContent] = useState(notes[0].content || '')
  const [searchQuery, setSearchQuery] = useState('')

  const todayNotes = notes.filter((n) => n.date === 'today')
  const yesterdayNotes = notes.filter((n) => n.date === 'yesterday')

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note)
    setNoteTitle(note.title)
    setNoteContent(note.content || '')
  }

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-80 flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111e22] h-full">
        {/* App Header */}
        <div className="p-5 pb-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
              <span className="material-symbols-outlined">edit_note</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-bold leading-tight text-slate-900 dark:text-white">Random Notes</h1>
              <p className="text-primary text-xs font-medium leading-normal">Productivity Suite</p>
            </div>
          </div>

          {/* Navigation Categories */}
          <nav className="flex flex-col gap-1 mb-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${!isActive && 'group-hover:text-primary'} transition-colors`}
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span className={`text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 dark:text-[#92bbc9] text-[20px]">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full p-2.5 pl-10 text-sm text-slate-900 border border-slate-200 rounded-lg bg-slate-50 focus:ring-1 focus:ring-primary focus:border-primary dark:bg-[#233f48] dark:border-transparent dark:placeholder-[#92bbc9] dark:text-white transition-all placeholder:text-slate-400"
              placeholder="Search notes..."
            />
          </div>
        </div>

        {/* Scrollable List Area */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-4">
          {/* Today Section */}
          <div>
            <h3 className="px-2 text-xs font-bold text-slate-400 dark:text-[#92bbc9] uppercase tracking-wider mb-2 mt-2">Today</h3>
            <div className="flex flex-col gap-1">
              {todayNotes.map((note) => (
                <button
                  key={note.id}
                  onClick={() => handleNoteSelect(note)}
                  className={`w-full text-left p-3 rounded-lg relative overflow-hidden group transition-colors ${
                    selectedNote.id === note.id
                      ? 'bg-white dark:bg-[#1a2c32] border border-primary/30 shadow-sm'
                      : 'hover:bg-slate-100 dark:hover:bg-[#1a2c32] border border-transparent'
                  }`}
                >
                  {selectedNote.id === note.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                  )}
                  <h4 className={`text-sm truncate mb-1 ${selectedNote.id === note.id ? 'font-bold text-slate-900 dark:text-white pl-2' : 'font-medium text-slate-700 dark:text-slate-200 group-hover:text-primary'}`}>
                    {note.title}
                  </h4>
                  <p className={`text-xs text-slate-500 dark:text-[#92bbc9] truncate ${selectedNote.id === note.id ? 'pl-2' : ''}`}>
                    {note.preview}
                  </p>
                  <span className={`text-[10px] mt-2 block font-medium ${selectedNote.id === note.id ? 'text-primary pl-2' : 'text-slate-400'}`}>
                    {note.time}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Yesterday Section */}
          <div>
            <h3 className="px-2 text-xs font-bold text-slate-400 dark:text-[#92bbc9] uppercase tracking-wider mb-2 mt-4">Yesterday</h3>
            <div className="flex flex-col gap-1">
              {yesterdayNotes.map((note) => (
                <button
                  key={note.id}
                  onClick={() => handleNoteSelect(note)}
                  className={`w-full text-left p-3 rounded-lg relative overflow-hidden group transition-colors ${
                    selectedNote.id === note.id
                      ? 'bg-white dark:bg-[#1a2c32] border border-primary/30 shadow-sm'
                      : 'hover:bg-slate-100 dark:hover:bg-[#1a2c32] border border-transparent'
                  }`}
                >
                  {selectedNote.id === note.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                  )}
                  <h4 className={`text-sm truncate mb-1 ${selectedNote.id === note.id ? 'font-bold text-slate-900 dark:text-white pl-2' : 'font-medium text-slate-700 dark:text-slate-200 group-hover:text-primary'}`}>
                    {note.title}
                  </h4>
                  <p className={`text-xs text-slate-500 dark:text-[#92bbc9] truncate ${selectedNote.id === note.id ? 'pl-2' : ''}`}>
                    {note.preview}
                  </p>
                  <span className={`text-[10px] mt-2 block font-medium ${selectedNote.id === note.id ? 'text-primary pl-2' : 'text-slate-400'}`}>
                    {note.time}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User Profile / Settings */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 ring-2 ring-transparent group-hover:ring-primary transition-all">
              <img
                alt="User Avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDteMW4-OlneJq-gYS9us7LD_jSaOdReyWlTLIrG_WX92FKOAxkI75_HqNgmkNiQtaoaDckvZsv2Vdek3hRFSBLPItRk-yFzb54FAsvN_jmJTgfQM11AFUl-BzHOdAY2XXTO71WjWGYk6sUheKs8BdqUhc_m0eYq2LTxTzorunAJbmSLAKHp79ZIbvnlGoxfyboLgIxb18VPoTM15CIX51pEF2HVSV5xdzsy3KeDoSBj_D0F2BBpb1VUBvbXj7OgvoH2FC0azORGZ4"
              />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-slate-700 dark:text-white">Alex Morgan</p>
              <p className="text-xs text-slate-500 dark:text-[#92bbc9]">Pro Plan</p>
            </div>
            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors text-[20px]">settings</span>
          </button>
        </div>
      </aside>

      {/* Main Editor Area */}
      <main className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark relative">
        {/* Editor Top Bar */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-slate-200 dark:border-slate-800/50 bg-white/50 dark:bg-background-dark/80 backdrop-blur-sm z-10 sticky top-0">
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-[#92bbc9]">
            <span className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              October 24, 2023
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
            <span className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[16px] animate-pulse">cloud_done</span>
              Saved
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10" title="Delete Note">
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" title="Note Info">
              <span className="material-symbols-outlined text-[20px]">info</span>
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <button className="bg-primary hover:bg-[#0e8cb5] text-white px-5 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all transform active:scale-95 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">save</span>
              Save Note
            </button>
          </div>
        </header>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto py-12 px-10 flex flex-col h-full">
            {/* Title Input */}
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full bg-transparent border-none text-4xl font-extrabold text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-700 focus:ring-0 p-0 mb-6 tracking-tight"
              placeholder="Untitled Note"
            />

            {/* Tags / Meta */}
            <div className="flex flex-wrap gap-2 mb-8 items-center">
              {selectedNote.tags?.map((tag, i) => (
                <div
                  key={i}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                    tag.color === 'primary'
                      ? 'bg-primary/10 text-primary border-primary/20'
                      : 'bg-orange-400/10 text-orange-400 border-orange-400/20'
                  }`}
                >
                  {tag.label}
                  <button className="ml-1 hover:opacity-70 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
              ))}
              <button className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-all">
                <span className="material-symbols-outlined text-[14px] mr-1">add</span>
                Add tag
              </button>
            </div>

            {/* Toolbar (Formatting) */}
            <div className="sticky top-0 z-10 -mx-2 px-2 pb-6 pt-2 bg-background-light dark:bg-background-dark/95 backdrop-blur-sm">
              <div className="flex items-center gap-1 p-1.5 rounded-xl bg-white dark:bg-[#1a2c32] w-fit border border-slate-200 dark:border-slate-800 shadow-sm">
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="Bold">
                  <span className="material-symbols-outlined text-[20px]">format_bold</span>
                </button>
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="Italic">
                  <span className="material-symbols-outlined text-[20px]">format_italic</span>
                </button>
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="Underline">
                  <span className="material-symbols-outlined text-[20px]">format_underlined</span>
                </button>
                <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="H1">
                  <span className="material-symbols-outlined text-[20px]">title</span>
                </button>
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="List">
                  <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
                </button>
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="Checkbox">
                  <span className="material-symbols-outlined text-[20px]">check_box</span>
                </button>
                <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="Link">
                  <span className="material-symbols-outlined text-[20px]">link</span>
                </button>
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="Image">
                  <span className="material-symbols-outlined text-[20px]">image</span>
                </button>
              </div>
            </div>

            {/* Text Area */}
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="w-full flex-1 bg-transparent border-none resize-none text-lg leading-relaxed text-slate-700 dark:text-[#d0e6ed] placeholder-slate-400 focus:ring-0 p-0 font-medium min-h-[400px]"
              placeholder="Start typing your thoughts here..."
              spellCheck="false"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

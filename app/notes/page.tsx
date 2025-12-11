'use client'

import { useState } from 'react'
import Sidebar from '../components/Sidebar'

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

export default function NotesPage() {
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
      {/* Standard Sidebar */}
      <Sidebar />

      {/* Notes List Panel */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111e22] h-full">
        {/* Panel Header */}
        <div className="p-4 pb-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center text-white shadow-md shrink-0">
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
              </div>
              <div className="flex flex-col">
                <h2 className="text-sm font-bold leading-tight text-slate-900 dark:text-white">Notes</h2>
                <p className="text-[#92bbc9] text-xs font-medium">All thoughts & ideas</p>
              </div>
            </div>
            <button className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white hover:bg-primary/90 transition-colors">
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-symbols-outlined text-[#92bbc9] text-[18px]">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full py-2 pl-10 pr-3 text-sm text-slate-900 rounded-lg bg-[#1a2c32] border-none focus:ring-1 focus:ring-primary dark:placeholder-[#92bbc9] dark:text-white transition-all"
              placeholder="Search notes..."
            />
          </div>
        </div>

        {/* Scrollable Notes List */}
        <div className="flex-1 overflow-y-auto px-3 pb-4">
          {/* Today Section */}
          <div>
            <h3 className="px-2 text-xs font-bold text-[#92bbc9] uppercase tracking-wider mb-2 mt-2">Today</h3>
            <div className="flex flex-col gap-1">
              {todayNotes.map((note) => (
                <button
                  key={note.id}
                  onClick={() => handleNoteSelect(note)}
                  className={`w-full text-left p-3 rounded-lg relative overflow-hidden group transition-colors ${
                    selectedNote.id === note.id
                      ? 'bg-[#1a2c32] border border-primary/30'
                      : 'hover:bg-[#1a2c32] border border-transparent'
                  }`}
                >
                  {selectedNote.id === note.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r"></div>
                  )}
                  <h4 className={`text-sm truncate mb-1 ${selectedNote.id === note.id ? 'font-bold text-white pl-2' : 'font-medium text-slate-200 group-hover:text-primary'}`}>
                    {note.title}
                  </h4>
                  <p className={`text-xs text-[#92bbc9] truncate ${selectedNote.id === note.id ? 'pl-2' : ''}`}>
                    {note.preview}
                  </p>
                  <span className={`text-[10px] mt-2 block font-medium ${selectedNote.id === note.id ? 'text-primary pl-2' : 'text-slate-500'}`}>
                    {note.time}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Yesterday Section */}
          <div>
            <h3 className="px-2 text-xs font-bold text-[#92bbc9] uppercase tracking-wider mb-2 mt-4">Yesterday</h3>
            <div className="flex flex-col gap-1">
              {yesterdayNotes.map((note) => (
                <button
                  key={note.id}
                  onClick={() => handleNoteSelect(note)}
                  className={`w-full text-left p-3 rounded-lg relative overflow-hidden group transition-colors ${
                    selectedNote.id === note.id
                      ? 'bg-[#1a2c32] border border-primary/30'
                      : 'hover:bg-[#1a2c32] border border-transparent'
                  }`}
                >
                  {selectedNote.id === note.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r"></div>
                  )}
                  <h4 className={`text-sm truncate mb-1 ${selectedNote.id === note.id ? 'font-bold text-white pl-2' : 'font-medium text-slate-200 group-hover:text-primary'}`}>
                    {note.title}
                  </h4>
                  <p className={`text-xs text-[#92bbc9] truncate ${selectedNote.id === note.id ? 'pl-2' : ''}`}>
                    {note.preview}
                  </p>
                  <span className={`text-[10px] mt-2 block font-medium ${selectedNote.id === note.id ? 'text-primary pl-2' : 'text-slate-500'}`}>
                    {note.time}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-800 flex items-center justify-between">
          <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800">
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </button>
          <div className="flex items-center gap-2">
            <img
              alt="User"
              className="w-7 h-7 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDteMW4-OlneJq-gYS9us7LD_jSaOdReyWlTLIrG_WX92FKOAxkI75_HqNgmkNiQtaoaDckvZsv2Vdek3hRFSBLPItRk-yFzb54FAsvN_jmJTgfQM11AFUl-BzHOdAY2XXTO71WjWGYk6sUheKs8BdqUhc_m0eYq2LTxTzorunAJbmSLAKHp79ZIbvnlGoxfyboLgIxb18VPoTM15CIX51pEF2HVSV5xdzsy3KeDoSBj_D0F2BBpb1VUBvbXj7OgvoH2FC0azORGZ4"
            />
          </div>
        </div>

        {/* Sync Status */}
        <div className="px-4 py-2 text-center border-t border-slate-800">
          <span className="text-xs text-[#92bbc9]">Synced just now</span>
        </div>
      </aside>

      {/* Main Editor Area */}
      <main className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark relative">
        {/* Editor Top Bar */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800/50 bg-white/50 dark:bg-background-dark/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-[#92bbc9]">
            <span className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors">
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              October 24, 2023
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
            <span className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[14px] animate-pulse">cloud_done</span>
              Saved
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10" title="Delete Note">
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" title="Note Info">
              <span className="material-symbols-outlined text-[18px]">info</span>
            </button>
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <button className="bg-primary hover:bg-[#0e8cb5] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all transform active:scale-95 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">save</span>
              Save Note
            </button>
          </div>
        </header>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto py-10 px-8 flex flex-col h-full">
            {/* Title Input */}
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full bg-transparent border-none text-3xl font-extrabold text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-700 focus:ring-0 p-0 mb-5 tracking-tight"
              placeholder="Untitled Note"
            />

            {/* Tags / Meta */}
            <div className="flex flex-wrap gap-2 mb-6 items-center">
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
                  <button className="ml-1.5 hover:opacity-70 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[12px]">close</span>
                  </button>
                </div>
              ))}
              <button className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-all">
                <span className="material-symbols-outlined text-[12px] mr-1">add</span>
                Add tag
              </button>
            </div>

            {/* Toolbar (Formatting) */}
            <div className="mb-6">
              <div className="flex items-center gap-1 p-1 rounded-lg bg-white dark:bg-[#1a2c32] w-fit border border-slate-200 dark:border-slate-800">
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="Bold">
                  <span className="material-symbols-outlined text-[18px]">format_bold</span>
                </button>
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="Italic">
                  <span className="material-symbols-outlined text-[18px]">format_italic</span>
                </button>
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="Underline">
                  <span className="material-symbols-outlined text-[18px]">format_underlined</span>
                </button>
                <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-0.5"></div>
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="H1">
                  <span className="material-symbols-outlined text-[18px]">title</span>
                </button>
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="List">
                  <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                </button>
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="Checkbox">
                  <span className="material-symbols-outlined text-[18px]">check_box</span>
                </button>
                <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-0.5"></div>
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="Link">
                  <span className="material-symbols-outlined text-[18px]">link</span>
                </button>
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="Image">
                  <span className="material-symbols-outlined text-[18px]">image</span>
                </button>
              </div>
            </div>

            {/* Text Area */}
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="w-full flex-1 bg-transparent border-none resize-none text-base leading-relaxed text-slate-700 dark:text-[#d0e6ed] placeholder-slate-400 focus:ring-0 p-0 font-medium min-h-[350px]"
              placeholder="Start typing your thoughts here..."
              spellCheck="false"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

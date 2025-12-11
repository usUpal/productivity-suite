'use client'

import { useState } from 'react'
import Sidebar from '../components/Sidebar'

interface JournalEntry {
  id: number
  day: number
  weekday: string
  month: string
  year: number
  title: string
  preview: string
  time: string
  tags?: { label: string; color: string }[]
  content?: string
  location?: string
  weather?: string
}

const entries: JournalEntry[] = [
  {
    id: 1,
    day: 24,
    weekday: 'Tue',
    month: 'October',
    year: 2023,
    title: 'Deep Clarity',
    preview: 'Reflecting on the quarterly goals...',
    time: '10:42 AM',
    location: 'Home Office',
    weather: 'Sunny',
    tags: [
      { label: '#reflection', color: 'primary' },
      { label: '#planning', color: 'purple' },
    ],
    content: `Today feels different. There's a sense of calm that I haven't felt in weeks. 

I started the morning with 10 minutes of meditation, focusing purely on the breath. It helped clear the mental fog from yesterday's intense meetings.

Key realizations:
1. I need to prioritize output over input. Too much consumption of news and social media is clouding my judgment.
2. The project roadmap needs simplification. We are trying to do too much in Q4.

Action items for self:
- [ ] Sketch out the simplified roadmap.
- [ ] Cook a healthy dinner tonight. No takeout.

"Simplicity is the ultimate sophistication." - Leonardo da Vinci`,
  },
  {
    id: 2,
    day: 23,
    weekday: 'Mon',
    month: 'October',
    year: 2023,
    title: 'Anxiety peaks',
    preview: 'Felt overwhelmed by the roadmap...',
    time: '9:15 AM',
  },
  {
    id: 3,
    day: 20,
    weekday: 'Fri',
    month: 'October',
    year: 2023,
    title: 'Weekend Plans',
    preview: 'Hiking trip preparation and list...',
    time: '4:30 PM',
  },
  {
    id: 4,
    day: 30,
    weekday: 'Sat',
    month: 'September',
    year: 2023,
    title: 'Monthly Review',
    preview: 'September was productive overall...',
    time: '8:00 PM',
  },
  {
    id: 5,
    day: 15,
    weekday: 'Fri',
    month: 'September',
    year: 2023,
    title: 'Idea for App',
    preview: 'Sketching out the new UI flows...',
    time: '2:15 PM',
  },
]

export default function JournalPage() {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry>(entries[0])
  const [entryTitle, setEntryTitle] = useState(entries[0].title)
  const [entryContent, setEntryContent] = useState(entries[0].content || '')
  const [searchQuery, setSearchQuery] = useState('')

  const octoberEntries = entries.filter((e) => e.month === 'October')
  const septemberEntries = entries.filter((e) => e.month === 'September')

  const handleEntrySelect = (entry: JournalEntry) => {
    setSelectedEntry(entry)
    setEntryTitle(entry.title)
    setEntryContent(entry.content || '')
  }

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-hidden">
      {/* Standard Sidebar */}
      <Sidebar />

      {/* Journal List Panel */}
      <aside className="w-80 flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111e22] h-full">
        {/* Panel Header */}
        <div className="p-5 pb-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Journal</h2>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Timeline & Archive</p>
            </div>
            <button className="w-8 h-8 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center" title="New Entry">
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-symbols-outlined text-[#92bbc9] text-[20px]">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full p-2.5 pl-10 text-sm text-slate-900 border border-slate-200 rounded-lg bg-slate-50 focus:ring-1 focus:ring-primary focus:border-primary dark:bg-[#233f48] dark:border-transparent dark:placeholder-[#92bbc9] dark:text-white transition-all placeholder:text-slate-400"
              placeholder="Search memories..."
            />
          </div>
        </div>

        {/* Scrollable Entries List */}
        <div className="flex-1 overflow-y-auto pb-4">
          {/* October Section */}
          <div className="sticky top-0 bg-white/95 dark:bg-[#111e22]/95 backdrop-blur-sm px-5 py-2 z-10 border-b border-transparent dark:border-slate-800/50">
            <h3 className="text-xs font-bold text-slate-400 dark:text-[#92bbc9] uppercase tracking-wider">October 2023</h3>
          </div>
          <div className="px-3 flex flex-col gap-1 mt-1">
            {octoberEntries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => handleEntrySelect(entry)}
                className={`w-full text-left p-3 rounded-lg relative overflow-hidden group flex gap-3 items-start transition-colors ${
                  selectedEntry.id === entry.id
                    ? 'bg-primary/5 dark:bg-primary/10 border border-primary/20'
                    : 'hover:bg-slate-50 dark:hover:bg-[#1a2c32] border border-transparent'
                }`}
              >
                <div className="flex flex-col items-center min-w-[36px] pt-0.5">
                  <span className={`text-lg font-bold leading-none ${selectedEntry.id === entry.id ? 'text-primary' : 'text-slate-400 dark:text-slate-500 group-hover:text-primary'} transition-colors`}>
                    {entry.day}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 uppercase">{entry.weekday}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className={`text-sm truncate mb-0.5 ${selectedEntry.id === entry.id ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                    {entry.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-[#92bbc9] truncate">{entry.preview}</p>
                  <span className={`text-[10px] mt-1.5 block font-medium ${selectedEntry.id === entry.id ? 'text-primary' : 'text-slate-400'}`}>
                    {entry.time}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* September Section */}
          <div className="sticky top-0 bg-white/95 dark:bg-[#111e22]/95 backdrop-blur-sm px-5 py-2 z-10 border-b border-transparent dark:border-slate-800/50 mt-4">
            <h3 className="text-xs font-bold text-slate-400 dark:text-[#92bbc9] uppercase tracking-wider">September 2023</h3>
          </div>
          <div className="px-3 flex flex-col gap-1 mt-1">
            {septemberEntries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => handleEntrySelect(entry)}
                className={`w-full text-left p-3 rounded-lg relative overflow-hidden group flex gap-3 items-start transition-colors ${
                  selectedEntry.id === entry.id
                    ? 'bg-primary/5 dark:bg-primary/10 border border-primary/20'
                    : 'hover:bg-slate-50 dark:hover:bg-[#1a2c32] border border-transparent'
                }`}
              >
                <div className="flex flex-col items-center min-w-[36px] pt-0.5">
                  <span className={`text-lg font-bold leading-none ${selectedEntry.id === entry.id ? 'text-primary' : 'text-slate-400 dark:text-slate-500 group-hover:text-primary'} transition-colors`}>
                    {entry.day}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 uppercase">{entry.weekday}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className={`text-sm truncate mb-0.5 ${selectedEntry.id === entry.id ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                    {entry.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-[#92bbc9] truncate">{entry.preview}</p>
                  <span className={`text-[10px] mt-1.5 block font-medium ${selectedEntry.id === entry.id ? 'text-primary' : 'text-slate-400'}`}>
                    {entry.time}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[10px] text-slate-400 font-medium">{entries.length} entries total</p>
        </div>
      </aside>

      {/* Main Editor Area */}
      <main className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark relative">
        {/* Editor Top Bar */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-slate-200 dark:border-slate-800/50 bg-white/50 dark:bg-background-dark/80 backdrop-blur-sm z-10 sticky top-0">
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-[#92bbc9]">
            <span className="flex items-center gap-2 px-2 py-1 rounded-md text-slate-900 dark:text-white font-medium">
              <span className="material-symbols-outlined text-[20px] text-primary">calendar_month</span>
              Journaling
            </span>
            <span className="material-symbols-outlined text-[16px] text-slate-300 dark:text-slate-600">chevron_right</span>
            <span className="text-slate-600 dark:text-slate-400">{selectedEntry.month} {selectedEntry.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-slate-400 mr-4">
              <span className="material-symbols-outlined text-[14px]">cloud_done</span>
              Saved
            </span>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <button className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10" title="Delete Entry">
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
            <button className="p-2 text-slate-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10" title="Entry Details">
              <span className="material-symbols-outlined text-[20px]">info</span>
            </button>
          </div>
        </header>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto relative">
          <div className="max-w-3xl mx-auto py-12 px-10 flex flex-col h-full">
            {/* Date Header */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                {selectedEntry.weekday}, {selectedEntry.month.slice(0, 3)} {selectedEntry.day}
              </h1>
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">schedule</span> {selectedEntry.time}
                </span>
                {selectedEntry.location && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span> {selectedEntry.location}
                    </span>
                  </>
                )}
                {selectedEntry.weather && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    <span className="flex items-center gap-1 text-orange-400">
                      <span className="material-symbols-outlined text-[16px]">sunny</span> {selectedEntry.weather}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Title Input */}
            <input
              type="text"
              value={entryTitle}
              onChange={(e) => setEntryTitle(e.target.value)}
              className="w-full bg-transparent border-none text-2xl font-bold text-slate-700 dark:text-slate-200 placeholder-slate-300 dark:placeholder-slate-700 focus:ring-0 p-0 mb-6 tracking-tight"
              placeholder="Title your day (optional)..."
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8 items-center">
              {selectedEntry.tags?.map((tag, i) => (
                <div
                  key={i}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                    tag.color === 'primary'
                      ? 'bg-primary/10 text-primary border-primary/20'
                      : 'bg-purple-400/10 text-purple-400 border-purple-400/20'
                  }`}
                >
                  {tag.label}
                  <button className="ml-1 hover:opacity-70 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
              ))}
              <button className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-all">
                <span className="material-symbols-outlined text-[14px] mr-1">add</span>
                Add tag
              </button>
            </div>

            {/* Toolbar */}
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
                <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors" title="Quote">
                  <span className="material-symbols-outlined text-[20px]">format_quote</span>
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
              value={entryContent}
              onChange={(e) => setEntryContent(e.target.value)}
              className="w-full flex-1 bg-transparent border-none resize-none text-lg leading-relaxed text-slate-700 dark:text-[#d0e6ed] placeholder-slate-400 focus:ring-0 p-0 font-medium min-h-[350px]"
              placeholder="Start writing your day..."
              spellCheck="false"
              style={{ fontFamily: "'Merriweather', serif" }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

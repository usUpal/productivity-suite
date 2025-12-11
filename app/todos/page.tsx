'use client'

import { useState } from 'react'
import Sidebar from '../components/Sidebar'

interface Todo {
  id: number
  title: string
  priority?: string
  priorityColor?: string
  category?: string
  categoryIcon?: string
  time?: string
  completed: boolean
}

const initialTodos: Todo[] = [
  { id: 1, title: 'Review Q3 Financial Report', priority: 'High Priority', priorityColor: 'bg-orange-400', completed: false },
  { id: 2, title: '15-minute Meditation Session', category: 'Wellness', categoryIcon: 'spa', completed: false },
  { id: 3, title: 'Call with Design Team', time: '10:00 AM - 11:00 AM', completed: false },
]

const completedTodos: Todo[] = [
  { id: 4, title: 'Email Client Update', completed: true },
]

const calendarDays = [
  { day: 29, inactive: true }, { day: 30, inactive: true },
  { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 },
  { day: 6 }, { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 },
  { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 },
  { day: 20 }, { day: 21 }, { day: 22 }, { day: 23 }, { day: 24, today: true }, { day: 25 }, { day: 26 },
  { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 }, { day: 31 },
]

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [completed, setCompleted] = useState<Todo[]>(completedTodos)
  const [newTodo, setNewTodo] = useState('')
  const [focusMode, setFocusMode] = useState(false)

  const completedCount = completed.length
  const totalCount = todos.length + completed.length
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const handleAddTodo = () => {
    if (!newTodo.trim()) return
    const todo: Todo = {
      id: Date.now(),
      title: newTodo.trim(),
      completed: false,
    }
    setTodos([...todos, todo])
    setNewTodo('')
  }

  const handleToggleTodo = (id: number) => {
    const todo = todos.find((t) => t.id === id)
    if (todo) {
      setTodos(todos.filter((t) => t.id !== id))
      setCompleted([...completed, { ...todo, completed: true }])
    }
  }

  const handleDeleteCompleted = (id: number) => {
    setCompleted(completed.filter((t) => t.id !== id))
  }

  // Get current date info
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' }
  const formattedDate = now.toLocaleDateString('en-US', options)
  const hour = now.getHours()
  let greeting = 'Good Morning'
  if (hour >= 12 && hour < 17) greeting = 'Good Afternoon'
  else if (hour >= 17) greeting = 'Good Evening'

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full relative overflow-y-auto">
        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full flex flex-col gap-8">
          {/* Page Heading & Date */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">{formattedDate}</p>
              <h2 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                {greeting}, Alex
              </h2>
            </div>
            {/* Focus Mode Toggle */}
            <div className="flex items-center gap-4 bg-surface-dark border border-[#325a67] rounded-xl p-3 pr-5 shadow-sm">
              <div className="p-2 bg-background-dark rounded-lg text-primary">
                <span className="material-symbols-outlined">do_not_disturb_on</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-bold">Focus Mode</span>
                <span className="text-text-secondary text-xs">Silence notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-2">
                <input
                  type="checkbox"
                  checked={focusMode}
                  onChange={() => setFocusMode(!focusMode)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#325a67] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </header>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Center Column: Tasks */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Input Field */}
              <div className="w-full group">
                <div className="flex w-full items-center rounded-xl bg-surface-dark border border-[#325a67] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all shadow-sm">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
                    className="w-full bg-transparent border-none text-white placeholder:text-text-secondary h-16 px-6 text-lg focus:ring-0"
                    placeholder="What needs to be done today?"
                  />
                  <button
                    onClick={handleAddTodo}
                    className="mr-3 h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-opacity-90 transition-colors"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>

              {/* Task Sections */}
              <div className="flex flex-col gap-6">
                {/* Section: Today */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-white text-lg font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Today
                    </h3>
                    <span className="text-text-secondary text-sm">{todos.length} tasks</span>
                  </div>

                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="group flex items-center gap-4 p-4 rounded-xl bg-surface-dark border border-transparent hover:border-[#325a67] transition-all cursor-pointer"
                    >
                      <button
                        onClick={() => handleToggleTodo(todo.id)}
                        className="w-6 h-6 rounded-full border-2 border-text-secondary hover:border-primary flex items-center justify-center transition-colors group/check"
                      >
                        <div className="w-3 h-3 rounded-full bg-primary opacity-0 group-hover/check:opacity-50 transition-opacity"></div>
                      </button>
                      <div className="flex flex-col flex-1">
                        <span className="text-white text-base font-medium">{todo.title}</span>
                        {todo.priority && (
                          <span className="text-text-secondary text-xs flex items-center gap-1 mt-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${todo.priorityColor}`}></span>
                            {todo.priority}
                          </span>
                        )}
                        {todo.category && (
                          <span className="text-text-secondary text-xs flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-[12px]">{todo.categoryIcon}</span>
                            {todo.category}
                          </span>
                        )}
                        {todo.time && (
                          <span className="text-text-secondary text-xs mt-0.5">{todo.time}</span>
                        )}
                      </div>
                      <button className="text-text-secondary opacity-0 group-hover:opacity-100 hover:text-white transition-all">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Section: Completed */}
                {completed.length > 0 && (
                  <div className="flex flex-col gap-3 mt-2 opacity-60 hover:opacity-100 transition-opacity">
                    <h3 className="text-text-secondary text-sm font-bold uppercase tracking-wider px-1">Completed</h3>
                    {completed.map((todo) => (
                      <div
                        key={todo.id}
                        className="group flex items-center gap-4 p-4 rounded-xl bg-background-dark border border-surface-dark hover:border-[#325a67] transition-all cursor-pointer"
                      >
                        <button className="w-6 h-6 rounded-full bg-primary border-2 border-primary flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-[16px]">check</span>
                        </button>
                        <div className="flex flex-col flex-1">
                          <span className="text-text-secondary line-through text-base font-medium">{todo.title}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteCompleted(todo.id)}
                          className="text-text-secondary opacity-0 group-hover:opacity-100 hover:text-white transition-all"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Rail: Widgets */}
            <div className="flex flex-col gap-6">
              {/* Progress Widget */}
              <div className="bg-[#1c2b30] border border-[#325a67] rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white text-lg font-bold">Daily Goal</p>
                    <p className="text-text-secondary text-sm">{completedCount} of {totalCount} tasks completed</p>
                  </div>
                  <span className="text-primary text-2xl font-black">{progressPercent}%</span>
                </div>
                <div className="w-full bg-background-dark rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>

              {/* Mini Calendar Widget */}
              <div className="bg-[#1c2b30] border border-[#325a67] rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-white font-bold">October 2023</p>
                  <div className="flex gap-1">
                    <button className="text-text-secondary hover:text-white p-1">
                      <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>
                    <button className="text-text-secondary hover:text-white p-1">
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <span key={i} className="text-text-secondary font-bold py-2">{d}</span>
                  ))}
                  {calendarDays.map((d, i) => (
                    <span
                      key={i}
                      className={`py-2 rounded-md text-sm ${
                        d.today
                          ? 'bg-primary text-white font-bold'
                          : d.inactive
                          ? 'text-text-secondary opacity-40'
                          : 'text-white hover:bg-[#325a67]/30 cursor-pointer'
                      }`}
                    >
                      {d.day}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes Widget */}
              <div className="bg-[#1c2b30] border border-[#325a67] rounded-2xl p-6 relative overflow-hidden">
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[120px] text-white opacity-[0.03] pointer-events-none">edit_note</span>
                <div className="relative z-10 flex flex-col gap-3">
                  <h3 className="text-white font-bold text-lg">Quick Notes</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Don&apos;t forget to prepare the presentation slides for tomorrow&apos;s meeting with the client.
                  </p>
                  <button className="mt-2 text-primary text-sm font-medium flex items-center gap-1 hover:text-white transition-colors">
                    Open Notes <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

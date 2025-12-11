'use client'

import { useState } from 'react'

interface Task {
  id: number
  title: string
  category: string
  time: string
  completed: boolean
}

const initialTasks: Task[] = [
  { id: 1, title: 'Review quarterly goals', category: 'Work', time: '9:00 AM', completed: false },
  { id: 2, title: 'Draft project proposal', category: 'Work', time: '11:30 AM', completed: false },
  { id: 3, title: 'Meditate for 20 mins', category: 'Personal', time: '7:00 AM', completed: true },
  { id: 4, title: 'Call insurance company', category: 'Personal', time: '2:00 PM', completed: false },
  { id: 5, title: 'Update budget spreadsheet', category: 'Finance', time: '4:00 PM', completed: false },
]

export default function TasksWidget() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    )
  }

  return (
    <div className="bg-card-dark border border-[#233f48] rounded-2xl flex flex-col flex-1 shadow-xl">
      <div className="p-6 border-b border-[#233f48] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <h3 className="text-white text-lg font-bold tracking-wide">TODAY&apos;S TASKS</h3>
        </div>
        <span className="bg-[#233f48] text-[#92bbc9] text-xs font-bold px-2 py-1 rounded">
          {completedCount} / {totalCount}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-1 overflow-y-auto max-h-[600px]">
        {tasks.map((task) => (
          <label
            key={task.id}
            className={`group flex items-start gap-4 p-3 rounded-xl hover:bg-[#233f48]/50 cursor-pointer transition-all ${
              task.completed ? 'opacity-60' : ''
            }`}
          >
            <div className="relative flex items-center mt-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="peer h-5 w-5 appearance-none rounded border-2 border-[#325a67] bg-transparent checked:bg-primary checked:border-primary focus:ring-0 transition-all cursor-pointer"
              />
              <span className="material-symbols-outlined absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-sm left-[2px]">
                check
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span
                className={`text-white text-base font-medium group-hover:text-primary transition-colors ${
                  task.completed ? 'line-through decoration-[#587a8a]' : ''
                }`}
              >
                {task.title}
              </span>
              <span className="text-[#587a8a] text-xs font-medium">
                {task.category} • {task.time}
              </span>
            </div>
          </label>
        ))}
      </div>

      <div className="p-4 border-t border-[#233f48] mt-auto">
        <button className="w-full py-2 rounded-lg bg-[#233f48]/50 text-[#92bbc9] hover:bg-[#233f48] hover:text-white text-sm font-bold transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">add</span> Add New Task
        </button>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Sidebar from '../components/Sidebar'

interface Transaction {
  id: number
  time: string
  title: string
  category: string
  categoryIcon: string
  iconBg: string
  iconColor: string
  amount: string
  status: 'completed' | 'pending'
}

const transactions: Transaction[] = [
  { id: 1, time: '10:45 AM', title: 'Lunch at Cafe', category: 'Food & Dining', categoryIcon: 'lunch_dining', iconBg: 'bg-orange-100 dark:bg-orange-500/20', iconColor: 'text-orange-600 dark:text-orange-400', amount: '35.00', status: 'completed' },
  { id: 2, time: '08:30 AM', title: 'Bus Ticket', category: 'Transport', categoryIcon: 'directions_bus', iconBg: 'bg-blue-100 dark:bg-blue-500/20', iconColor: 'text-blue-600 dark:text-blue-400', amount: '15.00', status: 'completed' },
  { id: 3, time: 'Yesterday', title: 'Groceries', category: 'Shopping', categoryIcon: 'shopping_bag', iconBg: 'bg-purple-100 dark:bg-purple-500/20', iconColor: 'text-purple-600 dark:text-purple-400', amount: '120.00', status: 'completed' },
  { id: 4, time: 'Yesterday', title: 'Electricity Bill', category: 'Utilities', categoryIcon: 'receipt_long', iconBg: 'bg-red-100 dark:bg-red-500/20', iconColor: 'text-red-600 dark:text-red-400', amount: '540.00', status: 'pending' },
]

const categories = [
  { id: 'food', icon: 'lunch_dining', label: 'Food' },
  { id: 'transport', icon: 'directions_bus', label: 'Transport' },
  { id: 'shopping', icon: 'shopping_bag', label: 'Shopping' },
  { id: 'bills', icon: 'receipt_long', label: 'Bills' },
]

export default function FinancePage() {
  const [selectedCategory, setSelectedCategory] = useState('food')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')

  // Get current date
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
  const formattedDate = now.toLocaleDateString('en-US', options)

  // Stats
  const baseBudget = 100
  const rollover = 45
  const available = baseBudget + rollover
  const spent = 50
  const remainingPercent = Math.round(((available - spent) / available) * 100)
  const consumptionPercent = Math.round((spent / available) * 100)

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-hidden">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto relative">
        <div className="w-full max-w-[1200px] mx-auto p-6 md:p-10 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-wrap justify-between items-end gap-4 border-b border-gray-200 dark:border-[#1f3640] pb-6">
            <div className="flex flex-col gap-2">
              <p className="text-slate-500 dark:text-[#92bbc9] text-sm font-medium uppercase tracking-wider">Daily Budget Tracker</p>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">{formattedDate}</h1>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#16262c] rounded-full border border-gray-200 dark:border-[#1f3640] shadow-sm">
              <span className="material-symbols-outlined text-primary text-sm">calendar_month</span>
              <span className="text-sm font-medium dark:text-gray-300">Today</span>
            </div>
          </header>

          {/* Hero Status & Stats */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Available Budget */}
            <div className="lg:col-span-5 bg-gradient-to-br from-primary to-[#0e8ab3] rounded-2xl p-8 flex flex-col justify-between shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                <span className="material-symbols-outlined text-[200px]">account_balance_wallet</span>
              </div>
              <div className="relative z-10">
                <p className="text-blue-100 font-medium mb-1">Available for Today</p>
                <div className="flex items-baseline gap-1">
                  <h2 className="text-6xl font-black tracking-tight">{available - spent}</h2>
                  <span className="text-2xl font-medium text-blue-100">tk</span>
                </div>
              </div>
              <div className="mt-8 relative z-10">
                <div className="w-full bg-black/20 rounded-full h-1.5 mb-4 overflow-hidden">
                  <div className="bg-white h-1.5 rounded-full" style={{ width: `${remainingPercent}%` }}></div>
                </div>
                <p className="text-sm text-blue-50 font-medium flex justify-between">
                  <span>Keeping it up!</span>
                  <span>{remainingPercent}% Remaining</span>
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Base Budget */}
              <div className="bg-white dark:bg-[#16262c] border border-gray-200 dark:border-[#1f3640] rounded-xl p-6 flex flex-col justify-center gap-2 shadow-sm hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1f3640] flex items-center justify-center text-slate-600 dark:text-gray-400 mb-2">
                  <span className="material-symbols-outlined">foundation</span>
                </div>
                <p className="text-slate-500 dark:text-[#92bbc9] text-sm font-medium">Base Budget</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{baseBudget} <span className="text-sm font-normal text-slate-400">tk</span></p>
              </div>

              {/* Rollover */}
              <div className="bg-white dark:bg-[#16262c] border border-gray-200 dark:border-[#1f3640] rounded-xl p-6 flex flex-col justify-center gap-2 shadow-sm hover:border-green-500/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-2">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <p className="text-slate-500 dark:text-[#92bbc9] text-sm font-medium">Rollover (Yest.)</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">+{rollover} <span className="text-sm font-normal text-slate-400">tk</span></p>
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">+12%</span>
                </div>
              </div>

              {/* Total Savings */}
              <div className="bg-white dark:bg-[#16262c] border border-gray-200 dark:border-[#1f3640] rounded-xl p-6 flex flex-col justify-center gap-2 shadow-sm hover:border-purple-500/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 mb-2">
                  <span className="material-symbols-outlined">savings</span>
                </div>
                <p className="text-slate-500 dark:text-[#92bbc9] text-sm font-medium">Total Savings</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">2,450 <span className="text-sm font-normal text-slate-400">tk</span></p>
                  <span className="text-xs font-bold text-purple-500 bg-purple-500/10 px-1.5 py-0.5 rounded">+5%</span>
                </div>
              </div>
            </div>
          </section>

          {/* Consumption Bar */}
          <section className="bg-white dark:bg-[#16262c] rounded-xl border border-gray-200 dark:border-[#1f3640] p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold">Daily Consumption</h3>
                  <p className="text-slate-500 dark:text-[#92bbc9] text-sm">You have spent {spent} tk out of {available} tk available</p>
                </div>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{consumptionPercent}%</span>
              </div>
              <div className="h-4 w-full bg-gray-100 dark:bg-[#101d22] rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full relative" style={{ width: `${consumptionPercent}%` }}>
                  <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Content Split: Input & History */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Quick Add Form */}
            <div className="xl:col-span-1 flex flex-col gap-4">
              <div className="bg-white dark:bg-[#16262c] rounded-xl border border-gray-200 dark:border-[#1f3640] p-6 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <span className="material-symbols-outlined">add_card</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Log Expense</h3>
                </div>
                <form className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-500 dark:text-[#92bbc9] uppercase tracking-wider">Amount (tk)</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">attach_money</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-[#101d22] text-slate-900 dark:text-white rounded-lg border border-gray-200 dark:border-[#1f3640] py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium text-lg"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-500 dark:text-[#92bbc9] uppercase tracking-wider">Category</label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((cat) => (
                        <label key={cat.id} className="cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === cat.id}
                            onChange={() => setSelectedCategory(cat.id)}
                            className="peer sr-only"
                          />
                          <div className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg border border-gray-200 dark:border-[#1f3640] bg-gray-50 dark:bg-[#101d22] peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary text-slate-500 dark:text-gray-400 transition-all hover:bg-gray-100 dark:hover:bg-[#1f3640]">
                            <span className="material-symbols-outlined text-xl">{cat.icon}</span>
                            <span className="text-xs font-medium">{cat.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-500 dark:text-[#92bbc9] uppercase tracking-wider">Note (Optional)</label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-[#101d22] text-slate-900 dark:text-white rounded-lg border border-gray-200 dark:border-[#1f3640] p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400 resize-none h-24"
                      placeholder="What was this for?"
                    />
                  </div>

                  <button
                    type="button"
                    className="mt-2 w-full bg-primary hover:bg-[#0e8ab3] text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">add_circle</span>
                    Add Transaction
                  </button>
                </form>
              </div>
            </div>

            {/* Transaction Ledger */}
            <div className="xl:col-span-2 flex flex-col gap-4">
              <div className="bg-white dark:bg-[#16262c] rounded-xl border border-gray-200 dark:border-[#1f3640] p-6 shadow-sm h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
                  <button className="text-primary text-sm font-medium hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-[#1f3640]">
                        <th className="py-3 px-4 text-xs font-semibold uppercase text-slate-500 dark:text-[#92bbc9] tracking-wider">Time</th>
                        <th className="py-3 px-4 text-xs font-semibold uppercase text-slate-500 dark:text-[#92bbc9] tracking-wider">Description</th>
                        <th className="py-3 px-4 text-xs font-semibold uppercase text-slate-500 dark:text-[#92bbc9] tracking-wider text-right">Amount</th>
                        <th className="py-3 px-4 text-xs font-semibold uppercase text-slate-500 dark:text-[#92bbc9] tracking-wider text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="group hover:bg-gray-50 dark:hover:bg-[#1f3640] transition-colors">
                          <td className="py-4 px-4 text-sm text-slate-600 dark:text-gray-300 font-medium whitespace-nowrap">{tx.time}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full ${tx.iconBg} ${tx.iconColor} flex items-center justify-center shrink-0`}>
                                <span className="material-symbols-outlined text-sm">{tx.categoryIcon}</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">{tx.title}</p>
                                <p className="text-xs text-slate-500 dark:text-[#92bbc9]">{tx.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{tx.amount} tk</p>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                              tx.status === 'completed'
                                ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${tx.status === 'completed' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                              {tx.status === 'completed' ? 'Completed' : 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

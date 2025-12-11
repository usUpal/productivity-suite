'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', icon: 'grid_view', label: 'Dashboard', filled: true },
  { href: '/meditation', icon: 'self_improvement', label: 'Meditation' },
  { href: '/finance', icon: 'payments', label: 'Finance' },
  { href: '/todos', icon: 'check_circle', label: 'Todos' },
  { href: '/notes', icon: 'edit_note', label: 'Notes' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-20 lg:w-64 flex-shrink-0 flex flex-col justify-between border-r border-[#233f48] bg-background-dark py-6 transition-all duration-300">
      <div className="flex flex-col gap-8 px-4">
        {/* User Profile */}
        <div className="flex items-center gap-3 lg:px-2">
          <div className="relative group cursor-pointer">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 lg:size-12 ring-2 ring-[#233f48] group-hover:ring-primary transition-all"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAK7FewOo2_8KfTtY9qNxsa-e5q1rh7RCLnsumLtMYxwxJBNVMYBU__RovAaStfVup7m2YqupBB04ByvpB0WfFoLuyYDJ7hobGqQuZWR0oGtIOOaGDCGED7E0i4CEfgl7iMMYPNmvyknZSUPe7suAJ6-KNHCKckTyh_RDsLYFxfpSdHsSZs1Jv3OLMbVEerbZ48pCkRDIX31tPF79psOGb6cnojrW_IjYWONlrW9tf2X9GFbP73jgK0XeyqyDXE1TGIXSfktL_HX8U")`,
              }}
            />
            <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-background-dark"></div>
          </div>
          <div className="hidden lg:flex flex-col">
            <h1 className="text-white text-base font-bold leading-tight">Alex&apos;s Hub</h1>
            <p className="text-[#92bbc9] text-xs font-medium uppercase tracking-wider">Pro Plan</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group border-l-4 ${
                  isActive
                    ? 'bg-[#233f48]/50 text-primary border-primary'
                    : 'text-[#92bbc9] hover:bg-[#233f48]/30 hover:text-white border-transparent'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span className={`hidden lg:block text-sm ${isActive ? 'font-bold tracking-wide' : 'font-medium'}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Quick Add Button */}
      <div className="px-4">
        <button className="flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl h-12 bg-primary hover:bg-[#0e8bb5] text-white transition-all shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined">add</span>
          <span className="hidden lg:block text-sm font-bold tracking-wide">Quick Add</span>
        </button>
      </div>
    </aside>
  )
}

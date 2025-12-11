import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TasksWidget from "./components/TasksWidget";
import MeditationWidget from "./components/MeditationWidget";
import FinanceWidget from "./components/FinanceWidget";
import NotesWidget from "./components/NotesWidget";

export default function Dashboard() {
  // Get current date info
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
  const formattedDate = now.toLocaleDateString('en-US', options);
  
  // Determine greeting based on time
  const hour = now.getHours();
  let greeting = "Good Morning";
  if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
  else if (hour >= 17) greeting = "Good Evening";

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      {/* Global Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark relative">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#18282d] to-transparent pointer-events-none z-0"></div>

        <div className="max-w-[1600px] w-full mx-auto p-6 lg:p-10 z-10 flex flex-col gap-8">
          {/* Greeting Header */}
          <Header
            date={formattedDate}
            greeting={greeting}
            name="Alex"
            quote="Focus on being productive instead of busy."
            taskCount={5}
          />

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            {/* Left Column: Todos (Focus) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <TasksWidget />
            </div>

            {/* Center Column: Stats (Meditation & Finance) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <MeditationWidget />
              <FinanceWidget />
            </div>

            {/* Right Column: Notes (Reference) */}
            <NotesWidget />
          </div>
        </div>
      </main>
    </div>
  );
}

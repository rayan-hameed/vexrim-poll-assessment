import { PollProvider } from "./context/PollContext";
import PollContainer from "./components/PollContainer";

export default function App() {
  return (
    <PollProvider>
      <div className="flex min-h-screen flex-col items-center justify-start bg-paper px-4 py-10">
        <header className="relative z-10 mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
            Vexrim
          </p>
          <h1 className="font-display mt-1 text-2xl font-bold text-ink md:text-3xl">
            Weekly Pulse Poll
          </h1>
        </header>

        <main className="w-full max-w-3xl mt-6">
          <PollContainer />
        </main>
      </div>
    </PollProvider>
  );
}

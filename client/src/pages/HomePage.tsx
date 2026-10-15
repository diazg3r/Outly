import ApiStatus from '../components/ApiStatus'

export default function HomePage() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-slate-900">
        Discover your next experience.
      </h1>

      <p className="mt-6 max-w-xl text-lg text-slate-600">
        Find restaurants and activities tailored to your
        location, occasion, and preferences.
      </p>

      <button className="mt-8 rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700">
        Start Exploring
      </button>

      <ApiStatus />
    </main>
  )
}
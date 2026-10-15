export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-slate-200 px-8 py-5">
      <h1 className="text-2xl font-bold text-indigo-600">
        Outly
      </h1>

      <div className="flex items-center gap-6">
        <a href="/">Home</a>
        <a href="/explore">Explore</a>

        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-white">
          Sign In
        </button>
      </div>
    </nav>
  )
}
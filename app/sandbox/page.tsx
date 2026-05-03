import Link from "next/link";

export default function SandboxIndex() {
  return (
    <main className="mx-auto max-w-3xl p-10">
      <h1 className="text-3xl font-bold text-stone-800">🎨 UI Sandbox</h1>
      <p className="mt-2 text-stone-600">
        前端設計試驗場 — 全部用 hardcoded data，唔 query DB。
      </p>

      <ul className="mt-6 space-y-3">
        <li>
          <Link
            href="/sandbox/profile-demo"
            className="block rounded-lg border border-stone-200 bg-white p-4 hover:border-amber-300"
          >
            <p className="font-semibold text-stone-800">📄 Profile demo</p>
            <p className="text-sm text-stone-500">
              Public profile view — 同 /profile/[id] 一樣 layout，hardcoded data
            </p>
          </Link>
        </li>
        <li>
          <Link
            href="/sandbox/discover-demo"
            className="block rounded-lg border border-stone-200 bg-white p-4 hover:border-amber-300"
          >
            <p className="font-semibold text-stone-800">🔍 Discover demo</p>
            <p className="text-sm text-stone-500">
              Discover page mockup — Phase 6 嘅 page UI
            </p>
          </Link>
        </li>
      </ul>
    </main>
  );
}

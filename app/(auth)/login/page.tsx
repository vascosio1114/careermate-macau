import Link from "next/link";
import { login } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-50 to-white p-8">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <Link href="/" className="text-sm text-amber-600 hover:underline">
          ← 返回首頁
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-stone-800">歡迎返嚟 👋</h1>
        <p className="mt-2 text-stone-600">登入你嘅 CareerMate Macau 帳戶</p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form action={login} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700">
              電郵
            </label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700">
              密碼
            </label>
            <input
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-amber-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-amber-700"
          >
            登入
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-600">
          仲未有帳戶？{" "}
          <Link
            href="/signup"
            className="font-semibold text-amber-600 hover:underline"
          >
            註冊
          </Link>
        </p>
      </div>
    </main>
  );
}

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "./(auth)/actions";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-amber-50 to-white p-8">
      <div className="max-w-2xl text-center">
        <div className="mb-4 text-6xl">☕</div>
        <h1 className="text-5xl font-bold text-stone-800 sm:text-6xl">
          CareerMate <span className="text-amber-600">Macau</span>
        </h1>
        <p className="mt-6 text-lg text-stone-600 sm:text-xl">
          連結澳門學生、fresh grad、mentor 同 startup。
          <br />
          展示你嘅 resume，搵人 coffee chat，建立職業人脈。
        </p>

        {user ? (
          <div className="mt-10 space-y-4">
            <p className="text-stone-700">
              👋 你好，<strong>{user.email}</strong>
            </p>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full border border-stone-300 bg-white px-8 py-3 font-semibold text-stone-700 transition hover:bg-stone-50"
              >
                登出
              </button>
            </form>
          </div>
        ) : (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="rounded-full bg-amber-600 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-amber-700"
            >
              開始探索
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-stone-300 bg-white px-8 py-3 font-semibold text-stone-700 transition hover:bg-stone-50"
            >
              登入
            </Link>
          </div>
        )}

        <p className="mt-12 text-sm text-stone-400">
          🚧 Building MVP — Phase 3 of 9
        </p>
      </div>
    </main>
  );
}

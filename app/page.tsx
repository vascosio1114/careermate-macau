import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 拎 profile 睇下個 user 完成咗幾多
  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, school, major, bio")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  const profileIncomplete =
    user && (!profile?.school || !profile?.major || !profile?.bio);

  return (
    <main className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center bg-gradient-to-b from-amber-50 to-white p-8">
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

        {!user && (
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

        {user && profileIncomplete && (
          <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-6 text-left">
            <p className="font-semibold text-stone-800">
              👋 歡迎，{profile?.full_name || user.email}！
            </p>
            <p className="mt-2 text-sm text-stone-600">
              你嘅 profile 仲未完成。完善 profile 之後，其他人就可以搵你 coffee
              chat。
            </p>
            <Link
              href="/profile/edit"
              className="mt-4 inline-block rounded-full bg-amber-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
            >
              完善 Profile →
            </Link>
          </div>
        )}

        {user && !profileIncomplete && (
          <div className="mt-10 rounded-xl border border-green-200 bg-green-50 p-6 text-left">
            <p className="font-semibold text-stone-800">✅ Profile 已完成！</p>
            <p className="mt-2 text-sm text-stone-600">
              探索其他用戶 + 開始建立人脈。
            </p>
            <Link
              href="/discover"
              className="mt-4 inline-block rounded-full bg-amber-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
            >
              探索人脈 →
            </Link>
          </div>
        )}

        <p className="mt-12 text-sm text-stone-400">
          🚧 Building MVP — Phase 4 of 9
        </p>
      </div>
    </main>
  );
}

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/(auth)/actions";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 只係 logged in 時 fetch profile photo
  let photoUrl: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("profile_photo_url")
      .eq("id", user.id)
      .single();
    photoUrl = profile?.profile_photo_url ?? null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-stone-800"
        >
          <span className="text-2xl">☕</span>
          <span>
            CareerMate <span className="text-amber-600">Macau</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              {photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoUrl}
                  alt="avatar"
                  className="h-8 w-8 rounded-full object-cover ring-1 ring-amber-200"
                />
              ) : null}
              <Link
                href={`/profile/${user.id}`}
                className="hidden rounded-full px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 sm:inline-block"
              >
                我的 Profile
              </Link>
              <span className="hidden text-sm text-stone-500 md:inline">
                {user.email}
              </span>
              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                >
                  登出
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
              >
                登入
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700"
              >
                註冊
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

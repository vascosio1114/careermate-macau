import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const ROLE_LABELS: Record<string, string> = {
  student: "🎓 學生",
  fresh_grad: "✨ Fresh Grad",
  professional: "💼 Professional",
  mentor: "🌟 Mentor",
  recruiter: "🔍 Recruiter / HR",
  founder: "🚀 Startup Founder",
};

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user: viewer },
  } = await supabase.auth.getUser();

  // Fetch target profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (!profile) notFound();

  // Fetch skills + experiences in parallel
  const [{ data: skills }, { data: experiences }] = await Promise.all([
    supabase
      .from("skills")
      .select("id, skill_name")
      .eq("user_id", id)
      .order("created_at", { ascending: true }),
    supabase
      .from("experiences")
      .select("*")
      .eq("user_id", id)
      .order("start_date", { ascending: false }),
  ]);

  const isOwn = viewer?.id === id;

  return (
    <main className="mx-auto max-w-3xl p-6 sm:p-10">
      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-br from-amber-50 to-white p-8 ring-1 ring-stone-200">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          {profile.profile_photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.profile_photo_url}
              alt={profile.full_name || "avatar"}
              className="h-32 w-32 rounded-full object-cover ring-4 ring-amber-200"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-stone-100 text-5xl">
              ☕
            </div>
          )}

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-stone-800">
              {profile.full_name || "未填名"}
            </h1>

            {profile.role && (
              <span className="mt-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                {ROLE_LABELS[profile.role] || profile.role}
              </span>
            )}

            <p className="mt-3 text-stone-600">
              {[profile.job_title, profile.company]
                .filter(Boolean)
                .join(" @ ")}
              {profile.school && (
                <>
                  {profile.job_title || profile.company ? " · " : ""}
                  🎓 {profile.school}
                </>
              )}
            </p>

            {profile.major && (
              <p className="mt-1 text-sm text-stone-500">
                主修 {profile.major}
              </p>
            )}

            {profile.location && (
              <p className="mt-1 text-sm text-stone-500">
                📍 {profile.location}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {isOwn ? (
                <Link
                  href="/profile/edit"
                  className="rounded-full bg-amber-600 px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-amber-700"
                >
                  編輯 Profile
                </Link>
              ) : profile.open_to_coffee_chat ? (
                viewer ? (
                  <button
                    type="button"
                    disabled
                    title="Phase 7 即將推出"
                    className="rounded-full bg-amber-600 px-6 py-2 text-sm font-semibold text-white shadow-md opacity-60"
                  >
                    ☕ 邀請 Coffee Chat（即將推出）
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="rounded-full bg-amber-600 px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-amber-700"
                  >
                    登入後邀請 Coffee Chat
                  </Link>
                )
              ) : (
                <span className="text-sm text-stone-500">
                  目前未開放接受 Coffee Chat 邀請
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      {profile.bio && (
        <section className="mt-6 rounded-xl border border-stone-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-stone-800">關於我</h2>
          <p className="mt-3 whitespace-pre-wrap text-stone-700">
            {profile.bio}
          </p>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mt-6 rounded-xl border border-stone-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-stone-800">技能</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s.id}
                className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800"
              >
                {s.skill_name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experiences */}
      {experiences && experiences.length > 0 && (
        <section className="mt-6 rounded-xl border border-stone-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-stone-800">經歷</h2>
          <div className="mt-4 space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="border-l-2 border-amber-200 pl-4">
                <p className="font-semibold text-stone-800">{exp.position}</p>
                <p className="text-sm text-stone-600">{exp.company}</p>
                <p className="text-xs text-stone-500">
                  {formatDate(exp.start_date)} —{" "}
                  {exp.is_current ? "至今" : formatDate(exp.end_date)}
                </p>
                {exp.description && (
                  <p className="mt-1 text-sm text-stone-700">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* External Links */}
      {(profile.linkedin_url ||
        profile.github_url ||
        profile.portfolio_url) && (
        <section className="mt-6 rounded-xl border border-stone-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-stone-800">連結</h2>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-blue-50 px-4 py-2 font-medium text-blue-700 transition hover:bg-blue-100"
              >
                LinkedIn ↗
              </a>
            )}
            {profile.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-stone-100 px-4 py-2 font-medium text-stone-800 transition hover:bg-stone-200"
              >
                GitHub ↗
              </a>
            )}
            {profile.portfolio_url && (
              <a
                href={profile.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-purple-50 px-4 py-2 font-medium text-purple-700 transition hover:bg-purple-100"
              >
                Portfolio ↗
              </a>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

function formatDate(d: string | null) {
  if (!d) return "—";
  const date = new Date(d);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}`;
}

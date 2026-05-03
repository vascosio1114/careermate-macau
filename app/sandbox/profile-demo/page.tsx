import Link from "next/link";

const MOCK_PROFILE = {
  id: "mock-id",
  full_name: "陳大文",
  role: "student",
  school: "University of Macau",
  major: "Computer Science",
  company: null,
  job_title: null,
  bio: "二年級 CS 學生，對 web dev 同 AI 有興趣。希望識更多澳門 startup 嘅人，互相分享經驗。",
  location: "Taipa, Macau",
  profile_photo_url: null,
  linkedin_url: "https://linkedin.com/in/example",
  github_url: "https://github.com/example",
  portfolio_url: null,
  open_to_coffee_chat: true,
};

const MOCK_SKILLS = [
  { id: "1", skill_name: "JavaScript" },
  { id: "2", skill_name: "React" },
  { id: "3", skill_name: "Python" },
  { id: "4", skill_name: "SQL" },
];

const ROLE_LABELS: Record<string, string> = {
  student: "🎓 學生",
  fresh_grad: "✨ Fresh Grad",
  professional: "💼 Professional",
  mentor: "🌟 Mentor",
};

export default function ProfileDemoPage() {
  const profile = MOCK_PROFILE;
  const skills = MOCK_SKILLS;

  return (
    <main className="mx-auto max-w-3xl p-6 sm:p-10">
      <Link href="/sandbox" className="text-sm text-amber-600 hover:underline">
        ← Sandbox
      </Link>

      {/* Hero */}
      <section className="mt-4 rounded-2xl bg-gradient-to-br from-amber-50 to-white p-8 ring-1 ring-stone-200">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-stone-100 text-5xl">
            ☕
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-stone-800">
              {profile.full_name}
            </h1>
            <span className="mt-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
              {ROLE_LABELS[profile.role]}
            </span>
            <p className="mt-3 text-stone-600">🎓 {profile.school}</p>
            <p className="mt-1 text-sm text-stone-500">主修 {profile.major}</p>
            <p className="mt-1 text-sm text-stone-500">📍 {profile.location}</p>

            <div className="mt-4">
              <button
                type="button"
                className="rounded-full bg-amber-600 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-amber-700"
              >
                ☕ 邀請 Coffee Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mt-6 rounded-xl border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-stone-800">關於我</h2>
        <p className="mt-3 whitespace-pre-wrap text-stone-700">{profile.bio}</p>
      </section>

      {/* Skills */}
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

      {/* Links */}
      <section className="mt-6 rounded-xl border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-stone-800">連結</h2>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <a
            href={profile.linkedin_url}
            className="rounded-full bg-blue-50 px-4 py-2 font-medium text-blue-700"
          >
            LinkedIn ↗
          </a>
          <a
            href={profile.github_url}
            className="rounded-full bg-stone-100 px-4 py-2 font-medium text-stone-800"
          >
            GitHub ↗
          </a>
        </div>
      </section>
    </main>
  );
}

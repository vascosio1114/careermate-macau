import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateProfile, uploadProfilePhoto } from "../actions";

export default async function EditProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { error, success } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <main className="mx-auto max-w-3xl p-6 sm:p-10">
      <Link href="/" className="text-sm text-amber-600 hover:underline">
        ← 返回首頁
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-stone-800">編輯 Profile</h1>
      <p className="mt-2 text-stone-600">
        完善你嘅 profile，俾人哋更易搵到你做 coffee chat。
      </p>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          ❌ {error}
        </div>
      )}
      {success && (
        <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
          ✅ Profile 已更新
        </div>
      )}

      {/* Profile Photo — 獨立 form，唔可以 nest 入主 form */}
      <section className="mt-8 rounded-xl border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-stone-800">頭像</h2>
        <div className="mt-4 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          {profile?.profile_photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.profile_photo_url}
              alt="avatar"
              className="h-24 w-24 rounded-full object-cover ring-2 ring-amber-200"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-stone-100 text-4xl">
              ☕
            </div>
          )}

          <form action={uploadProfilePhoto} className="flex-1 space-y-3">
            <input
              type="file"
              name="photo"
              accept="image/*"
              required
              className="block w-full text-sm text-stone-600 file:mr-4 file:rounded-full file:border-0 file:bg-amber-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-amber-700 hover:file:bg-amber-200"
            />
            <p className="text-xs text-stone-500">JPG / PNG，最多 5MB</p>
            <button
              type="submit"
              className="rounded-full bg-amber-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
            >
              上傳頭像
            </button>
          </form>
        </div>
      </section>

      {/* 主 form — 文字 fields */}
      <form action={updateProfile} className="mt-6 space-y-6">
        {/* Basic Info */}
        <section className="rounded-xl border border-stone-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-stone-800">基本資料</h2>

          <div className="mt-4 space-y-4">
            <Field
              label="全名"
              name="full_name"
              defaultValue={profile?.full_name}
            />

            <div>
              <label className="block text-sm font-medium text-stone-700">
                身份
              </label>
              <select
                name="role"
                defaultValue={profile?.role || ""}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="">— 請揀 —</option>
                <option value="student">學生</option>
                <option value="fresh_grad">Fresh Grad</option>
                <option value="professional">Professional</option>
                <option value="mentor">Mentor</option>
                <option value="recruiter">Recruiter / HR</option>
                <option value="founder">Startup Founder</option>
              </select>
            </div>

            <Field
              label="學校"
              name="school"
              placeholder="例：University of Macau"
              defaultValue={profile?.school}
            />
            <Field
              label="主修 / Major"
              name="major"
              placeholder="例：Computer Science"
              defaultValue={profile?.major}
            />
            <Field
              label="公司（如適用）"
              name="company"
              defaultValue={profile?.company}
            />
            <Field
              label="職位（如適用）"
              name="job_title"
              defaultValue={profile?.job_title}
            />
            <Field
              label="所在地"
              name="location"
              placeholder="例：Macau Peninsula / Taipa"
              defaultValue={profile?.location}
            />
          </div>
        </section>

        {/* Bio */}
        <section className="rounded-xl border border-stone-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-stone-800">關於我</h2>
          <textarea
            name="bio"
            rows={4}
            defaultValue={profile?.bio || ""}
            placeholder="介紹下自己嘅興趣、職業目標、想識邊類型嘅人..."
            className="mt-4 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </section>

        {/* Links */}
        <section className="rounded-xl border border-stone-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-stone-800">外部連結</h2>
          <div className="mt-4 space-y-4">
            <Field
              label="LinkedIn URL"
              name="linkedin_url"
              type="url"
              placeholder="https://linkedin.com/in/..."
              defaultValue={profile?.linkedin_url}
            />
            <Field
              label="GitHub URL"
              name="github_url"
              type="url"
              placeholder="https://github.com/..."
              defaultValue={profile?.github_url}
            />
            <Field
              label="Portfolio URL"
              name="portfolio_url"
              type="url"
              placeholder="https://yoursite.com"
              defaultValue={profile?.portfolio_url}
            />
          </div>
        </section>

        {/* Coffee Chat toggle */}
        <section className="rounded-xl border border-stone-200 bg-white p-6">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="open_to_coffee_chat"
              defaultChecked={profile?.open_to_coffee_chat || false}
              className="mt-1 h-5 w-5 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
            />
            <div>
              <p className="font-semibold text-stone-800">
                ☕ 開放接受 Coffee Chat 邀請
              </p>
              <p className="mt-1 text-sm text-stone-600">
                開啟後，你會出現喺 Discover page，其他人可以主動約你 coffee
                chat。
              </p>
            </div>
          </label>
        </section>

        <div className="flex justify-end gap-3">
          <Link
            href="/"
            className="rounded-full border border-stone-300 bg-white px-6 py-3 font-semibold text-stone-700 transition hover:bg-stone-50"
          >
            取消
          </Link>
          <button
            type="submit"
            className="rounded-full bg-amber-600 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-amber-700"
          >
            儲存
          </button>
        </div>
      </form>
    </main>
  );
}

// 重複嘅 input field component
function Field({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string | null;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue || ""}
        className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
      />
    </div>
  );
}

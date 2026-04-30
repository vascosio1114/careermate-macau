import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profiles").select("count");

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

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button className="rounded-full bg-amber-600 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-amber-700">
            開始探索
          </button>
          <button className="rounded-full border border-stone-300 bg-white px-8 py-3 font-semibold text-stone-700 transition hover:bg-stone-50">
            登入
          </button>
        </div>

        {/* Supabase connection test */}
        <div className="mt-8 rounded-lg border border-stone-200 bg-white p-4 text-sm">
          <strong>Supabase status:</strong>{" "}
          {error ? (
            <span className="text-red-600">❌ {error.message}</span>
          ) : (
            <span className="text-green-600">
              ✅ Connected (data: {JSON.stringify(data)})
            </span>
          )}
        </div>

        <p className="mt-12 text-sm text-stone-400">
          🚧 Building MVP — Phase 2 of 9
        </p>
      </div>
    </main>
  );
}

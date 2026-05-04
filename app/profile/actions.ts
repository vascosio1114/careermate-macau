"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 自動補 https:// 如果 user 漏咗 protocol
function normalizeUrl(raw: string | null): string | null {
  if (!raw || !raw.trim()) return null;
  const trimmed = raw.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  const updates = {
    full_name: (formData.get("full_name") as string) || null,
    role: (formData.get("role") as string) || null,
    school: (formData.get("school") as string) || null,
    major: (formData.get("major") as string) || null,
    company: (formData.get("company") as string) || null,
    job_title: (formData.get("job_title") as string) || null,
    bio: (formData.get("bio") as string) || null,
    location: (formData.get("location") as string) || null,
    linkedin_url: normalizeUrl(formData.get("linkedin_url") as string),
    github_url: normalizeUrl(formData.get("github_url") as string),
    portfolio_url: normalizeUrl(formData.get("portfolio_url") as string),
    open_to_coffee_chat: formData.get("open_to_coffee_chat") === "on",
  };

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id);

  if (error) {
    return redirect(`/profile/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/profile/edit?success=1");
}

export async function uploadProfilePhoto(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  const file = formData.get("photo") as File;

  if (!file || file.size === 0) {
    return redirect("/profile/edit?error=請揀張相先");
  }
  if (file.size > 5 * 1024 * 1024) {
    return redirect("/profile/edit?error=檔案太大（最多 5MB）");
  }
  if (!file.type.startsWith("image/")) {
    return redirect("/profile/edit?error=只接受圖片檔");
  }

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${user.id}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("profile-photos")
    .upload(path, file, { upsert: true });

  if (uploadError) {
    return redirect(
      `/profile/edit?error=${encodeURIComponent(uploadError.message)}`
    );
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("profile-photos").getPublicUrl(path);
  const photoUrl = `${publicUrl}?t=${Date.now()}`;

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ profile_photo_url: photoUrl })
    .eq("id", user.id);

  if (updateError) {
    return redirect(
      `/profile/edit?error=${encodeURIComponent(updateError.message)}`
    );
  }

  revalidatePath("/", "layout");
  redirect("/profile/edit?success=1");
}

export async function addSkill(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/login");

  const skillName = (formData.get("skill_name") as string)?.trim();
  if (!skillName) {
    return redirect("/profile/edit?error=請輸入 skill 名");
  }
  if (skillName.length > 50) {
    return redirect("/profile/edit?error=Skill 名最多 50 字");
  }

  const { data: existing } = await supabase
    .from("skills")
    .select("id")
    .eq("user_id", user.id)
    .ilike("skill_name", skillName)
    .maybeSingle();

  if (existing) {
    return redirect("/profile/edit?error=已經加咗呢個 skill");
  }

  const { error } = await supabase
    .from("skills")
    .insert({ user_id: user.id, skill_name: skillName });

  if (error) {
    return redirect(`/profile/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/profile/edit");
  redirect("/profile/edit?success=1");
}

export async function removeSkill(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/login");

  const skillId = formData.get("skill_id") as string;
  if (!skillId) return redirect("/profile/edit?error=Invalid skill");

  const { error } = await supabase
    .from("skills")
    .delete()
    .eq("id", skillId)
    .eq("user_id", user.id);

  if (error) {
    return redirect(`/profile/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/profile/edit");
  redirect("/profile/edit?success=1");
}

import supabase from "./supabase";

export async function getAllApplications() {
  const { data: applications, error } = await supabase
    .from("applications")
    .select("id,title");

  if (error) {
    throw new Error(error.message);
  }

  return applications;
}

export async function getApplicationById(id: string) {
  const { data: application, error } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return application;
}

import supabase from "./supabase";

export async function getAllProblems() {
  let { data: problems, error } = await supabase
    .from("problems")
    .select("title,id,topics");
  if (error) {
    throw new Error(error.message);
  }
  return problems;
}

export async function getProblemById(id: string) {
  const { data: problem, error } = await supabase
    .from("problems")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return problem;
}

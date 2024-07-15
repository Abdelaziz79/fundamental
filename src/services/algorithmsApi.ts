import supabase from "./supabase";

export async function getAllAlgorithms() {
  const { data: algorithms, error } = await supabase
    .from("algorithms")
    .select("id,title");

  if (error) {
    throw new Error(error.message);
  }

  return algorithms;
}

export async function getAlgorithmById(id: string) {
  const { data: algorithm, error } = await supabase
    .from("algorithms")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return algorithm;
}

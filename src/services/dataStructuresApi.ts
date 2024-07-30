import supabase from "./supabase";

export async function getAllDataStructures() {
  const { data: dataStructures, error } = await supabase
    .from("dataStructures")
    .select("id,title");

  if (error) {
    throw new Error(error.message);
  }

  return dataStructures;
}

export async function getDataStructureById(id: string) {
  const { data: dataStructure, error } = await supabase
    .from("dataStructures")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return dataStructure;
}

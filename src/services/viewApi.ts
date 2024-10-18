import supabase from "./supabase";

export async function increaseView() {
  // First, get the current count
  let { data: currentData, error: selectError } = await supabase
    .from("views")
    .select("count")
    .eq("id", 1)
    .single();

  if (selectError) {
    console.error("Error fetching current count:", selectError);
    throw new Error(selectError.message);
  }

  const newCount = (currentData?.count || 0) + 1;

  // Then, update with the incremented count
  const { data, error } = await supabase
    .from("views")
    .update({ count: newCount })
    .eq("id", 1)
    .select()
    .single();

  if (error) {
    console.error("Error updating view count:", error);
    throw new Error(error.message);
  }

  return data;
}

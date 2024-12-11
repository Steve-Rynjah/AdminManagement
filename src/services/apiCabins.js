import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw error("Could not loaded cabins.");
  }
  return data;
}
export async function createCabin(newCabin) {
  //the prop newCabin should be of the same key_name from the superbase[backend], else for ex. have to pass in {_name: newCabin.name}
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();

  if (error) {
    throw error("Cabin could not be created.");
  }
  console.log("response : ", data)
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw error("Cabin could not be deleted.");
  }
  return data;
}

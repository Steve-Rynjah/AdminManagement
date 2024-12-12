import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw error("Could not loaded cabins.");
  }
  return data;
}
export async function createCabin(newCabin) {
  console.log("newCabin := ", newCabin)
  //the prop newCabin should be of the same key_name from the superbase[backend], else for ex. have to pass in {_name: newCabin.name}
  const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll("/", "")
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // 1. Create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{...newCabin, image: imagePath}])
    .select();

  if (error) {
    throw error("Cabin could not be created.");
  }
  
  // 2. Upload image
  const {error: storageError} = await supabase.storage
  .from("cabin-images")
  .upload(imageName, newCabin?.image) //newCabin?.image => Is the entire file

  // 3. If Error while uploading images
  if(storageError){
      await supabase.from("cabins").delete().eq("id", data?.id);
      throw error("Image could not be uploaded.");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw error("Cabin could not be deleted.");
  }
  return data;
}

import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw error("Could not loaded cabins.");
  }
  return data;
}
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl)
  //the prop newCabin should be of the same key_name from the superbase[backend], else for ex. have to pass in {_name: newCabin.name}
  const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll("/", "")
  const imagePath = hasImagePath ? newCabin?.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  let query = supabase.from("cabins")

  // 1. Create cabin
  if(!id){
    query = query.insert([{...newCabin, image: imagePath}])
  }
  
  //2. Update cabin
  if(id) {
    //query = query.update({...newCabin, image: imagePath}).eq("id", id) 
    query = supabase
    .from("cabins")
    .update({...newCabin, image:imagePath})
    .eq("id", id);
  }

  const { data, error } = await query.select().single()  
 
  if (error) {
    throw error("Cabin could not be created.");
  }
  
  // 3. Upload image
  if(hasImagePath) return data;
  
  const {error: storageError} = await supabase.storage
  .from("cabin-images")
  .upload(imageName, newCabin?.image) //newCabin?.image => Is the entire file

  // 4. If Error while uploading images
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

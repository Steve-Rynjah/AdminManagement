import supabase from "./supabase";

export async function getCabins(){
const  { data, error } = await supabase
.from('cabins')
.select('*')

if(error){
    throw error("Could not loaded cabins.")
}
return data;
}

export async function deleteCabins(id){
    const  { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq("id", id)
    
    if(error){
        throw error("Cabin could not be deleted.")
    }
    return data;
    }
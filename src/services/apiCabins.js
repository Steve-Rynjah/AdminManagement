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
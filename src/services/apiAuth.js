import supabase from "./supabase";

export async function loginAuth({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error(error);
    throw new Error("Could not authorized!");
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  console.log("session===>>>", session)

  if (!session?.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error("Could not authorized!");
  }

  return data?.user;
}

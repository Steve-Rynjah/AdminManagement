import supabase from "./supabase";

export async function signupAuth({ fullName, email, password}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      fullName: fullName,
      avatar: ""
    }
  });

  if (error) {
    throw new Error("Could not register!");
  }

  return data;
}

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

  if (!session?.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error("Could not authorized!");
  }

  return data?.user;
}

export async function logoutAuth() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error?.message);
  }
}

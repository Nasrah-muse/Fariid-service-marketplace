import supabase from "./supabase.js";

export async function signUp(email, password, username = "", role = "") {
   if (!role) {
    throw new Error("Please select a role (customer or provider)");
  }

  // Signup
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username || email.split("@")[0],
        role
      }
    }
  });

  if (error) throw error;

  // user profile
  if (data?.user) {
    const { data: sessionData } = await supabase.auth.getSession();

    if (sessionData?.session) {
      const { error: profileError } = await supabase
        .from("users")
        .insert({
          id: data.user.id,
          email,
          username: username || email.split("@")[0],
          role,
          avatar_url: null
        });

      if (profileError) throw profileError;
    }
  }

  return data;
}






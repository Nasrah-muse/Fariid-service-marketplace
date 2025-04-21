import supabase from "./supabase.js";

export async function signUp(email, password, username = "", role = "") {
   if (!role) {
    throw new Error("Please select a role (customer or provider)");
  }
  if (!username) throw new Error("Please provide a username");

  // Signup
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
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
          username,
          role,
          avatar_url: null
        });

      if (profileError) throw profileError;
    }
  }

  return data;
}

// Get Profile
export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error && error.code === "PGRST116") {
    const { data: userData } = await supabase.auth.getUser();

    const email = userData?.user?.email
    const metadata = userData?.user?.user_metadata || {}
    const username = metadata.username || email?.split('@')[0] || `user_${Date.now()}`
    const role = metadata.role || "customer"

    const { data: newProfile, error: insertError } = await supabase
      .from("users")
      .insert({
        id: userId,
        username,
        role,
        avatar_url: null,
      })
      .select()
      .single()

    if (insertError) throw insertError;
    return newProfile;
  }

  if (error) throw error;

  return data;
}


//  signin

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;

  // chek user profile exists
  if (data?.user) {
    try {
      await getUserProfile(data.user.id);
    } catch (err) {
      console.error("Profile error:", err.message);
      throw err;
    }
  }

  return data;
}

export function onAuthChange(callback) {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null, event);
  });

  return () => data.subscription.unsubscribe();
}


// Sign Out
export async function signOut() {
  await supabase.auth.signOut();
}


// app/index.tsx
import { supabase } from "@/lib/supabase";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [session, setSession] = useState<any>(undefined); // undefined = still checking

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, []);

  if (session === undefined) return null; // splash/native screen still covers this

  return session ? (
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/(onboarding)" />
  );
}
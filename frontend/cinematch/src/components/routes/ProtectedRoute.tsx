import { Navigate, Outlet } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";

export default function ProtectedRoute() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ?? null);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Wait for session to load
  if (session === undefined) return null; // or a loading spinner

  return session ? <Outlet /> : <Navigate to="/signin" replace />;
}

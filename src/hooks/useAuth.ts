import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";

/** Client-side Supabase session state for the practice ecosystem. */
export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | null = null;

    try {
      const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
        if (!active) return;
        setSession(next);
        setLoading(false);
      });
      unsubscribe = () => sub.subscription.unsubscribe();

      void supabase.auth.getSession().then(({ data }) => {
        if (!active) return;
        setSession(data.session);
        setLoading(false);
      });
    } catch {
      // Supabase env not configured (e.g. sandbox) — run signed-out instead of crashing.
      if (active) setLoading(false);
    }

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  const user: User | null = session?.user ?? null;
  return { session, user, userId: user?.id ?? null, loading };
}

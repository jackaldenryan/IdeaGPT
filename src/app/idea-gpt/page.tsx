// src/app/idea-gpt/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import IdeaGenerationUI from "@/components/chat/IdeaGenerationUI";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient";
import { User } from "@supabase/supabase-js";

export default function IdeasAppPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/sign-in"); // Redirect to sign-in if no session
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          router.push("/sign-in"); // Redirect to sign-in if logged out
        } else {
          setUser(session.user);
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return <div></div>;
  }

  // If user exists, render the IdeaGenerationUI component
  return user ? <IdeaGenerationUI /> : null;
}

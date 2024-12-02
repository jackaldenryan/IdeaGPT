// src/hoc/withAuth.tsx

"use client"; // Mark as a Client Component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated import for Next.js 13
import { supabase } from '../supabaseClient';
import { User } from '@supabase/supabase-js'; // Import the User type

// Define a generic type for the wrapped component's props
type WithAuthProps = Record<string, unknown>;

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
      const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/sign-in'); // Redirect to sign-in if no session
        } else {
          setUser(session.user);
        }
        setLoading(false);
      };

      checkUser();

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (!session) {
            router.push('/sign-in'); // Redirect to sign-in if logged out
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
      return <div>Loading...</div>; // You can replace this with a better loading indicator
    }

    // If user exists, render the wrapped component
    return user ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;

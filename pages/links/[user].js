"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (router.query.user) {
      const getUser = async () => {
        try {
          const response = await fetch(
            `/api/user?user_id=${router.query.user}`,
          );
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      getUser();
    }
  }, [router.query.user]);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
    </div>
  );
}

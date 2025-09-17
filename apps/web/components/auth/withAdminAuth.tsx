"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function withAdminAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithAdminAuth = (props: P) => {
    const router = useRouter();
    const { user, isLoading } = useAuth();

    useEffect(() => {
      if (isLoading) return;

      if (!user || user.role !== "Admin") router.push("/");
    }, [user, isLoading, router]);

    if (isLoading || !user || user.role !== "Admin")
      return <div>Loading...</div>;

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAdminAuth;
}

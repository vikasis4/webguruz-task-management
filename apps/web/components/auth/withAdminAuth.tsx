"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/store.hppks";

export default function withAdminAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithAdminAuth = (props: P) => {
    const router = useRouter();

    const authData = useAppSelector((state) => state.authSlice);

    useEffect(() => {
      if (!authData.isAuthenticated || authData.user?.role !== "admin")
        router.push("/");
    }, [authData, router]);

    if (!authData.isAuthenticated || authData.user?.role !== "admin")
      return null;

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAdminAuth;
}

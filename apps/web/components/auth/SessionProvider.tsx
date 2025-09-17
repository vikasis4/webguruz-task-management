"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosClient from "@/utils/axios";
import { authActions } from "@/modules/auth/api/auth.slice";
import { useAppSelector } from "@/store/store.hppks";
import { usePathname, useRouter } from "next/navigation";
import Loader from "../ui/Loader";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = useAppSelector(
    (state) => state.authSlice.isAuthenticated
  );
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated && pathname.includes("auth")) router.push("/dashboard");
  }, [isAuthenticated, pathname, router]);

  useEffect(() => {
    const verifyUserSession = async () => {
      try {
        const response = await axiosClient.get("/auth/verify");

        if (response.data && response.data.status == 200)
          dispatch(authActions.setUser(response.data.user));
      } catch (error) {
        console.error("Session verification failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUserSession();
  }, [dispatch]);

  if (isLoading) return <Loader />;

  return <>{children}</>;
}

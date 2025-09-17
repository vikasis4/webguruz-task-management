"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/store.hppks";
import { useRouter } from "next/navigation";
import React from "react";
import useLogout from "@/utils/logout";

export default function Navbar() {
  const isAuthenticated = useAppSelector(
    (state) => state.authSlice.isAuthenticated
  );
  const router = useRouter();
  const logout = useLogout();

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-50">
        <Link href="/">
          <h1 className="text-xl font-bold">TaskMaster</h1>
        </Link>
        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard/tasks">
                <Button variant="outline">Tasks</Button>
              </Link>

              <Button onClick={logout} variant={"destructive"}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => router.push("/auth/login")}
                variant="outline"
              >
                Login
              </Button>

              <Button onClick={() => router.push("/auth/signup")}>
                Sign Up
              </Button>
            </>
          )}
        </nav>
      </header>
    </>
  );
}

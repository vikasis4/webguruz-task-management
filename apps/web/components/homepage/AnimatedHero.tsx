"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAppSelector } from "@/store/store.hppks";

export default function AnimatedHero() {
  const authData = useAppSelector((state) => state.authSlice);

  const isAuthenticated = authData.isAuthenticated;
  const isAdmin = authData.user?.role === "admin";

  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center bg-gradient-to-b from-gray-50 to-white">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-extrabold mb-4"
      >
        Organize. Track. Achieve.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8"
      >
        Manage your tasks, collaborate with your team, and stay productive with
        TaskMaster.
      </motion.p>
      <div className="flex gap-4">
        {isAuthenticated ? (
          <div className="flex gap-4">
            {isAdmin && (
              <Link href="/dashboard/users">
                <Button size="lg">View Users</Button>
              </Link>
            )}
            <Link href="/dashboard/tasks">
              <Button variant={"outline"} size="lg">
                View Tasks
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <Link href="/auth/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

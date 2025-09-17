"use client";

import { useState } from "react";
import userApi from "../api/user.api";
import { IUser } from "@repo/dto/modules/user";
import { Users } from "lucide-react";
import SearchFilter from "./UserSearchFilter";
import StatsCards from "./UserStatsCard";
import UsersGrid from "./UserGrid";

function UsersList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");

  const { data, isLoading } = userApi.useFetchUsersQuery("");

  const filteredUsers =
    data?.data?.users?.filter((user: IUser) => {
      const matchesSearch = user.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "active" && user.isActive) ||
        (filterStatus === "inactive" && !user.isActive);
      return matchesSearch && matchesFilter;
    }) || [];

  const activeUsersCount =
    data?.data?.users?.filter((u: IUser) => u.isActive).length || 0;
  const totalUsers = data?.data?.users?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6 max-w-6xl">
        <Header />
        <StatsCards activeUsers={activeUsersCount} totalUsers={totalUsers} />
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <UsersGrid users={filteredUsers} isLoading={isLoading} />
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
export default UsersList;

export function Header() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white">
          <Users className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage user accounts and permissions
          </p>
        </div>
      </div>
    </div>
  );
}

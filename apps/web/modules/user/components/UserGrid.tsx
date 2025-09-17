import { Card, CardContent } from "@/components/ui/card";
import UserCard from "./UserCard";
import { Loader2, Users } from "lucide-react";
import { IUser } from "@repo/dto/modules/user";

interface UsersGridProps {
  users: IUser[];
  isLoading: boolean;
}

function UsersGrid({ users, isLoading }: UsersGridProps) {
  if (isLoading) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p className="text-gray-600">Loading users...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!users.length) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-500">No users available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {users.map((user, index) => (
        <UserCard key={user._id} user={user} index={index} />
      ))}
    </div>
  );
}

export default UsersGrid;

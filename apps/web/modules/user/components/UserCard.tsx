import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@radix-ui/react-label";
import { IUser } from "@repo/dto/modules/user";
import { Loader2, Mail, MoreVertical } from "lucide-react";
import userApi from "../api/user.api";

interface UserCardProps {
  user: IUser;
  index: number;
}

function UserCard({ user, index }: UserCardProps) {
  const [updateStatus, { isLoading }] = userApi.useUpdateUserStatusMutation();

  return (
    <Card
      className="group bg-white/70 backdrop-blur-sm border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      style={{
        animationName: "fadeInUp",
        animationDuration: "0.6s",
        animationTimingFunction: "ease-out",
        animationFillMode: "forwards",
        animationDelay: `${index * 100}ms`,
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge
                  variant={user.isActive ? "default" : "secondary"}
                  className={`${
                    user.isActive
                      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                      : "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <div className="text-xs">
                  Last active: {user.updatedAt.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label
                htmlFor={`status-${user._id}`}
                className="text-sm font-medium"
              >
                Active
              </Label>
              <Switch
                id={`status-${user._id}`}
                checked={user.isActive}
                disabled={isLoading}
                onCheckedChange={() =>
                  updateStatus({ userId: user._id, isActive: !user.isActive })
                }
                className="data-[state=checked]:bg-emerald-500"
              />
              {isLoading && (
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserCard;

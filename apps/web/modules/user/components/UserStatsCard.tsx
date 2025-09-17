import { Card, CardContent } from "@/components/ui/card";
import { UserCheck, Users, UserX } from "lucide-react";

interface StatsProps {
  activeUsers: number;
  totalUsers: number;
}

export function StatsCards({ activeUsers, totalUsers }: StatsProps) {
  const inactiveUsers = totalUsers - activeUsers;

  const cards = [
    {
      label: "Active Users",
      count: activeUsers,
      icon: <UserCheck className="h-8 w-8 text-emerald-100" />,
      bg: "from-emerald-500 to-teal-600",
    },
    {
      label: "Inactive Users",
      count: inactiveUsers,
      icon: <UserX className="h-8 w-8 text-orange-100" />,
      bg: "from-orange-500 to-red-600",
    },
    {
      label: "Total Users",
      count: totalUsers,
      icon: <Users className="h-8 w-8 text-purple-100" />,
      bg: "from-purple-500 to-indigo-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => (
        <Card
          key={card.label}
          className={`bg-gradient-to-r ${card.bg} text-white border-0`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">
                  {card.label}
                </p>
                <p className="text-2xl font-bold">{card.count}</p>
              </div>
              {card.icon}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default StatsCards;

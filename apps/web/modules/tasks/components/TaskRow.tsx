import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Pause,
} from "lucide-react";

interface TaskRowProps {
  task: any;
  selected: boolean;
  toggleSelection: () => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return <AlertTriangle className="h-3 w-3" />;
    case "medium":
      return <Clock className="h-3 w-3" />;
    case "low":
      return <Circle className="h-3 w-3" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "in progress":
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "paused":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusIcon = (status: string) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return <CheckCircle2 className="h-3 w-3" />;
    case "in progress":
    case "in-progress":
      return <Clock className="h-3 w-3" />;
    case "pending":
      return <Circle className="h-3 w-3" />;
    case "paused":
      return <Pause className="h-3 w-3" />;
    default:
      return null;
  }
};

const formatDueDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const compareDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const compareToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const compareTomorrow = new Date(
    tomorrow.getFullYear(),
    tomorrow.getMonth(),
    tomorrow.getDate()
  );

  if (compareDate.getTime() === compareToday.getTime()) {
    return { text: "Today", isOverdue: false, isToday: true };
  } else if (compareDate.getTime() === compareTomorrow.getTime()) {
    return { text: "Tomorrow", isOverdue: false, isToday: false };
  } else if (compareDate < compareToday) {
    return { text: date.toLocaleDateString(), isOverdue: true, isToday: false };
  } else {
    return {
      text: date.toLocaleDateString(),
      isOverdue: false,
      isToday: false,
    };
  }
};

export default function TaskRow({
  task,
  selected,
  toggleSelection,
}: TaskRowProps) {
  const dueDateInfo = task.dueDate ? formatDueDate(task.dueDate) : null;

  return (
    <tr
      className={`
        border-b border-gray-100 transition-all duration-200 hover:bg-gray-50/50
        ${selected ? "bg-blue-50/50 hover:bg-blue-50" : ""}
      `}
    >
      <td className="p-4">
        <Checkbox
          checked={selected}
          onCheckedChange={toggleSelection}
          className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
        />
      </td>

      <td className="p-4">
        <div className="font-medium text-gray-900 truncate max-w-xs">
          {task.title || "Untitled Task"}
        </div>
      </td>

      <td className="p-4">
        <Badge
          variant="outline"
          className={`${getPriorityColor(task.priority)} font-medium text-xs flex items-center gap-1 w-fit`}
        >
          {getPriorityIcon(task.priority)}
          {task.priority
            ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
            : "None"}
        </Badge>
      </td>

      <td className="p-4">
        <Badge
          variant="outline"
          className={`${getStatusColor(task.status)} font-medium text-xs flex items-center gap-1 w-fit`}
        >
          {getStatusIcon(task.status)}
          {task.status
            ? task.status.charAt(0).toUpperCase() + task.status.slice(1)
            : "Unknown"}
        </Badge>
      </td>

      <td className="p-4">
        {dueDateInfo ? (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span
              className={`text-sm font-medium ${
                dueDateInfo.isOverdue
                  ? "text-red-600"
                  : dueDateInfo.isToday
                    ? "text-blue-600"
                    : "text-gray-700"
              }`}
            >
              {dueDateInfo.text}
            </span>
            {dueDateInfo.isOverdue && (
              <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                Overdue
              </Badge>
            )}
          </div>
        ) : (
          <span className="text-gray-400 text-sm">No due date</span>
        )}
      </td>
    </tr>
  );
}

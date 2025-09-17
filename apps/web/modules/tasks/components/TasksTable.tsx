import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import TaskRow from "./TaskRow";

interface TasksTableProps {
  tasks: any[];
  isLoading: boolean;
  selectedTasks: Set<string>;
  toggleTaskSelection: (id: string) => void;
  toggleSelectAll: (ids: string[], checked: boolean) => void;
  totalTasks: number;
}

export default function TasksTable({
  tasks,
  isLoading,
  selectedTasks,
  totalTasks,
  toggleTaskSelection,
  toggleSelectAll,
}: TasksTableProps) {
  const allChecked =
    tasks.length > 0 && tasks.every((task) => selectedTasks.has(task._id));
  const someChecked = selectedTasks.size > 0 && !allChecked;

  return (
    <Card className="bg-white/80 backdrop-blur-md shadow-xl border-0 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
            <Badge variant="secondary" className="text-xs">
              {totalTasks} total
            </Badge>
            {selectedTasks.size > 0 && (
              <Badge
                variant="default"
                className="text-xs bg-blue-100 text-blue-800"
              >
                {selectedTasks.size} selected
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="p-4 w-12">
                  <Checkbox
                    checked={someChecked ? "indeterminate" : allChecked}
                    onCheckedChange={(checked) =>
                      toggleSelectAll(
                        tasks.map((t) => t._id),
                        !!checked
                      )
                    }
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                </th>
                <th className="p-4 text-left font-medium text-gray-700">
                  Title
                </th>
                <th className="p-4 text-left font-medium text-gray-700">
                  Priority
                </th>
                <th className="p-4 text-left font-medium text-gray-700">
                  Status
                </th>
                <th className="p-4 text-left font-medium text-gray-700">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
                      Loading tasks...
                    </div>
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <CalendarDays className="h-8 w-8 text-gray-400" />
                      <p className="text-lg font-medium">No tasks found</p>
                      <p className="text-sm">
                        Create your first task to get started
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                tasks.map((task, idx) => (
                  <TaskRow
                    key={task._id}
                    task={task}
                    selected={selectedTasks.has(task._id)}
                    toggleSelection={() => toggleTaskSelection(task._id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

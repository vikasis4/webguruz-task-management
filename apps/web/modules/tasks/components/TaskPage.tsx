"use client";

import { useState } from "react";

export default function TasksPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());

  const { data, isLoading } = taskApi.useFetchTasksQuery({
    page: currentPage,
    limit: 5,
  });

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks((prev) => {
      const updated = new Set(prev);
      if (updated.has(taskId)) updated.delete(taskId);
      else updated.add(taskId);
      return updated;
    });
  };

  const toggleSelectAll = (tasks: string[], checked: boolean) => {
    setSelectedTasks((prev) => {
      const updated = new Set(prev);
      tasks.forEach((id) => {
        if (checked) updated.add(id);
        else updated.delete(id);
      });
      return updated;
    });
  };

  const [updateTaskStatus, { isLoading: isUpdatingTaskStatus }] =
    taskApi.useUpdateTasksStatusMutation();

  const bulkUpdateStatus = async (status: string) => {
    console.log(status, Array.from(selectedTasks));
    const payload = {
      status,
      taskIds: Array.from(selectedTasks),
    };
    const result = await updateTaskStatus(payload);
    toast.success(result?.data?.message || "Updated status successful");
    setSelectedTasks(new Set());
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <TasksHeader
        selectedCount={selectedTasks.size}
        bulkUpdateStatus={bulkUpdateStatus}
        isUpdatingTaskStatus={isUpdatingTaskStatus}
      />

      <TasksTable
        tasks={data?.data?.tasks || []}
        isLoading={isLoading}
        selectedTasks={selectedTasks}
        toggleTaskSelection={toggleTaskSelection}
        toggleSelectAll={toggleSelectAll}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={data?.data.totalPages || 1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

import { Button } from "@/components/ui/button";
import TasksTable from "./TasksTable";
import Pagination from "./Pagination";
import taskApi from "../api/task.api";
import { toast } from "sonner";

interface TasksHeaderProps {
  selectedCount: number;
  bulkUpdateStatus: (status: string) => void;
  isUpdatingTaskStatus: boolean;
}

function TasksHeader({
  selectedCount,
  bulkUpdateStatus,
  isUpdatingTaskStatus,
}: TasksHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">Task Management</h1>
      <div className="flex items-center gap-2">
        {isUpdatingTaskStatus && <h6>Updating...</h6>}
        {selectedCount > 0 && (
          <>
            <span className="text-gray-600">{selectedCount} selected</span>
            <Button onClick={() => bulkUpdateStatus("pending")}>Pending</Button>
            <Button onClick={() => bulkUpdateStatus("in-progress")}>
              In Progress
            </Button>
            <Button onClick={() => bulkUpdateStatus("completed")}>
              Completed
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

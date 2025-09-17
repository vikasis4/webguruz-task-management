import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Search } from "lucide-react";

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  filterStatus: "all" | "active" | "inactive";
  setFilterStatus: (v: "all" | "active" | "inactive") => void;
}

function SearchFilter({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white/70 backdrop-blur-sm border-gray-200 focus:bg-white transition-all"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-lg p-1 border border-gray-200">
          {["all", "active", "inactive"].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "ghost"}
              size="sm"
              onClick={() =>
                setFilterStatus(status as "all" | "active" | "inactive")
              }
              className="text-xs"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="bg-white/70 backdrop-blur-sm"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default SearchFilter;

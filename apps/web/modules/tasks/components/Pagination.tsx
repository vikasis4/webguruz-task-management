import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex gap-2 justify-center mt-4">
      {pages.map((p) => (
        <Button
          key={p}
          variant={currentPage === p ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(p)}
        >
          {p}
        </Button>
      ))}
    </div>
  );
}

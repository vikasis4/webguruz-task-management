"use client";

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getVisiblePages = (currentPage: number, totalPages: number) => {
  const pages: (number | string)[] = [];
  const maxButtons = 5;

  pages.push(1);

  if (currentPage > Math.floor(maxButtons / 2) + 1 && totalPages > maxButtons) {
    pages.push("...");
  }

  let start = Math.max(2, currentPage - Math.floor(maxButtons / 2));
  let end = Math.min(totalPages - 1, currentPage + Math.floor(maxButtons / 2));
  if (totalPages <= maxButtons) {
    start = 2;
    end = totalPages - 1;
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (
    currentPage < totalPages - Math.floor(maxButtons / 2) &&
    totalPages > maxButtons
  ) {
    pages.push("...");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return [...new Set(pages)];
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <ShadcnPagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (currentPage === 1) return;
              onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        {visiblePages.map((p, index) => (
          <PaginationItem key={index}>
            {typeof p === "string" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={currentPage === p}
                onClick={() => onPageChange(p)}
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (currentPage === totalPages) return;
              onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}

import React from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import type { TransactionsPaginationType } from '@/features/transactions/types/transaction.types';

type PropsType = {
  page: number;
  setPage: (page: number) => void;
  data?: TransactionsPaginationType;
};

const TransactionsPagination: React.FC<PropsType> = ({ setPage, page, data }) => {
  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          />
        </PaginationItem>
        {Array.from({ length: data?.totalPages ?? 0 }, (_, index) => index + 1).map(
          (pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                isActive={pageNumber === page}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(pageNumber);
                }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();

              if (page < (data?.totalPages ?? 1)) {
                setPage(page + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default React.memo(TransactionsPagination);

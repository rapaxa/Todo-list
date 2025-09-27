import { Pagination, Stack } from '@mui/material';
import { PAGE_SIZE } from '@/common/constants';
import type { ChangeEvent } from 'react';
import { useAppDispatch } from '@/common/hooks';
import { setCurrentPage } from '@/app/model/app-slice.ts';

interface Props {
  totalCount: number;
  currentPage: number;
  todolistId: string;
  onChange?: (num: number) => void;
}

export const BasicPagination = ({ totalCount, currentPage, onChange, todolistId }: Props) => {
  const dispatch = useAppDispatch();
  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage({ id: todolistId, page: value }));
    onChange?.(value);
  };

  const pageCount = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <Stack spacing={2} alignItems="center" width="100%">
      <Pagination count={pageCount} page={currentPage} onChange={handleChange} color="primary" />
    </Stack>
  );
};

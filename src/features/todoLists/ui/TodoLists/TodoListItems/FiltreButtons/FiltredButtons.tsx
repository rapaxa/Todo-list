import { Button, ButtonGroup } from '@mui/material';

import { useState } from 'react';
import { useChangeFilter } from '@/common/hooks/todolistHooks/useChangeFilter.ts';
import type { FilterValues } from '@/features/todoLists/lib/types';

export const FilterButtons = ({ id }: { id: string }) => {
  const changeFilter = useChangeFilter();
  const [activeButton, setActiveButton] = useState<FilterValues>('all');

  const handleClick = (filter: FilterValues) => {
    changeFilter(id, filter);
    setActiveButton(filter);
  };

  return (
    <ButtonGroup sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Button
        onClick={() => handleClick('all')}
        variant={activeButton === 'all' ? 'contained' : 'outlined'}
      >
        All
      </Button>
      <Button
        onClick={() => handleClick('active')}
        variant={activeButton === 'active' ? 'contained' : 'outlined'}
      >
        Active
      </Button>
      <Button
        onClick={() => handleClick('completed')}
        variant={activeButton === 'completed' ? 'contained' : 'outlined'}
      >
        Completed
      </Button>
    </ButtonGroup>
  );
};

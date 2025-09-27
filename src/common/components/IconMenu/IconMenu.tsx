import { Paper, MenuList, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import type { ReactNode } from 'react';

export const IconMenu = ({ items, onClose, styleSX }: PropsType) => {
  return (
    <Paper sx={styleSX}>
      <MenuList onMouseLeave={() => onClose()}>
        {items?.map(({ label, icon: Icon, onClick }, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              onClick?.();
              onClose();
            }}
          >
            {Icon && <ListItemIcon>{Icon}</ListItemIcon>}
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
};

interface MenuItemType {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
}
interface PropsType {
  items: MenuItemType[];
  onClose: () => void;
  styleSX?: object;
}

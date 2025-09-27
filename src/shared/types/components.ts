import type { ReactNode } from 'react';

export interface ProtectedRouteProps {
  children: ReactNode;
}

export interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: string;
}

export interface CaptchaProps {
  url: string;
}

export interface MenuItemType {
  name: string;
  callback: () => void;
}

export interface IconMenuProps {
  menuItems: MenuItemType[];
}

export interface EditableSpanProps {
  value: string;
  callback: (newValue: string) => void;
  className?: string;
}

export interface FontAwesomeSvgIconProps {
  icon: string;
  color?: string;
}

export interface CreateItemFormProps {
  callback: (title: string) => void;
  entityStatus?: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export interface BasicPaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export interface TodoTitleProps {
  id: string;
  title: string;
}

export interface TaskProps {
  id: string;
  title: string;
  isDone: boolean;
  todolistId: string;
}
import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router';
import { Path } from '@/common/routing/Path.ts';

export const ProtectedRoute = ({ redirectPath = Path.Login, children, isAllowed }: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />;
  }
  return children ? children : <Outlet />;
};

interface Props {
  children?: ReactNode;
  isAllowed: boolean;
  redirectPath?: string;
}

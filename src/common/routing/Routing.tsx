import { Route, Routes } from 'react-router';
import { Main } from '@/app/ui/Main.tsx';
import { Login } from '@/features/auth/ui/Login/Login';
import { useAppSelector } from '@/common/hooks/commonHooks/useAppSelector.ts';
import { Path } from '@/common/routing/Path.ts';
import { selectIsLoggedIn } from '@/app/model/app-slice.ts';
import { PageNotFound, ProtectedRoute } from '@/common/components';

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} redirectPath={Path.Login} />}>
        <Route path={Path.Main} element={<Main />} />
      </Route>
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  );
};

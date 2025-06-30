import AlarmIcon from '@mui/icons-material/Alarm';
import s from './Header.module.css';
import { Button, Switch } from '@mui/material';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { changeThemeMode, selectThemeMode } from '@/app/app-slice.ts';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';

export const Header = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectThemeMode);

  const onThemeToggle = () => {
    dispatch(changeThemeMode());
  };
  return (
    <header className={s.header}>
      <div className={'container'}>
        <div className={s.header__wrapper}>
          <a className={s.header__logo}>
            <AlarmIcon />
          </a>
          <div className={s.header__actions}>
            <div className={s.header__theme__toggle}>
              <Switch
                value={currentTheme}
                onChange={onThemeToggle}
                defaultChecked
                color="secondary"
              />
            </div>

            <div className={s.header__auth}>
              <Button variant="outlined"> Sign In</Button>
              <Button variant="contained">Sign Up</Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

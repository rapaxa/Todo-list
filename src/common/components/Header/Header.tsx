import AlarmIcon from '@mui/icons-material/Alarm';
import s from './Header.module.css';
import { Button, Switch } from '@mui/material';
import { useState } from 'react';

type Theme = 'light' | 'dark';
export const Header = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const onThemeToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
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
              <label>{theme}</label>
              <Switch value={theme} onChange={onThemeToggle} defaultChecked color="secondary" />
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

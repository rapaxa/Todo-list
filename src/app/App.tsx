import { Main } from '@/app/Main.tsx';
import s from './App.module.css';
import { Header } from '@/common/components/Header/Header.tsx';

const App = () => {
  return (
    <div className={s.App}>
      <Header />
      <Main />
    </div>
  );
};

export default App;

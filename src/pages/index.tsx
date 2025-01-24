import { Playground } from '../features/playground/Playground';
import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Playground />
    </div>
  );
};

export default Home;

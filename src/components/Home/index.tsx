import { useRecoilValue } from "recoil";

// Components
import News from "../News";

// Atoms
import { userDataState } from "../../atoms/user";

// Style
import styles from "./styles.module.scss";

const Home = () => {
  const firstname = useRecoilValue(userDataState).firstname;

  return (
    <div className={styles.__home}>
      <h1>{`Bonjour ${firstname}`},</h1>
      <br />
      <h2>TODO LIST:</h2>
      <p>Plusieurs section avec infos rapide</p>
      <p>NEWS Internes</p>
      <p>Infos Contact</p>
      <p>Calendrier petit format</p>
      <p>...</p>

      <News />
    </div>
  );
};

export default Home;

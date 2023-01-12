import { useState } from "react";
import { useRecoilValue } from "recoil";
import Calendar from "react-calendar";

// Components
import News from "../News";

// Atoms
import { userDataState } from "../../atoms/user";

// Components
import WelcomeBanner from "../WelcomeBanner";
import QuickContact from "../QuickContact";
import UsefulInfo from "../UsefulInfo";

// Style
import styles from "./styles.module.scss";

const Home = () => {
  const firstname = useRecoilValue(userDataState).firstname;
  const role = useRecoilValue(userDataState).role;
  const [value, onChange] = useState(new Date());

  return (
    <div className={styles.__home}>
      <h1>{`Bonjour ${firstname}`},</h1>
      <div className={styles.__multi_sections}>
        {role === "Manager" ? (
          <>
          <p>A remplir d'infos rapide...</p>
          </>
        ) : (
          <>
            <div>
              <WelcomeBanner />
              <br />
              <UsefulInfo />
            </div>
            <Calendar
              className={styles.__calendar}
              locale={"fr-FR"}
              onChange={onChange}
              value={value}
            />
            <News />
            <QuickContact />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

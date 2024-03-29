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

// Types
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Home = () => {
  const firstname = useRecoilValue(userDataState).firstname;
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className={styles.__home}>
      <h1>{`Bonjour ${firstname}`},</h1>
      <div className={styles.__multi_sections}>
        <div>
          <WelcomeBanner />
          
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
      </div>
    </div>
  );
};

export default Home;

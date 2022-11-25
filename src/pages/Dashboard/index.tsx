import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

// Components
import MiniProfile from "../../components/MiniProfile";
import SideMenu from "../../components/SideMenu";
import Navbar from "../../components/Navbar";

// Styles
import styles from "../../styles/pages/dashboard.module.scss";

// Atoms
import { tokenState, userDataState } from "../../atoms/user";

const Dashboard = () => {
  const navigateTo = useNavigate();
  const token = useRecoilValue(tokenState);
  const userData = useRecoilValue(userDataState);
  const { firstname, lastname, email, job } = userData;
  console.log("userData", userData);

  if(!token){
    navigateTo("/connexion"); // Replace by private route !
  }

  return (
    <div className={styles.__dashboard}>
      <section className={styles.__header}>
        <Navbar />
      </section>
      <section className={styles.__side_menu}>
        <MiniProfile firstname={firstname} lastname={lastname} email={email} job={job} />
        <hr />
        <SideMenu />
      </section>
      <section className={styles.__view}>
        <div className={styles.__content}>
          <span className={styles.__rounded}></span>
          <h3>...Content...</h3>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

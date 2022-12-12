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
import { useState } from "react";

const Dashboard = () => {
  const navigateTo = useNavigate();
  const token = useRecoilValue(tokenState);
  const userData = useRecoilValue(userDataState);
  const { firstname, lastname, email, job } = userData;
  console.log("userData", userData);
  const [currentPage, setCurrentPage] = useState();

  console.log("TOKEN", token);
  if(token === null){
    navigateTo("/connexion"); // Replace by private route !
  }

  return (
    <div className={styles.__dashboard}>
      <section className={styles.__header}>
        <Navbar setCurrentPage={setCurrentPage}/>
      </section>
      <section className={styles.__side_menu}>
        <MiniProfile firstname={firstname} lastname={lastname} email={email} job={job} />
        <hr />
        <SideMenu setCurrentPage={setCurrentPage} />
      </section>
      <section className={styles.__view}>
        <div className={styles.__content}>
          <span className={styles.__rounded}></span>
          {currentPage}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

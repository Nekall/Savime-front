// Styles
import styles from "./styles.module.scss";

interface MiniProfileProps {
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  job: string | null;
}

const MiniProfile = ({ firstname, lastname, email, job }: MiniProfileProps ) => {
  return (
    <div className={styles.__mini_profile}>
      <div className={styles.__profile_picture}></div>
      <p className={styles.__names}>{`${firstname} ${lastname}`}</p>
      <p className={styles.__adress_mail}>{email}</p>
      <p className={styles.__adress_mail}>{job}</p>
    </div>
  );
};

export default MiniProfile;

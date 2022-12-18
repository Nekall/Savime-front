import { Link } from "react-router-dom";

// Assets
import error404 from "../../assets/images/error-404.webp";

// Styles
import styles from "../../styles/pages/error.module.scss";

const Error = () => {
  return (
    <div className={styles.__error}>
      <div className={styles.__container}>
        <img src={error404} alt="Logo erreur 404" />
        <h1>La page que vous recherchez semple introuvable.</h1>
        <Link to={"/"}>Retourner sur la page d'accueil</Link>
      </div>
    </div>
  );
};

export default Error;

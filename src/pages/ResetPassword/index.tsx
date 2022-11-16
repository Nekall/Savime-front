// Styles
import styles from "../../styles/pages/resetPassword.module.scss";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";

// Components
import Input from "../../components/Input";
import Link from "../../components/Link";
import Wrapper from "../../components/Wrapper";

const ResetPassword = () => {
  fetch(``)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

  return (
    <div className={styles.__reset_password}>
      <Wrapper position={"center"}>
        <img className={styles.__avatar} src={avatar} alt="avatar" />
        <Input type={"password"} placeholder={"Nouveau mot de passe"} />
        <Input type={"password"} placeholder={"Confirmation du mot de passe"} />
        <Input type={"submit"} value={"Réinitialiser mon mot de passe"} />
        <Link name={"Retour à l'accueil"} target={"/"} />
      </Wrapper>
    </div>
  );
};

export default ResetPassword;

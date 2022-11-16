// Styles
import styles from "../../styles/pages/forgotPassword.module.scss";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";

// Components
import Input from "../../components/Input";
import Link from "../../components/Link";
import Wrapper from "../../components/Wrapper";

const ForgotPassword = () => {
  fetch(``)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

  return (
    <div className={styles.__forgot_password}>
      <Wrapper position={"center"}>
        <img className={styles.__avatar} src={avatar} alt="avatar" />
        <Input type={"email"} placeholder={"email@email.com"} />
        <Input
          type={"submit"}
          value={"Demande de réinitialisation de mon mot de passe"}
        />
        <Link name={"Retour à l'accueil"} target={"/"} />
      </Wrapper>
    </div>
  );
};

export default ForgotPassword;

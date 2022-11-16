// Styles
import styles from "../../styles/pages/login.module.scss";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";

// Components
import Input from "../../components/Input";
import Link from "../../components/Link";
import Wrapper from "../../components/Wrapper";

const Login = () => {
  fetch(``)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

  return (
    <div className={styles.__login}>
      <Wrapper position={"right"}>
        <img className={styles.__avatar} src={avatar} alt="avatar" />
        <Input type={"email"} placeholder={"email@email.com"} />
        <Input type={"password"} placeholder={"Mot de passe"} />
        <Input type={"submit"} value={"Connexion"} />
        <Link name={"Pas encore de compte ?"} target={"/inscription"} />
        <Link
          name={"J'ai perdu mon mot de passe"}
          target={"/mot-de-passe-oublie"}
        />
      </Wrapper>
    </div>
  );
};

export default Login;

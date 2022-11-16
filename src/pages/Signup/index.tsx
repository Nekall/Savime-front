// Components
import Wrapper from "../../components/Wrapper";
import Input from "../../components/Input";
import Link from "../../components/Link";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";

// Styles
import styles from "../../styles/pages/signup.module.scss";

const Signup = () => {
  fetch(``)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

  return (
    <div className={styles.__signup}>
      <Wrapper position={"left"}>
        <img className={styles.__avatar} src={avatar} alt="avatar" />
        <Input type={"email"} placeholder={"email@email.com"} />
        <Input type={"password"} placeholder={"Mot de passe"} />
        <Input type={"password"} placeholder={"Confirmation du mot de passe"} />
        <Input type={"submit"} value={"Inscription"} />
        <Link name={"J'ai déjà un compte !"} target={"/connexion"} />
      </Wrapper>
    </div>
  );
};

export default Signup;

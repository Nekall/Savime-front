import { useState } from "react";

// Styles
import styles from "../../styles/pages/login.module.scss";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";

// Components
import Input from "../../components/Input";
import Link from "../../components/Link";
import Wrapper from "../../components/Wrapper";

console.log(process.env.REACT_APP_BACKEND_URL)

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log(email, password);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/employees/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // localStorage.setItem("token", data.token);
    })
    .catch((err) => console.error(err));
  }


  return (
    <div className={styles.__login}>
      <Wrapper position={"right"}>
        <img className={styles.__avatar} src={avatar} alt="avatar" />
        <Input type={"email"} placeholder={"email@email.com"} value={email} onChange={(e: any)=>setEmail(e.currentTarget.value)}/>
        <Input type={"password"} placeholder={"Mot de passe"} value={password} onChange={(e: any)=>setPassword(e.currentTarget.value)}/>
        <Input onClick={()=>login()} type={"submit"} value={"Connexion"} />
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

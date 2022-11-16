import { useState } from "react";

// Components
import Wrapper from "../../components/Wrapper";
import Input from "../../components/Input";
import Link from "../../components/Link";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";

// Styles
import styles from "../../styles/pages/signup.module.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

    const signup = () => {
      console.log(email, password);
  
      fetch(`${process.env.REACT_APP_BACKEND_URL}/employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, confirmPassword }),
  })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // redirect to login
      })
      .catch((err) => console.error(err));
    }

  return (
    <div className={styles.__signup}>
      <Wrapper position={"left"}>
        <img className={styles.__avatar} src={avatar} alt="avatar" />
        <Input type={"email"} placeholder={"email@email.com"} value={email} onChange={(e: any)=>setEmail(e.currentTarget.value)}/>
        <Input type={"password"} placeholder={"Mot de passe"} value={password} onChange={(e: any)=>setPassword(e.currentTarget.value)}/>
        <Input type={"password"} placeholder={"Confirmation du mot de passe"} value={confirmPassword} onChange={(e: any)=>setConfirmPassword(e.currentTarget.value)} />
        <Input onClick={()=>signup()} type={"submit"} value={"Inscription"} />
        <Link name={"J'ai déjà un compte !"} target={"/connexion"} />
      </Wrapper>
    </div>
  );
};

export default Signup;

import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

// Styles
import styles from "../../styles/pages/login.module.scss";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";

// Components
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Link from "../../components/Link";

// Helpers
import { loginValidators } from "../../helpers/validators";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({
    noErrors: false,
    email: "",
    password: "",
  });
  const navigateTo = useNavigate();

  const login = () => {
    setErrors(loginValidators({ email, password }));
    if (errors.noErrors) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/${checked? "managers" : "employees"}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
          // localStorage.setItem("token", data.token);
          // redux store
          toast.success('Vous êtes connecté !', {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            });
            navigateTo('/tableau-de-bord')
          }else{
            toast.error(data.message, {
              position: "bottom-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
              });
          }
        })
        .catch((err) => {
          console.error(err)
          toast.error('Une erreur est survenue...', {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            });
        });
    }
  };

  console.log('OUT', errors)


  return (
    <div className={styles.__login}>
      <Header />
      <Wrapper position={"right"}>
        <img className={styles.__avatar} src={avatar} alt="avatar" />
        <Input
          error={errors.noErrors && errors.email ? false : errors.email}
          type={"email"}
          placeholder={"email@email.com"}
          value={email}
          onChange={(e: any) => setEmail(e.currentTarget.value)}
        />
        <Input
          error={errors.noErrors && errors.password ? false : errors.password}
          type={"password"}
          placeholder={"Mot de passe"}
          value={password}
          onChange={(e: any) => setPassword(e.currentTarget.value)}
        />
        <div className={styles.__switch}>
          <p>Connexion à un compte RH </p>
          <input
            type="checkbox"
            id="switch"
            defaultChecked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label htmlFor="switch"></label>
        </div>
        <Input onClick={() => login()} type={"submit"} value={"Connexion"} />
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

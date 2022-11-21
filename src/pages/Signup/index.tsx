import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

// Components
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Link from "../../components/Link";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";

// Styles
import styles from "../../styles/pages/signup.module.scss";

// Helpers
import { signUpValidators } from "../../helpers/validators";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    noErrors: false,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const navigateTo = useNavigate();


  const signup = () => {
    setErrors(
      signUpValidators({
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
      })
    );
    if (errors.noErrors) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          confirmPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            toast.success('Votre compte a bien été créé !', {
              position: "bottom-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
              });
              navigateTo('/connexion')
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

  return (
    <div className={styles.__signup}>
      <Header />
      <Wrapper position={"left"}>
        <img className={styles.__avatar} src={avatar} alt="avatar" />
        <Input
          error={errors.noErrors && errors.firstname ? false : errors.firstname}
          icon={avatar}
          alt={"avatar"}
          type={"text"}
          placeholder={"Prénom"}
          value={firstname}
          onChange={(e: any) => setFirstname(e.currentTarget.value)}
        />
        <Input
          error={errors.noErrors && errors.lastname ? false : errors.lastname}
          icon={avatar}
          alt={"avatar"}
          type={"text"}
          placeholder={"Nom"}
          value={lastname}
          onChange={(e: any) => setLastname(e.currentTarget.value)}
        />
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
        <Input
          error={errors.noErrors && errors.password ? false : errors.password}
          type={"password"}
          placeholder={"Confirmation du mot de passe"}
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.currentTarget.value)}
        />
        <Input onClick={() => signup()} type={"submit"} value={"Inscription"} />
        <Link name={"J'ai déjà un compte !"} target={"/connexion"} />
      </Wrapper>
    </div>
  );
};

export default Signup;

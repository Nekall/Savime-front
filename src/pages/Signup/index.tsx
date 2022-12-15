import validator from "validator";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Components
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Link from "../../components/Link";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";
import envelope from "../../assets/images/icon/envelope.svg";
import lock from "../../assets/images/icon/lock.svg";

// Styles
import styles from "../../styles/pages/signup.module.scss";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastname, setLastname] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigateTo = useNavigate();

  const signup = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setFirstnameError(validator.isEmpty(firstname)? "Prénom obligatoire." : validator.isLength(firstname, { min: 2, max: 20 }) ? "" : "Le prénom doit contenir entre 2 et 20 caractères.");
    setLastnameError(validator.isEmpty(lastname)? "Nom obligatoire." : validator.isLength(lastname, { min: 2, max: 20 }) ? "" : "Le nom doit contenir entre 2 et 20 caractères.");
    setEmailError(validator.isEmpty(email) ? "Adresse mail obligatoire" :validator.isEmail(email) ? "" : "Le format de l'email est incorrect.");
    setPasswordError(validator.isEmpty(password) ? "Mot de passe obligatoire." : validator.isStrongPassword(password) ? "" : "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
    setConfirmPasswordError(validator.isEmpty(confirmPassword) ? "Confirmation du mot de passe obligatoire" : validator.equals(password, confirmPassword) ? "" : "Les mots de passe ne correspondent pas.");

    console.log("#########","\n",
    firstnameError,"\n",
    lastnameError,"\n",
    emailError,"\n",
    passwordError,"\n",
    confirmPasswordError,"\n"
    );
    console.log(firstname !== "" && lastname !== "" && email !== "" && password !== "" && confirmPassword !== "" && firstnameError === "" && lastnameError === "" && emailError === "" && passwordError === "" && confirmPasswordError === "");

    if (firstname !== "" && lastname !== "" && email !== "" && password !== "" && confirmPassword !== "" && firstnameError === "" && lastnameError === "" && emailError === "" && passwordError === "" && confirmPasswordError === "") {
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
          if (data.success) {
            toast.success("Votre compte a bien été créé !", {
              position: "bottom-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
            //navigateTo("/connexion");
          } else {
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
          console.error(err);
          toast.error(
            "Une erreur est survenue. Contactez support@savime.tech",
            {
              position: "bottom-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            }
          );
        });
    }
  };

  return (
    <div className={styles.__signup}>
      <Header />
      <Wrapper position={"left"}>
        <img className={styles.__avatar} src={avatar} alt="avatar" />
        <form onSubmit={(e) => signup(e)} >
        <Input
          error={firstnameError}
          icon={avatar}
          alt={"avatar"}
          type={"text"}
          placeholder={"Prénom"}
          value={firstname}
          onChange={(e: any) => setFirstname(e.currentTarget.value)}
        />
        <Input
          error={lastnameError}
          icon={avatar}
          alt={"avatar"}
          type={"text"}
          placeholder={"Nom"}
          value={lastname}
          onChange={(e: any) => setLastname(e.currentTarget.value)}
        />
        <Input
          error={emailError}
          icon={envelope}
          type={"email"}
          placeholder={"email@email.com"}
          value={email}
          onChange={(e: any) => setEmail(e.currentTarget.value)}
        />
        <Input
          error={passwordError}
          icon={lock}
          type={"password"}
          placeholder={"Mot de passe"}
          value={password}
          onChange={(e: any) => setPassword(e.currentTarget.value)}
        />
        <Input
          error={confirmPasswordError}
          icon={lock}
          type={"password"}
          placeholder={"Confirmation du mot de passe"}
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.currentTarget.value)}
        />
        <Input type={"submit"} value={"Inscription"} />
        <Link name={"J'ai déjà un compte !"} target={"/connexion"} />
        </form>
      </Wrapper>
    </div>
  );
};

export default Signup;

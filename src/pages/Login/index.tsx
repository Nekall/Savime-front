import validator from "validator";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

// Styles
import styles from "../../styles/pages/login.module.scss";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";
import envelope from "../../assets/images/icon/envelope.svg";
import lock from "../../assets/images/icon/lock.svg";

// Components
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Link from "../../components/Link";

// Atoms
import { tokenState, userDataState } from "../../atoms/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checked, setChecked] = useState(false);
  const navigateTo = useNavigate();
  const setUserData = useSetRecoilState(userDataState);
  const setToken = useSetRecoilState(tokenState);

  const login = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setEmailError(
      validator.isEmpty(email)
        ? "L'adresse mail ne peut pas être vide"
        : validator.isEmail(email)
        ? ""
        : "Le format de l'email est incorrect."
    );
    setPasswordError(
      !validator.isEmpty(password)
        ? ""
        : "Le mot de passe ne peut pas être vide."
    );

    if (email !== "" && password !== "" && validator.isEmail(email)) {
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/${
          checked ? "managers" : "employees"
        }/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            const { token, data: user } = data;
            const { verified } = user;

            if (!verified) {
              return toast.info("Votre compte n'est pas vérifier.", {
                position: "bottom-center",
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
              });
            }

            const userObj = {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
            };

            localStorage.setItem("__svm_token", token);
            localStorage.setItem("__svm_user", JSON.stringify(userObj));

            // recoil store
            setUserData({
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              job: user.job,
            });
            setToken(token);

            toast.success("Vous êtes connecté !", {
              position: "bottom-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
            navigateTo("/tableau-de-bord");
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
    <div className={styles.__login}>
      <Header />
      <Wrapper position={"right"}>
        <img className={styles.__avatar} src={avatar} alt="avatar" />
        <form onSubmit={(e) => login(e)} >
        <Input
          icon={envelope}
          error={emailError}
          type={"email"}
          placeholder={"email@email.com"}
          value={email}
          onChange={(e: any) => setEmail(e.currentTarget.value)}
        />
        <Input
          icon={lock}
          error={passwordError}
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
        <Input type={"submit"} value={"Connexion"} />
        <Link name={"Pas encore de compte ?"} target={"/inscription"} />
        <Link
          name={"J'ai perdu mon mot de passe"}
          target={"/mot-de-passe-oublie"}
        />
        </form>
      </Wrapper>
    </div>
  );
};

export default Login;

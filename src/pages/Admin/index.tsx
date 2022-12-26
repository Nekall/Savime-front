import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
//import { useSetRecoilState } from "recoil";

// Styles
import styles from "../../styles/pages/admin.module.scss";

// Assets
import gear from "../../assets/images/icon/gear.svg";
import envelope from "../../assets/images/icon/envelope.svg";
import lock from "../../assets/images/icon/lock.svg";

// Components
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import Input from "../../components/Input";

// Atoms
//import { tokenState, userDataState } from "../../atoms/user";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  //const setUserData = useSetRecoilState(userDataState);
  //const setToken = useSetRecoilState(tokenState);

  const login = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const { token, data: user } = data;
          localStorage.setItem("__svm_token", token);

          // recoil store ADMIN
          /*
          setUserData({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            job: user.job,
          });
          setToken(token);
          */
          toast.success("Vous êtes connecté !", {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
          navigateTo("/panneau-administrateur");
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
        toast.error("Une erreur est survenue. Contactez support@savime.tech", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      });
  };

  return (
    <div className={styles.__admin_login}>
      <Header />
      <Wrapper position={"center"}>
        <img className={styles.__avatar} src={gear} alt="avatar" />
        <form onSubmit={(e) => login(e)}>
          <Input
            icon={envelope}
            type={"email"}
            placeholder={"email@email.com"}
            value={email}
            onChange={(e: any) => setEmail(e.currentTarget.value)}
            required
          />
          <Input
            icon={lock}
            type={"password"}
            placeholder={"Mot de passe"}
            value={password}
            onChange={(e: any) => setPassword(e.currentTarget.value)}
            required
          />
          <Input type={"submit"} value={"Connexion"} />
        </form>
      </Wrapper>
    </div>
  );
};

export default Admin;

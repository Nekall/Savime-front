import { useRecoilState } from "recoil";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

// Components
import Input from "../Input";

// Styles
import styles from "./styles.module.scss";

// Assets
import avatar from "../../assets/images/icon/avatar.svg";
import envelope from "../../assets/images/icon/envelope.svg";
import rocket from "../../assets/images/icon/rocket.svg";
import lock from "../../assets/images/icon/lock.svg";

// Atoms
import { userDataState } from "../../atoms/user";

// Helpers
import resizeImage from "../../helpers/resizeImage";

const Settings = () => {
  const [dataUser, setDateUser] = useRecoilState(userDataState);
  console.log(dataUser);
  const [firstname, setFirstname] = useState(dataUser.firstname);
  const [lastname, setLastname] = useState(dataUser.lastname);
  const [email, setEmail] = useState(dataUser.email);
  const [job, setJob] = useState(dataUser.job);
  const [profilePicture, setProfilePicture] = useState(dataUser.profilePicture)

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("update data");

    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/employees/${dataUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          job,
          profilePicture,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {

        console.log("data", data);
        if (data.success) {
          //success
          setDateUser({
            id: dataUser.id,
            role: dataUser.role,
            firstname: firstname,
            lastname: lastname,
            email: email,
            job: job,
            profilePicture: profilePicture
          })
        }
      });
  };

  const updatePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("update password");
    // fetch update password
  };

  const processProfilePicture = (e: any) => {
    const input = e.target;
    const file = input.files[0];
    
    if(!file.type.includes("image")){
      // make controle of size ?
      e.target.value = null;
      return toast.error("Seule les images sont acceptées.", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }else {
    //console.log(file);
    //const resizedPP = resizeImage(file);
    //console.log(resizedPP);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        const base64PP = reader.result;
        //const resizedPP = resizeImageBase64(base64PP);
        //console.log(base64PP);
        setProfilePicture(base64PP)
      }
    }

  }

  return (
    <div className={styles.__settings}>
      <h1>Settings</h1>
      <form onSubmit={(e) => updateData(e)}>
        <Input
          icon={avatar}
          type={"text"}
          placeholder={"Prénom"}
          value={firstname}
          onChange={(e: any) => setFirstname(e.currentTarget.value)}
        />
        <Input
          icon={avatar}
          type={"text"}
          placeholder={"Nom"}
          value={lastname}
          onChange={(e: any) => setLastname(e.currentTarget.value)}
        />
        <Input
          icon={envelope}
          type={"email"}
          placeholder={"Email"}
          value={email}
          onChange={(e: any) => setEmail(e.currentTarget.value)}
        />
        <Input
          icon={rocket}
          type={"text"}
          placeholder={"Métier"}
          value={job}
          onChange={(e: any) => setJob(e.currentTarget.value)}
        />
        <Input
          icon={rocket}
          type={"file"}
          onChange={(e: any) => processProfilePicture(e)}
        />
        <Input type={"submit"} value={"Sauvegarder"} />
      </form>
      <br />
      <section className={styles.__danger_zone}>
        <hr />
        <h2>Danger Zone</h2>
        <h3>Changement de mot de passe :</h3>
        <form onSubmit={(e) => updatePassword(e)}>
          <Input
            icon={lock}
            type={"text"}
            placeholder={"Mot de passe"}
            value={password}
            onChange={(e: any) => setPassword(e.currentTarget.value)}
          />
          <Input
            icon={lock}
            type={"text"}
            placeholder={"Confirmation du mot de passe"}
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.currentTarget.value)}
          />
          <Input type={"submit"} value={"Sauvegarder"} />
        </form>
      </section>
    </div>
  );
};

export default Settings;

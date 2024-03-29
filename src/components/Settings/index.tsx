import { useRecoilState, useRecoilValue } from "recoil";
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
import bubble from "../../assets/images/icon/bubble.svg";
import camera from "../../assets/images/icon/camera.svg";

// Atoms
import { userDataState } from "../../atoms/user";

// Helpers
import resizeImage from "../../helpers/resizeImage";

const Settings = () => {
  const token = useRecoilValue(userDataState).token;
  const role = useRecoilValue(userDataState).role;
  const [dataUser, setDateUser] = useRecoilState(userDataState);
  const [firstname, setFirstname] = useState(dataUser.firstname);
  const [lastname, setLastname] = useState(dataUser.lastname);
  const [email, setEmail] = useState(dataUser.email);
  const [phone, setPhone] = useState(dataUser.phone);
  const [job, setJob] = useState(dataUser.job);
  const [profilePicture, setProfilePicture] = useState(dataUser.profilePicture);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const updateData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/${role?.toLowerCase()}s/${
        dataUser.id
      }`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
        if (data.success) {
          setDateUser({
            id: dataUser.id,
            role: dataUser.role,
            firstname: firstname,
            lastname: lastname,
            email: email,
            job: job,
            profilePicture: profilePicture,
            token: dataUser.token,
            phone: phone,
          });
          toast.success("Informations mises à jour avec succès.");
        } else {
          console.error(data);
          toast.error("Les informations n'ont pas pu être mises à jour.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  };

  const updatePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Les mots de passe ne correspondent pas.");
    }

    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/${role?.toLowerCase()}s/${
        dataUser.id
      }`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPassword("");
          setConfirmPassword("");
          toast.success("Mot de passe mis à jour.");
        } else {
          console.error(data);
          toast.error("Le mot de passe n'a pas pu être mis à jour.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Une erreur est survenue. Contactez support@savime.tech");
      });
  };

  const processProfilePicture = (e: any) => {
    const input = e.target;
    const file = input.files[0];

    if (!file.type.includes("image")) {
      e.target.value = null;
      return toast.error("Seule les images sont acceptées.");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async function () {
        if (reader.onerror) {
          console.error(reader.error);
          toast.error("Une erreur est survenue lors de la lecture du fichier.");
          return;
        }

        const base64PP = reader.result;
        try {
          const resizedPP = await resizeImage(base64PP);
          setProfilePicture(resizedPP);
        } catch (error) {
          console.error(error);
          toast.error("Votre image de profil n'est pas acceptée.");
        }
      };
    }
  };

  return (
    <div className={styles.__settings}>
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

        {role === "Manager" && (
          <Input
            icon={bubble}
            type={"phone"}
            placeholder={"Téléphone"}
            value={phone}
            onChange={(e: any) => setPhone(e.currentTarget.value)}
          />
        )}

        {role !== "Manager" && (
          <>
            <Input
              icon={rocket}
              type={"text"}
              placeholder={"Métier"}
              value={job}
              onChange={(e: any) => setJob(e.currentTarget.value)}
            />
            <Input
              icon={camera}
              type={"file"}
              onChange={(e: any) => processProfilePicture(e)}
            />
            <p className={styles.__img_details}>
              ⓘ Il est conseillé d'utiliser une image carrée
            </p>
            <p className={styles.__img_details}>
              si vous ne voulez pas subir une deformation de votre photo.
            </p>
          </>
        )}
        <Input type={"submit"} value={"Sauvegarder"} />
      </form>
      <section className={styles.__danger_zone}>
        <hr />
        <h2>Danger Zone</h2>
        <h3>Changement de mot de passe :</h3>
        <form onSubmit={(e) => updatePassword(e)}>
          <Input
            required
            icon={lock}
            type={"password"}
            placeholder={"Mot de passe"}
            value={password}
            onChange={(e: any) => setPassword(e.currentTarget.value)}
            pattern={
              "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
            }
            togglePasswordVisibility
          />
          <Input
            required
            icon={lock}
            type={"password"}
            placeholder={"Confirmation du mot de passe"}
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.currentTarget.value)}
            pattern={
              "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
            }
            togglePasswordVisibility
          />
          <p className={styles.__pwd_details}>
            ⓘ *Le mot de passe doit contenir au moins 8 caractères,
          </p>
          <p className={styles.__pwd_details}>
            une majuscule, une minuscule, un chiffre et un caractère spécial.
          </p>
          <Input type={"submit"} value={"Sauvegarder"} />
        </form>
      </section>
    </div>
  );
};

export default Settings;

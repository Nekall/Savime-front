import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

// Styles
import styles from "./styles.module.scss";

// Assets
import logo from "../../assets/images/logo/logo-full-transparent.png";
import gear from "../../assets/images/icon/gear.svg";
import chat from "../../assets/images/icon/chat.svg";
import exit from "../../assets/images/icon/exit.svg";
import envelopeClosed from "../../assets/images/icon/envelope-closed.svg";
import envelopeOpen from "../../assets/images/icon/envelope-open.svg";

// Atoms
import { tokenState, userDataState } from "../../atoms/user";

const Navbar = () => {
    const [envelopeState, setEnvelopeState] = useState(envelopeClosed);
    const navigateTo = useNavigate();
    const setUserData = useSetRecoilState(userDataState);
    const setToken = useSetRecoilState(tokenState);
    
const sendMail = () => {
    setEnvelopeState(envelopeOpen)
    //open modal for send mail ? 
    //or move to "mails" page ?
}

const openSettings = () => {
    console.log("Settings");
    // open settings page
}

    const disconnect = () => {
        navigateTo("/connexion");
        setUserData({
            id: null,
            firstname: null,
            lastname: null,
            email: null,
            job: null,
        });
        setToken(null)
        localStorage.removeItem("__svm_token");
        localStorage.removeItem("__svm_user");
        toast.success("Vous êtes déconnecté !", {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            });
    }

    return(
        <div className={styles.__navbar}>
            <img className={styles.__logo} src={logo} alt="logo " />
            <div className={styles.__menu}>
                {[
                    { target: "#", name: "Lorem ipsum" },
                    { target: "#", name: "Dolor sit" },
                    { target: "#", name: "Sit dolores" },
                    { target: "#", name: "Adipisicing amet" },
                    { target: "#", name: "Dignissimos" },
                ].map((link)=>{
                    return(
                        <a key={uuidv4()} href={link.target} >{link.name}</a>
                    )
                })}
            </div>
            <div className={styles.__shortcut}>
                <button className={styles.__chat} onClick={()=>{console.log("Chat")}}><img src={chat} alt="chat" /></button>
                <button className={styles.__envelope} onClick={() => sendMail()}><img src={envelopeState} alt="envelope" /></button>
                <button className={styles.__gear} onClick={()=>{openSettings()}}><img src={gear} alt="gear" /></button>
            </div>
            <div className={styles.__disconnect}>
                <button onClick={()=>disconnect()}>Déconnexion <img src={exit} alt="logout" /></button>
            </div>
        </div>
    )
}

export default Navbar;
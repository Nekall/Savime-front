// Styles
import styles from "./styles.module.scss";

interface Props {
    name: string;
    target: string;
}

const Link = ({ name, target }: Props) => {
    return(
        <div className={styles.__link}>
            <a href={target}>{name}</a>
        </div>
    )
}

export default Link;
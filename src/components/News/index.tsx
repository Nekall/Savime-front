// Styles
import styles from "./styles.module.scss";

const News = () => {
    return (
        <div className={styles.__news}>
        <h2>Actualités internes</h2>
        <ul>
            <li>Lorem ipsum dulor sit amet, consectetur adipiscing elit. <span className={styles.__date}>(01/23/4567)</span></li>
            <li>Quisque rhoncus tortor pharetra, vehicula enim eget, congue orci. <span className={styles.__date}>(01/23/4567)</span></li>
            <li>Etiam porta nisl vitae augue sagittis dapibus. <span className={styles.__date}>(01/23/4567)</span></li>
            <li>Nullam ut ante ultricies enim accumsan sagittis non fermentum elit. <span className={styles.__date}>(01/23/4567)</span></li>
            <li>Sed vitae sapien nec est mullis hendrerit. <span className={styles.__date}>(01/23/4567)</span></li>
        </ul>
        <button className={styles.__more_articles}>Plus d'articles...</button>
        </div>
    );
    };

export default News;
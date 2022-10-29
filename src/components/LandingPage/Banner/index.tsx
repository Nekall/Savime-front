// Styles
import styles from "./styles.module.scss";

interface Props {
  image: string;
  alt: string;
  orientation: "left" | "right" | string;
}

const Banner = ({ image, alt, orientation }: Props) => {
  return (
    <div className={`${styles.__banner} ${orientation === "right"? styles.__right : ""}`}>
      <div className={styles.__content}>
        <div className={styles.__text}>
        <h3>Fusce qui nulla</h3>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus harum laborum, recusandae debitis, consectetur ex neque voluptas culpa mollitia illo molestiae dignissimos eveniet provident rerum deleniti porro voluptatum blanditiis vitae numquam! Quaerat, sapiente! Ratione nihil quam ut porro fugiat reiciendis. Minima ea, nam neque tempora similique unde sint perspiciatis sunt provident praesentium. Quae veritatis rem, similique unde deserunt dicta velit repellat delectus. Omnis a eveniet quis impedit asperiores voluptas, cum suscipit dignissimos blanditiis vel quaerat exercitationem, sit earum enim aliquid. Repudiandae ex beatae maxime tenetur deleniti sunt odio ducimus alias reiciendis, et eius id nihil at possimus, modi, iusto totam corrupti voluptatum inventore? Hic voluptatum sed distinctio blanditiis quia explicabo? Ducimus ea mollitia minus, consectetur impedit obcaecati cupiditate autem laboriosam neque deserunt expedita ullam quasi ratione fugit animi hic, consequatur eaque tenetur tempora quia unde provident? Hic, nihil iure voluptatem incidunt officiis molestias, delectus rem quas quibusdam, esse est! Sed.
      </p>
        </div>
        <div className={styles.__box}>
          <img className={styles.__image} src={image} alt={alt} />
        </div>
      </div>
    </div>
  );
};

export default Banner;

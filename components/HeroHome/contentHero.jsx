import styles from "./HeroHome.module.css";
import { Paragraph } from "../commons/Paragraph";
import { Heading } from "../commons/Heading";

const ContentHero = ({ title, content, image, imgStyles, containerStyle }) => {
  return (
    <div className={containerStyle}>
      <div className={styles.textContent}>
        <Heading level={"h1"}>{title}</Heading>
        <div>
          {content.split("\n").map((linha, index) => (
            <Paragraph key={index}>{linha}</Paragraph>
          ))}
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={imgStyles} />
      </div>
    </div>
  );
};

export default ContentHero;

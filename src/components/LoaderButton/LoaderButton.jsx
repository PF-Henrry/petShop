import styles from "./styles.module.scss";

export const LoaderButton = ({ size = 20 }) => {
  return (
    <div style={{ width: size, height: size }} className={styles.spinner} />
  );
};
import styles from "./Loader.module.css";

export function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <span className={styles.loader}></span>
    </div>
  );
}

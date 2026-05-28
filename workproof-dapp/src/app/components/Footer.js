import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.logo}>WorkProof</span>
        <span className={styles.copy}>© 2026 — all credentials on-chain</span>
        <div className={styles.links}>
          <a href="#" className={styles.link}>docs</a>
          <a href="#" className={styles.link}>github</a>
          <a href="#" className={styles.link}>terms</a>
        </div>
      </div>
    </footer>
  );
}
// export default function Footer(){
//     return(
//         <div>
//             <footer>Copyright 2026</footer>
//         </div>
//     )
// }
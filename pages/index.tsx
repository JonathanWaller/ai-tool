import styles from '@/styles/Home.module.css'
import Link from 'next/link';

export default function Home() {

  return (
    <div className={styles.glowContainer}>
      <Link href={'/chat-response'}>
      <button className={styles.glowingBtn}>
        <span className={styles.glowingTxt}>
          E
        <span className={styles.faultyLetter}>
          N</span>TER</span>
      </button>
      </Link>
    </div>
  )
}

import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import type { NextPageWithLayout } from './_app';

import LayoutNoNav from '@/components/LayoutNoNav';

const Home: NextPageWithLayout = () => {

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

Home.getLayout = function getLayout ( page ) {
    return(
        <LayoutNoNav>
            {page}
        </LayoutNoNav>
    )
}

export default Home;
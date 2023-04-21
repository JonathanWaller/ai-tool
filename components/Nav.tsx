import Link from 'next/link';
import styles from '@/styles/Nav.module.css';

const Nav = () => {

    return (
        <div className={styles.navContainer}>
            <Link href={'/home'} className={styles.navLink}>Home</Link>
                <Link href={'/chat-response'} className={styles.navLink}>Chat</Link>
                <Link href={'/image-generator'} className={styles.navLink}>Image</Link>
                <Link href={'/image-variation'} className={styles.navLink}>Image Variation</Link>
        </div>
    )
}

export default Nav;
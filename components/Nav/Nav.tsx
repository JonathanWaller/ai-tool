import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Nav.module.css';

const Nav = () => {

    return (
        <div className={styles.navContainer}>
            <Link href={'/chat-response'}>Chat</Link>
            <Link href={'/image-generator'}>Image</Link>
        </div>
    )
}

export default Nav;
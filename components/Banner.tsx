import Image from 'next/image';
import mainImage from '@/assets/images/space-2.jpeg';
import styles from '@/styles/Home.module.css'

const Banner = () => {
    return(
        <div className={styles.bannerContainer}>
            <div className={styles.bannerImageContainer}>
            <Image
                src={mainImage}
                fill // will fill the container
                alt='main img'
                priority
                className={styles.mainImage}
                />
            </div>
        </div>
    )
}

export default Banner;
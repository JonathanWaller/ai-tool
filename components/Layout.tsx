import Nav from "./Nav/Nav";
import styles from '@/styles/Layout.module.css'

// const AppContainer = styled.div`
//     padding: 100px;
//     @media (max-width: ${breakpoints.sm}px) {
//         padding: 50px;
//      }
// `

interface Props {
    children: any;
}

const Layout = ({children}: Props ) => {
    return(
        // <div className={styles.appContainer}>
        <>
            <Nav />
            <main>{children}</main>
        {/* </div> */}
        </>
    )
}

export default Layout;
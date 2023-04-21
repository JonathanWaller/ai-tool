import Nav from "./Nav/Nav";

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
        <>
            <Nav />
            <main>{children}</main>
        </>
    )
}

export default Layout;
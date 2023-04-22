import Banner from "./Banner";
import Nav from "./Nav";

interface Props {
    children: any;
}

const Layout = ({children}: Props ) => {
    return(
        <>
            <Banner />
            {/* <Nav /> */}
            <main>{children}</main>
        </>
    )
}

export default Layout;
interface Props {
    children: any;
}

const LayoutNoNav = ({children}: Props ) => {
    return(
        <>
            <main>{children}</main>
        </>
    )
}

export default LayoutNoNav;
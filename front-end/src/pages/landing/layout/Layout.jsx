import { Outlet } from "react-router-dom"
import LandingNavbar from './LandingNavbar'
export default function Layout() {
    return (
        <>
            <LandingNavbar />
            <Outlet />
        </>
    )
}


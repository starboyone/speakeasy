import Link from "next/link"
import { MobileSidebar } from "./mobile-sidebar"
export const MobileHeader = () => {

    return (
        <nav className="lg:hidden px-6 h-[50px] bg-blue-500 border-b fixed top-0 w-full z-50">
            <div className="mt-3">
            <MobileSidebar />
            </div>
        </nav>
    )
}
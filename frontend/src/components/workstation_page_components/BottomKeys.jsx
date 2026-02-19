
import AddANote from "./AddANote"
import FolderShelf from "./FolderManager"
import SideButtons from "./SideButtons"

import { useIsMobile } from "./BlueBoard"

export default function BottomKeys(){

const desktopView = (
        <div className="flex w-screen px-5 h-[35vh] border-t-4 border-gray-300 border-dotted">
            <AddANote />
            <FolderShelf />
            <SideButtons />
        </div>
)

const mobileView = (
        <div className="flex flex-col items-center
        w-full pt-5 h-[50vh] relative bottom-16">
            <AddANote />
        </div>
)

    const isMobile = useIsMobile()

    return (
        <div className="">
        {isMobile ? mobileView : desktopView}
        </div>
    )
}
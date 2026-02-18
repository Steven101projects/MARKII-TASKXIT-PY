
import AddANote from "./AddANote"
import FolderShelf from "./FolderManager"
import SideButtons from "./SideButtons"

import { useIsMobile } from "./BlueBoard"

export default function BottomKeys(){

const desktopView = (
        <div className="flex w-full p-5 h-[35vh]">
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
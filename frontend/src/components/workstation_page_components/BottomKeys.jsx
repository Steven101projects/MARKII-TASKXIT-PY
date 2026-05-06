import AddANote from "./AddANote";
import FolderShelf from "./FolderManager";
import SideButtons from "./SideButtons";

import { useIsMobile } from "./BlueBoard";

export default function BottomKeys() {
  const isMobile = useIsMobile();

  const desktopView = (
    <div
      className="
        flex w-full px-5
        h-[35vh]
        overflow-visible
        border-t-4 border-gray-300 border-dotted
      "
    >
      <AddANote />
      <FolderShelf />
      <SideButtons />
    </div>
  );

  const mobileView = (
    <div
      className="
        flex flex-col items-center w-full pt-5
        h-[50vh]
        overflow-visible
        relative bottom-16
      "
    >
      <AddANote />
    </div>
  );

  return <div className="w-full">{isMobile ? mobileView : desktopView}</div>;
}
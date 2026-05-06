import { useState } from "react";
import usePageMeta from "../hooks/usePageMeta";
import MainHeader from "../components/MainHeader";
import BlueBoard from "../components/workstation_page_components/BlueBoard";
import BottomKeys from "../components/workstation_page_components/BottomKeys";

export default function WorkStationPage() {
  usePageMeta(
    "Taskxit | Workstation",
    "Sign In to start using Taskxit."
  );

  const [isBoardEditing, setIsBoardEditing] = useState(false);

  return (
    <div className="overflow-hidden h-screen">
      <MainHeader
        isBoardEditing={isBoardEditing}
        setIsBoardEditing={setIsBoardEditing}
      />

      <BlueBoard isBoardEditing={isBoardEditing} />

      <BottomKeys />
    </div>
  );
}
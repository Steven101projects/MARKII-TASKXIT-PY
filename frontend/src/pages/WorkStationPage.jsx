import usePageMeta from "../hooks/usePageMeta"
import MainHeader from "../components/MainHeader"
import BlueBoard from "../components/workstation_page_components/BlueBoard"



export default function WorkStationPage(){
        usePageMeta("Taskxit | Workstation",
          "Sign In to start using Taskxit."
    )

    return (
        <div>
            <MainHeader />
            <BlueBoard />
            <p>HERE IT IS</p>
        </div>
    )
};
import { useNavigate } from "react-router-dom";

export default function JournalPage() {

    const navigate = useNavigate();

    return (
        <div className="bg-primary w-full h-screen flex items-center justify-center">
            <div className="text-center">
                <p className="text-xl text-white font-bold">
                    Journals will be in the next Update!
                </p>

                <p
                    onClick={() => navigate("/ws")}
                    className="text-white cursor-pointer hover:underline mt-2"
                >
                    Click here to go back home
                </p>
            </div>
        </div>
    );
}
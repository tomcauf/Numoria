import { useState } from "react";
import MemoryGame from "./MemoryGame.jsx";
import "../../css/Home.css";

function Home() {
    const [activeButton, setActiveButton] = useState("campaign");
    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    return (
        <>
            <div className="body">
                <div className="gamemode">
                    <ul className="gamemode-ul">
                        <li className="gamemode-item">
                            <button
                                className={`gamemode-button gamemode-campaign ${activeButton === "campaign" ? "gamemode-current" : ""
                                    }`}
                                onClick={() => handleButtonClick("campaign")}
                            >
                                <i className="fas fa-campaign"></i>
                                <p>Campaign</p>
                            </button>
                        </li>
                        <li className="gamemode-item">
                            <button
                                className={`gamemode-button gamemode-challenge ${activeButton === "challenge" ? "gamemode-current" : ""
                                    }`}
                                onClick={() => handleButtonClick("challenge")}
                            >
                                <i className="fas fa-challenge"></i>
                                <p>Challenge</p>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="game">
                    <MemoryGame />
                </div>
            </div>
        </>
    );
}

export default Home;
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import homecss from "../Home.module.css";

export default function Home() {
    const navigate = useNavigate();

    const quotes = [
        "Muscles loading... please wait ⏳",
        "Sweat is just fat crying—make it bawl, mawa!",
        "Eat. Sleep. Gym. Repeat. (Sometimes skip gym 😜)",
        "Biceps under construction, expect delays!",
        "Biceps under construction, expect delays!",
        "Six-pack coming soon... buffering ⏳"
    ];

    const [currentQuote, setCurrentQuote] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); // Start fade-out
            setTimeout(() => {
                setCurrentQuote((prev) => (prev + 1) % quotes.length);
                setFade(true); // Fade in new quote
            }, 500); // Time for fade-out
        }, 3000); // Change quote every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <>
        <div id={homecss.container}>
            <div className={homecss.home}>
                <h1 id={homecss.h}>Welcome to PowerFit</h1>
                <div className={homecss.cont}>
                <p className={`${homecss.quote} ${fade ? homecss.fadeIn : homecss.fadeOut}`}>
                    {quotes[currentQuote]}
                </p>
                </div>
                <button className={homecss.get} onClick={() => navigate("/fitness")}>Get started ➡️</button>
            </div>
        </div>
        </>
    );
}

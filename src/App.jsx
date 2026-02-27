import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import "./App.css";

const flowerMap = {
    Daisy: "assets/IMG_0475.PNG",
    Violet: "assets/IMG_0476.PNG",
    Rose: "assets/IMG_0477.PNG",
    Poppy: "assets/IMG_0478.PNG"
};


export default function App() {
    const [flowers, setFlowers] = useState([]);
    const gardenRef = useRef(null);

    // Load flowers from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("garden");
        if (saved) setFlowers(JSON.parse(saved));
    }, []);

    // Save flowers
    useEffect(() => {
        localStorage.setItem("garden", JSON.stringify(flowers));
    }, [flowers]);

    const addFlower = (variant) => {
        const newFlower = {
            id: Date.now(),
            variant,
            image: flowerMap[variant],
            x: Math.random() * 100,
            y: Math.random() * 100,
            rotation: Math.random() * 360,
            scale: 0.8 + Math.random() * 0.4
        };
        setFlowers([...flowers, newFlower]);
    };

    const clearGarden = () => {
        setFlowers([]);
        localStorage.removeItem("garden");
    };

    const saveGardenImage = async () => {
        if (!gardenRef.current) return;

        const canvas = await html2canvas(gardenRef.current, {
            backgroundColor: null,
            scale: 2
        });

        const link = document.createElement("a");
        link.download = "my-garden.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <div className="container">
            <div className="menu">
                <h1>Build a Garden</h1>

                <div className="buttons">
                    {Object.keys(flowerMap).map((variant) => (
                        <button key={variant} onClick={() => addFlower(variant)}>
                            <img
                                src={flowerMap[variant]}
                                alt={variant}
                                className="button-icon"
                            />
                            {variant}
                        </button>
                    ))}
                    <button onClick={clearGarden} style={{ background: "#f5cccc" }}>
                        Clear Garden
                    </button>
                    <button onClick={saveGardenImage}>
                        Save Image
                    </button>
                </div>
                <p>Inspired by Gustav Klimt's <em>Bauerngarten</em></p>
            </div>

            <div className="garden" ref={gardenRef}>
                {flowers.map((flower) => (
                    <div
                        key={flower.id}
                        className="flower"
                        style={{
                            left: `${flower.x}%`,
                            top: `${flower.y}%`,
                            transform: `rotate(${flower.rotation}deg) scale(${flower.scale})`
                        }}
                    >
                        <img
                            src={flower.image}
                            alt={flower.variant}
                            className="flower-img"
                        />
                    </div>

                ))}
            </div>
        </div>
    );
}

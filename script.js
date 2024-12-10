
document.addEventListener("DOMContentLoaded", () => {
    const objectElement = document.getElementById("TM1Gefaengnis");
	console.log("objectElement:", objectElement);
    objectElement.addEventListener("load", () => {
        console.log("SVG geladen");

        const svgDoc = objectElement.contentDocument;

        if (!svgDoc) {
            console.error("SVG konnte nicht geladen werden.");
            return;
        }

        console.log("SVG erfolgreich geladen:", svgDoc);

        // Funktionen definieren
        function updateSecretNumber() {
            let value = 0;
            for (let i = 0; i < 7; i++) {
                const lamp = svgDoc.querySelector(`#TM1Lampe${i}`);
                if (lamp && lamp.getAttribute("TMData") === "1") {
                    value += Math.pow(2, i);
                }
            }
            const numberElement = svgDoc.querySelector("#TM1Zahl");
            if (numberElement) {
                numberElement.textContent = "Geheime Zahl: " + value.toString();
            }
        }

        function onLampClick(event) {
            const lamp = event.target;
            if (lamp.getAttribute("TMData") === "1") {
                lamp.style.fill = "#333";
                lamp.setAttribute("TMData", "0");
            } else {
                lamp.style.fill = "#fccb00";
                lamp.setAttribute("TMData", "1");
            }
            updateSecretNumber();
        }

        function onGateClick() {
            const gate = svgDoc.querySelector("#TM1Zahl");
            if (gate) {
                const isVisible = gate.getAttribute("visibility") === "visible";
                gate.setAttribute("visibility", isVisible ? "hidden" : "visible");
            }
        }

        // Event-Listener hinzufügen
        for (let i = 0; i < 7; i++) {
            const lamp = svgDoc.querySelector(`#TM1Lampe${i}`);
            if (lamp) {
                lamp.addEventListener("click", onLampClick);
                console.log(`Ereignislistener für Lampe ${i} hinzugefügt.`);
            } else {
                console.warn(`Lampe ${i} nicht gefunden.`);
            }
        }

        const gate = svgDoc.querySelector("#TM1Tor");
        if (gate) {
            gate.addEventListener("click", onGateClick);
            console.log("Ereignislistener für Tor hinzugefügt.");
        } else {
            console.warn("Tor nicht gefunden.");
        }

        // Initiale Aktualisierung
        updateSecretNumber();
    });
});

async function analyzeDisruption() {

    const flight = document.getElementById("flightNumber").value;
    const type = document.getElementById("disruptionType").value;
    const delay = Number(document.getElementById("delay").value);
    const budget = Number(document.getElementById("budget").value);

    const button = event.target;

    button.innerText = "🤖 AI Finding Solutions...";
    button.disabled = true;

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/simulate-disruption",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    flight_number: flight,
                    disruption_type: type,
                    delay_hours: delay,
                    budget: budget,
                    preferred_time: "Any"
                })
            }
        );

        const data = await response.json();

        if (type === "Flight Cancellation") {

            const alternatives =
                data.agents.alternative_flights;

            document.getElementById("dependency").innerHTML = `
                <div class="result">
                    🔴 <strong>Flight Cancelled</strong>
                    <p>${flight} is no longer available.</p>
                </div>

                <div class="result">
                    🔗 <strong>AI Dependency Analysis</strong>
                    <p>
                    Hotel, meeting, transport and activities
                    may be affected.
                    </p>
                </div>
            `;

            document.getElementById("plan").innerHTML = `

                <h3>✈️ Alternative Journeys Found</h3>

                ${alternatives.map((flight, index) => `

                    <div class="result">

                        <h3>
                            Option ${index + 1} —
                            ${flight.flight}
                        </h3>

                        <p>
                            Departure: ${flight.departure}
                        </p>

                        <p>
                            Arrival: ${flight.arrival}
                        </p>

                        <p>
                            Price: ₹${flight.price}
                        </p>

                        <button
                            onclick="acceptAlternative('${flight.flight}')">
                            ✅ Choose This Flight
                        </button>

                    </div>

                `).join("")}

            `;

            document.getElementById("message").innerHTML = `
                <div class="result">

                    <h3>🤖 Autonomous AI Recommendation</h3>

                    <p>
                        I detected the cancellation and searched
                        for alternative flights within your
                        ₹${budget.toLocaleString()} budget.
                    </p>

                    <p class="success">
                        ✓ ${alternatives.length}
                        alternative(s) found.
                    </p>

                </div>
            `;

        } else {

            document.getElementById("message").innerHTML = `
                <div class="result">
                    <h3>🤖 AI Replanning Complete</h3>
                    <p>
                        Flight delay detected.
                        Dependent events have been analyzed.
                    </p>
                </div>
            `;
        }

    } catch (error) {

        console.error(error);

        alert(
            "Backend connection failed. Make sure Uvicorn is running."
        );

    }

    button.innerText = "🤖 Analyze & Replan Journey";
    button.disabled = false;
}


function acceptAlternative(flight) {

    document.getElementById("message").innerHTML = `
        <div class="result">

            <h3 class="success">
                ✅ Alternative Journey Accepted
            </h3>

            <p>
                Flight <strong>${flight}</strong>
                has been selected.
            </p>

            <p>
                🤖 AI will now synchronize the hotel,
                transport, meeting and activities.
            </p>

        </div>
    `;

    alert(
        "✅ Alternative flight " +
        flight +
        " accepted!"
    );
}


function acceptPlan() {

    document.getElementById("message").innerHTML = `
        <div class="result">

            <h3 class="success">✅ Plan Accepted</h3>

            <p>
                Your autonomous travel plan has been accepted.
            </p>

        </div>
    `;

    alert("Travel plan accepted!");
}


function resetJourney() {
    location.reload();
}
async function simulateDisruption() {
    const disruption = {
        flight_number: "AI-204",
        delay_hours: 4,
        original_arrival: "02:00 PM",
        new_arrival: "06:00 PM"
    };

    try {
        const response = await fetch(
            "http://127.0.0.1:8000/simulate-disruption",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(disruption)
            }
        );

        const data = await response.json();

        console.log("Backend response:", data);

        // Update flight status
        document.getElementById("flightStatus").textContent = "Delayed 4 Hours";

        // Update system status
        document.getElementById("systemStatus").textContent = "Journey Replanned";

        // Show replanning status
        document.getElementById("replanningStatus").innerHTML = `
            <h3>✅ Replanning Completed</h3>
            <p>
                The AI analyzed the disruption and updated
                the dependent travel events.
            </p>
        `;

        // Show updated travel plan
        document.getElementById("updatedPlan").innerHTML = `
            <div>
                <h3>✈️ Flight</h3>
                <p>${data.agents.replanning_agent.updated_plan.flight.flight_number}</p>
                <p>Arrival: ${data.agents.replanning_agent.updated_plan.flight.arrival}</p>
                <p>Status: Delayed</p>
            </div>

            <div>
                <h3>🏨 Hotel</h3>
                <p>
                    Check-in:
                    ${data.agents.replanning_agent.updated_plan.hotel.new_time}
                </p>
                <p>Status: Rescheduled</p>
            </div>

            <div>
                <h3>💼 Business Meeting</h3>
                <p>
                    ${data.agents.replanning_agent.updated_plan.meeting.time}
                </p>
                <p>Status: Rescheduled</p>
            </div>

            <div>
                <h3>🗼 Eiffel Tower Visit</h3>
                <p>
                    ${data.agents.replanning_agent.updated_plan.activity.time}
                </p>
                <p>Status: Rescheduled</p>
            </div>
        `;

        // Show traveler notification
        document.getElementById("notification").innerHTML = `
            <h3>📢 Traveler Notification</h3>
            <p>
                ${data.agents.communication_agent.notification}
            </p>
        `;

        alert("AI successfully replanned your journey!");

    } catch (error) {
        console.error("Error:", error);

        alert("Could not connect to backend.");
    }
}
// ==========================================
// AI TRAVEL DISRUPTION & REPLANNING AGENT
// ==========================================


// Main function called when the user clicks
// "Simulate Flight Delay"
function simulateDisruption() {

    // ------------------------------------------
    // STEP 1: Update flight status
    // ------------------------------------------

    const flightStatus = document.getElementById("flightStatus");
    const systemStatus = document.getElementById("systemStatus");

    flightStatus.innerText = "Delayed by 4 Hours";
    flightStatus.style.color = "#dc2626";

    systemStatus.innerText = "⚠️ Disruption Detected";
    systemStatus.style.color = "#dc2626";


    // ------------------------------------------
    // STEP 2: Show disruption information
    // ------------------------------------------

    const disruptionSection =
        document.querySelector(".disruption-card");

    disruptionSection.innerHTML = `
        <div>
            <h3>⚠️ Flight Delay Detected</h3>

            <p>
                Flight <strong>AI-204</strong> is delayed by
                <strong>4 hours</strong>.
            </p>

            <p>
                Original arrival:
                <strong>02:00 PM</strong>
            </p>

            <p>
                New arrival:
                <strong>06:00 PM</strong>
            </p>
        </div>

        <div class="alert-icon">
            🚨
        </div>
    `;


    // ------------------------------------------
    // STEP 3: Dependency Agent
    // ------------------------------------------

    const dependencyNodes =
        document.querySelectorAll(".dependency-node");

    dependencyNodes.forEach(function(node) {

        node.style.border = "2px solid #dc2626";

    });


    // ------------------------------------------
    // STEP 4: Show AI processing
    // ------------------------------------------

    const replanningStatus =
        document.getElementById("replanningStatus");

    replanningStatus.innerHTML = `
        <h3>🤖 AI Agent is Analyzing...</h3>

        <p>
            Flight Agent detected a delay.
        </p>

        <p>
            Dependency Agent is checking affected events...
        </p>

        <p>
            Schedule Agent is checking time conflicts...
        </p>

        <p>
            Replanning Agent is creating a new itinerary...
        </p>
    `;

    replanningStatus.style.border =
        "2px solid #2563eb";


    // ------------------------------------------
    // STEP 5: Simulate AI processing time
    // ------------------------------------------

    setTimeout(function() {

        generateNewPlan();

    }, 2500);
}



// ==========================================
// GENERATE UPDATED TRAVEL PLAN
// ==========================================

function generateNewPlan() {

    const replanningStatus =
        document.getElementById("replanningStatus");

    const updatedPlan =
        document.getElementById("updatedPlan");

    const notification =
        document.getElementById("notification");


    // ------------------------------------------
    // REPLANNING COMPLETE
    // ------------------------------------------

    replanningStatus.innerHTML = `
        <h3>✅ Replanning Complete</h3>

        <p>
            The AI analyzed the dependency chain and
            generated a new travel plan.
        </p>

        <p>
            <strong>3 dependent events were affected.</strong>
        </p>
    `;

    replanningStatus.style.border =
        "2px solid #16a34a";


    // ------------------------------------------
    // UPDATED ITINERARY
    // ------------------------------------------

    updatedPlan.innerHTML = `

        <div class="timeline">

            <div class="timeline-item">

                <div class="timeline-icon">
                    ✈️
                </div>

                <div class="timeline-content">

                    <h3>
                        Flight AI-204
                    </h3>

                    <p>
                        Mumbai → Paris
                    </p>

                    <p>
                        New arrival:
                        <strong>06:00 PM</strong>
                    </p>

                    <span class="status"
                          style="
                          background:#fee2e2;
                          color:#991b1b;
                          ">
                        Delayed
                    </span>

                </div>

            </div>


            <div class="timeline-item">

                <div class="timeline-icon">
                    🏨
                </div>

                <div class="timeline-content">

                    <h3>
                        Hotel Check-in Rescheduled
                    </h3>

                    <p>
                        Original: 04:00 PM
                    </p>

                    <p>
                        New check-in:
                        <strong>07:00 PM</strong>
                    </p>

                    <span class="status"
                          style="
                          background:#dcfce7;
                          color:#166534;
                          ">
                        Automatically Updated
                    </span>

                </div>

            </div>


            <div class="timeline-item">

                <div class="timeline-icon">
                    💼
                </div>

                <div class="timeline-content">

                    <h3>
                        Business Meeting
                    </h3>

                    <p>
                        Original: 10:00 AM
                    </p>

                    <p>
                        New meeting time:
                        <strong>02:00 PM - Next Day</strong>
                    </p>

                    <span class="status"
                          style="
                          background:#dcfce7;
                          color:#166534;
                          ">
                        Rescheduled
                    </span>

                </div>

            </div>


            <div class="timeline-item">

                <div class="timeline-icon">
                    🗼
                </div>

                <div class="timeline-content">

                    <h3>
                        Eiffel Tower Visit
                    </h3>

                    <p>
                        Original: 05:00 PM
                    </p>

                    <p>
                        New time:
                        <strong>06:00 PM - Next Day</strong>
                    </p>

                    <span class="status"
                          style="
                          background:#dcfce7;
                          color:#166534;
                          ">
                        Rescheduled
                    </span>

                </div>

            </div>

        </div>
    `;


    // ------------------------------------------
    // COMMUNICATION AGENT
    // ------------------------------------------

    notification.innerHTML = `

        <h3>📢 Traveler Notification</h3>

        <p>
            <strong>Your itinerary has been automatically updated.</strong>
        </p>

        <br>

        <p>
            ✈️ Your flight AI-204 is delayed by 4 hours.
        </p>

        <p>
            🏨 Hotel check-in has been moved to 07:00 PM.
        </p>

        <p>
            💼 Your business meeting has been rescheduled.
        </p>

        <p>
            🗼 Your Eiffel Tower activity has been moved
            to the next day.
        </p>

        <br>

        <p>
            🤖 The AI Travel Agent identified the dependency
            chain and automatically replanned your journey.
        </p>

    `;

    notification.style.borderLeft =
        "5px solid #16a34a";


    // ------------------------------------------
    // UPDATE SYSTEM STATUS
    // ------------------------------------------

    const systemStatus =
        document.getElementById("systemStatus");

    systemStatus.innerText =
        "✅ Journey Replanned";

    systemStatus.style.color =
        "#16a34a";


    // ------------------------------------------
    // Scroll to updated plan
    // ------------------------------------------

    updatedPlan.scrollIntoView({
        behavior: "smooth"
    });

}
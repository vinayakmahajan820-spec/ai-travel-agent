from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="AI Autonomous Travel Agent",
    version="2.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TravelDisruption(BaseModel):
    flight_number: str
    disruption_type: str
    delay_hours: int = 0
    budget: int = 10000
    preferred_time: str = "Any"


@app.get("/")
def home():
    return {
        "message": "AI Autonomous Travel Agent is running!",
        "status": "online"
    }


@app.post("/simulate-disruption")
def simulate_disruption(data: TravelDisruption):

    if data.disruption_type == "Flight Cancellation":

        alternatives = [
            {
                "flight": "AI-308",
                "departure": "12:30 PM",
                "arrival": "06:20 PM",
                "price": 8500
            },
            {
                "flight": "AI-412",
                "departure": "03:00 PM",
                "arrival": "08:10 PM",
                "price": 7200
            },
            {
                "flight": "AI-522",
                "departure": "05:30 PM",
                "arrival": "10:40 PM",
                "price": 6200
            }
        ]

        alternatives = [
            x for x in alternatives
            if x["price"] <= data.budget
        ]

        return {
            "status": "success",
            "disruption": "Flight Cancelled",

            "agents": {

                "flight_agent": {
                    "status": "Flight cancelled",
                    "original_flight": data.flight_number,
                    "alternatives_found": len(alternatives)
                },

                "dependency_agent": {
                    "affected_events": [
                        "Hotel Check-in",
                        "Business Meeting",
                        "Airport Transport",
                        "Activities"
                    ]
                },

                "alternative_flights": alternatives,

                "replanning_agent": {
                    "status": "New journey generated",
                    "hotel_checkin": "07:30 PM",
                    "meeting": "Tomorrow 10:00 AM",
                    "transport": "Airport pickup arranged"
                },

                "communication_agent": {
                    "notification":
                        "Your flight was cancelled. "
                        "AI found alternative journeys and "
                        "replanned your dependent travel events."
                }
            }
        }

    return {
        "status": "success",
        "disruption": "Flight Delayed",
        "message": "Journey dependencies analyzed and replanned."
    }
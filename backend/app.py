from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="AI Travel Disruption Agent",
    description="Backend for dependency-aware travel replanning",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class FlightDisruption(BaseModel):
    flight_number: str
    delay_hours: int
    original_arrival: str
    new_arrival: str


@app.get("/")
def home():
    return {
        "message": "AI Travel Disruption Agent is running!",
        "status": "online"
    }


@app.post("/simulate-disruption")
def simulate_disruption(disruption: FlightDisruption):

    updated_plan = {
        "flight": {
            "flight_number": disruption.flight_number,
            "arrival": disruption.new_arrival,
            "status": "Delayed"
        },
        "hotel": {
            "event": "Hotel Check-in",
            "new_time": "07:00 PM",
            "status": "Rescheduled"
        },
        "meeting": {
            "time": "02:00 PM - Next Day",
            "status": "Rescheduled"
        },
        "activity": {
            "name": "Eiffel Tower Visit",
            "time": "06:00 PM - Next Day",
            "status": "Rescheduled"
        }
    }

    notification = (
        f"Your flight {disruption.flight_number} is delayed by "
        f"{disruption.delay_hours} hours. "
        "Your hotel check-in, business meeting, and activity "
        "have been automatically replanned."
    )

    return {
        "status": "success",
        "message": "Disruption analyzed and itinerary replanned.",

        "agents": {

            "flight_agent": {
                "agent": "Flight Agent",
                "flight": disruption.flight_number,
                "status": "Delayed",
                "delay_hours": disruption.delay_hours,
                "new_arrival": disruption.new_arrival
            },

            "dependency_agent": {
                "affected_events": [
                    {
                        "event": "Hotel Check-in",
                        "reason": "Traveler arrives after original check-in time"
                    },
                    {
                        "event": "Business Meeting",
                        "reason": "Travel schedule conflict"
                    },
                    {
                        "event": "Eiffel Tower Visit",
                        "reason": "Activity overlaps with revised schedule"
                    }
                ]
            },

            "hotel_agent": {
                "event": "Hotel Check-in",
                "new_time": "07:00 PM",
                "status": "Rescheduled"
            },

            "schedule_agent": {
                "meeting": "02:00 PM - Next Day",
                "activity": "06:00 PM - Next Day"
            },

            "replanning_agent": {
                "updated_plan": updated_plan
            },

            "communication_agent": {
                "notification": notification
            }
        }
    }
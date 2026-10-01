def analyze_flight(disruption):
    return {
        "agent": "Flight Agent",
        "flight": disruption["flight_number"],
        "status": "Delayed",
        "delay_hours": disruption["delay_hours"],
        "new_arrival": disruption["new_arrival"]
    }
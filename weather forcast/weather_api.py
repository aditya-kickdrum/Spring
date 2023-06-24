from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


@app.route("/weather")
def get_weather_forecast():
    api_key = "d655ed61d7714688b7950140232406"
    city = request.args.get("city", "")

    base_url = "http://api.weatherapi.com/v1/forecast.json"
    params = {"key": api_key, "q": city, "days": "1"}

    try:
        response = requests.get(base_url, params=params)
        data = response.json()

        if "error" in data:
            return jsonify({"error": "City not found."})

        location = data["location"]["name"]
        temperature = data["current"]["temp_c"]
        humidity = data["current"]["humidity"]
        description = data["current"]["condition"]["text"]

        print(data)

        return (
            jsonify(
                {
                    "location": location,
                    "temperature": temperature,
                    "humidity": humidity,
                    "description": description,
                    "hourly_f": data["forecast"]["forecastday"][0]["hour"],
                }
            ),
            200,
            {"Content-Type": "application/json"},
        )

    except requests.exceptions.RequestException as e:
        return jsonify(
            {"error": "An error occurred while retrieving the weather forecast."}
        )


if __name__ == "__main__":
    app.run()

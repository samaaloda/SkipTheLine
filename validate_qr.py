from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("") # change
db = client[""] # change to database name
ride_queues = db["ride_queues"]

@app.route("/validate_qr", methods=["POST"])
def validate_qr():
    data = request.json
    user_id, ride_id = data["qr_data"].split("-")

    ride_queue = ride_queues.find_one({"ride_id": ride_id})

    if not ride_queue:
        return jsonify({"success": False, "message": "Ride not found"}), 404

    for rider in ride_queue["queue"]:
        if rider["user_id"] == user_id and rider["status"] == "ready":
            rider["status"] = "scanned"

            ride_queues.update_one({"ride_id": ride_id}, {"$set": {"queue": ride_queue["queue"]}})

            return jsonify({"success": True, "message": "Access granted"}), 200

    return jsonify({"success": False, "message": "Invalid or expired QR"}), 400

if __name__ == "__main__":
    app.run(debug=True)
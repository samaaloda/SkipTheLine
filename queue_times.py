import requests

parks_url = "https://queue-times.com/parks.json"
parks_data = requests.get(parks_url).json()
print(parks_data)

park_id = 77
queue_url = f"https://queue-times.com/parks/{park_id}/queue_times.json"
wait_times = requests.get(queue_url).json()
print(wait_times)
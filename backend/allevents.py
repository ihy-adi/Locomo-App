from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Replace with your actual subscription key
API_KEY = 'hHQ6VrMGT3dq3aH'


@app.route('/events', methods=['GET'])
def get_events():
    latitude = request.args.get('latitude', '28.6139')
    longitude = request.args.get('longitude', '77.2090')
    radius = request.args.get('radius', '10')
    page = request.args.get('page', '1')
    category = request.args.get('category', 'Music')

    url = 'https://api.allevents.in/events/geo/'
    headers = {
        'Ocp-Apim-Subscription-Key': API_KEY,
        'Cache-Control': 'no-cache'
    }
    params = {
        'latitude': latitude,
        'longitude': longitude,
        'radius': radius,
        'page': page,
        'category': category
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

import requests

def fetch_events():
    # Your Ticketmaster API key (Consumer Key)
    api_key = "UAF41PjMG2snA4D2aQPFMBAKouSumyRx"
    classification = "Comedian"  # Filter for events classified as "Comedian"
    
    # Construct the API endpoint URL
    url = f"https://app.ticketmaster.com/discovery/v2/events.json?classificationName={classification}&apikey={api_key}"
    
    try:
        # Send the GET request to the API
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for non 200 responses

        # Parse the JSON data
        data = response.json()

        # Extract events from the '_embedded' property
        events = data.get('_embedded', {}).get('events', [])

        if not events:
            print("No events found.")
            return

        # Iterate over the events and print details to the terminal.
        for event in events:
            event_name = event.get('name', 'No Name')
            event_date = event.get('dates', {}).get('start', {}).get('localDate', 'Unknown Date')
            
            # Attempt to get venue details from the embedded data.
            venues = event.get('_embedded', {}).get('venues', [])
            if venues:
                venue_name = venues[0].get('name', 'Unknown Venue')
                city = venues[0].get('city', {}).get('name', '')
            else:
                venue_name = 'Unknown Venue'
                city = ''

            print(f"Event: {event_name}")
            print(f"Date: {event_date}")
            if city:
                print(f"Venue: {venue_name} in {city}")
            else:
                print(f"Venue: {venue_name}")
            print("-" * 40)

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}\nResponse: {response.text}")
    except Exception as err:
        print(f"Other error occurred: {err}")

if __name__ == '__main__':
    fetch_events()

# Weather Service

Weather Service is a small project created to grab simple weather forecast details and return them as JSON back to the user.

## Installation

Use npm to install the necessary packages:

```bash
npm install
```

## Usage

The project can be started up using the command:

```bash
npm start
```

Then, using an API platform like Postman or a browser, the user can make a GET request to the url:

`localhost:3000/api/weather?lat={latitude}&lon={longitude}`

Be sure to insert your latitude and longitude with real coordinates.

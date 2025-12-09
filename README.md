# Location & Camera Demo

A web application that captures location data and camera snapshots, sending them to a backend server.

## Features
- Request device location (geolocation API)
- Capture camera snapshots
- Upload snapshots + metadata to server
- CORS enabled for cross-origin requests

## Installation

```bash
npm install
```

## Running Locally

```bash
npm start
```

Server will run on `http://localhost:3000`

## Deployment

This app is ready to deploy on Render or Heroku.

### Deploy to Render

1. Push your code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Connect your GitHub repo
5. Set build command: `npm install`
6. Set start command: `node server/server.js`
7. Deploy!

## API

### POST /upload
Upload a snapshot with metadata
- `photo`: Image file (form data)
- `meta`: JSON metadata (form data)

Response: `{ status: 'ok', message: 'Uploaded successfully', file: 'filename' }`

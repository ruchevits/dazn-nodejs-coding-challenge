# DAZN Node.js Coding Challenge

This service exposes an API to broadcast media streams.

- `GET /streams/:id`

The number of the concurrently watched streams is limited to 3.

- `GET /` is a status endpoint and is not rate limited.

API requires basic authorization header to be set. Password is ignored, and username is used to enforce rate limiting.

## Usage

```bash
npm install
npm test
npm start
```

### Available streams

| URL | Title | Length |
| --- | ----- | ------ |
| `http://localhost:8080/streams/1` | Big Buck Bunny | 1:00 |

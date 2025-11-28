# URL Shortener

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple URL shortening service built with Node.js and React.

## Description

This project provides a user-friendly interface for shortening long URLs. It utilizes a Node.js backend with Express.js to handle API requests and MongoDB for storing URL mappings. The frontend is built with React to provide a dynamic and responsive user experience. The application is containerized using Docker for easy deployment and scalability.

## Features

*   **URL Shortening:** Create short, unique URLs from long URLs.
*   **Custom Alias (Future Enhancement):** (Planned) Allow users to specify a custom alias for their shortened URLs.
*   **URL Redirection:** Redirect users to the original URL when they access the shortened URL.
*   **Analytics (Future Enhancement):** (Planned) Track the number of clicks and other analytics for each shortened URL.
*   **Dockerized Deployment:** Easily deploy the application using Docker.

## Screenshots/Demos

_(Placeholder - Add screenshots or GIFs here to showcase the UI)_

## Installation

1.  **Clone the repository:**
    bash
    git clone https://github.com/ZaidP101/ReadMePilot.git
    cd ReadMePilot
    

## Configuration

1.  **Environment Variables:**

    Create a `.env` file in the root directory. Refer to the `.env` file in the repository (if available) or the following example:

    
    PORT=3000 # Backend server port
    MONGODB_URI=mongodb://localhost:27017/urlshortener # MongoDB connection URI
    BASE_URL=http://localhost:3000 # Base URL for the application (for generating shortened URLs)
    

    *Adjust `BASE_URL` to your deployed domain or IP address.*

2.  **Frontend Configuration:**
    *   Navigate to the `UrlShortner` directory.
    *   The API endpoint in `UrlShortner/src/App.jsx` is configured using environment variables, so ensure `VITE_API_ENDPOINT` is set correctly:
    
    To set the env variable, create or edit `.env.local` in the `UrlShortner` directory, like so:
    
    
    VITE_API_ENDPOINT=http://localhost:3000/api/shorten
    
    
    *Ensure this matches your backend url.*

## Usage

1.  **Build and Run with Docker:**
    bash
    docker-compose up --build
    

    This command builds the Docker image and starts the containers.

2.  **Access the Application:**

    Open your web browser and navigate to the frontend application (usually at `http://localhost:5173` if running locally with the default Vite configuration). You can then enter a long URL and generate a shortened URL.

## API Reference

### `POST /api/shorten`

*   **Description:** Creates a shortened URL.
*   **Request Body:**
    
    
    {
      "longUrl": "https://www.example.com/a-very-long-url"
    }
    
    
*   **Response:**
    
    
    {
      "originalUrl": "https://www.example.com/a-very-long-url",
      "shortUrl": "http://localhost:3000/XXXXXX" // XXXXXX is the unique short code
    }
    
    

### `GET /{shortCode}`

*   **Description:** Redirects to the original URL based on the short code.
*   **Response:**
    *   HTTP 302 Redirect to the original URL.

## Tests

_(Placeholder - Add information about running tests here)_

## Deployment

1.  **Docker Deployment:**

    The application is designed to be deployed using Docker. You can deploy it to various platforms like:
    *   **Docker Hub:** Push the Docker image to Docker Hub and deploy it on any server with Docker installed.
    *   **Cloud Platforms:** Deploy to cloud platforms like AWS, Google Cloud, or Azure using their container services (e.g., AWS ECS, Google Kubernetes Engine, Azure Container Instances).
    *   **Heroku:** Use Heroku's container deployment feature to deploy the Docker image.

## Contributing

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**ZAID PATEL Test Completed**
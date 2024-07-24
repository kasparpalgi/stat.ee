
## Stat-ee Setup Guide

### Prerequisites
- Git
- Docker and Docker Compose
- Docker image file (e.g., `stat-ee.tar`)
- Models in the `models/` folder

### Steps

1. **Ensure Models**  
   Verify the correct models are in the `models/` folder.

2. **Copy Environment File**  
   Copy `.env.example` to `.env`:
   ```sh
   cp .env.example .env
   ```

3. **Load Docker Image**  
   Load the Docker image:
   ```sh
   docker load -i stat-ee.tar
   ```

4. **Use the docker-compose.yaml File**  
   Use the `docker-compose.yaml` file with the following content:
   ```yaml
   services:
     stat-ee:
       image: stat-ee:latest
       ports:
         - "3000:3000"
       env_file:
         - .env
       volumes:
         - ./models:/home/appuser/stat-ee/models
   ```

5. **Run Docker Compose**  
   Start the services using Docker Compose:
   ```sh
   docker-compose up -d
   ```

6. **View Logs**  
   To view logs:
   ```sh
   docker-compose logs -f
   ```

### Access Application
Go to http://localhost:3000 in your browser.

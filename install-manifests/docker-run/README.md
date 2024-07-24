
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

4. **Verify Image**  
   Confirm the image is loaded:
   ```sh
   docker images
   ```

5. **Run Docker Image**  
   Execute the `docker-run.sh` script:
   ```sh
   sh docker-run.sh
   ```

6. **View Logs**  
   To view logs, replace `$containerId` with your container ID:
   ```sh
   docker logs $containerId -f
   ```

### Access Application
Go to http://localhost:3000 in your browser.

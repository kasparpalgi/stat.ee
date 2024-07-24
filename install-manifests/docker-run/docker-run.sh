docker run -d -p 3000:3000 \
    --env-file .env \
    -v $(pwd)/models:/home/appuser/stat-ee/models stat-ee:latest

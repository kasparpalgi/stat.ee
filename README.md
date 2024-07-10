# Stat-ee

**Note:** Due to limitations on access to Oracle and unsuccessful cloud signups, the development of this project was initially carried out using PostgreSQL. The instructions provided here have not been tested with Oracle XE on Arm MacOS as intended. Developers which are encountering issues when migrating to Oracle are advised to provide detailed error messages for troubleshooting assistance.

## Setup Guide for Stat-ee

This guide will walk you through the setup process for the Stat-ee project on your local environment using PostgreSQL\Oracle.

### Prerequisites

Ensure you have the following installed:
- Git (for cloning the repository)
- Docker and Docker Compose
- You must have the Docker image file (e.g., `stat-ee.tar`) available on your system.

### Getting Started

### Step 1: Open a Terminal

Open a terminal or command prompt on your system.

### Step 2: Load the Docker Image

Use the `docker load` command to load the Docker image from the file. Replace `stat-ee.tar` with the path to your Docker image file if it is in a different location or has a different name.

```sh
docker load -i stat-ee.tar
```

This command will read the tar file and load the Docker image into your local Docker environment.

### Step 3: Verify the Image

Once the image is loaded, you can verify that it has been successfully loaded by listing the Docker images on your system.

```sh
docker images
```

You should see the `stat-ee` image listed among the available images.

### Step 4: Run the Docker Image

Now that the image is loaded, you can run it using the `docker run` command. The following example runs the image and maps port 3000 on your local machine to port 3000 in the container. Adjust the port numbers as necessary for your application.

```sh
docker run -p 3000:3000 stat-ee:latest
```

### Accessing the Application

Once the application is running, access it by navigating to http://localhost:3000 in your web browser (or the port you configured).

### Open the docs

1. Install Mintlify:

Open your terminal and run:

```bash
npm i -g mintlify
```

a. Navigate to the docs folder:

  ```bash
  cd stat-ee/docs
  ```
b. Start the development server:

  ```bash
  mintlify dev
  ```
This opens the docs in your web browser, usually at http://localhost:4111/.

Explore the documentation!

Tip: Stop the server (if needed) with Ctrl+C (or Command+C on macOS) in your terminal.

#### Routes
```http
GET /eestat/1/elujoud/:id - Get a specific elujoud by ID
```

```http
GET /filtered-aastased/:id - Get a specific aastased by ID with maa_protsent > 0.9
```


### Prediction Model Assignments

The results are mapped to the `PredictionResponse` object as follows:

Each model represents a specific aspect of the prediction and maps the dimensions as follows:

- **Model 1 (likviidsus)**
- **Model 2 (efektiivsus)**
- **Model 3 (struktuur)**
- **Model 4 (tasuvus)**
- **Model 5 (kasvu)**

For each model:
  - `modelY1`: Represents the X dimension of the prediction.
  - `modelY2`: Represents the Y dimension of the prediction.
  - `modelY3`: Represents the Z dimension of the prediction.

## Testing SQL queries

* [company_year_repository.ts](src/infrastructure/company_year_repository.ts)
* [norm_monthly_repository.ts](src/infrastructure/norm_monthly_repository.ts)
* [norm_yearly_repository.ts](src/infrastructure/norm_yearly_repository.ts)

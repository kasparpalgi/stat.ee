# Stat-ee

**Note:** Due to limitations on access to Oracle and unsuccessful cloud signups, the development of this project was initially carried out using PostgreSQL. The instructions provided here have not been tested with Oracle XE on Arm MacOS as intended. Developers which are encountering issues when migrating to Oracle are advised to provide detailed error messages for troubleshooting assistance.

## Setup Guide for Stat-ee

This guide will walk you through the setup process for the Stat-ee project on your local environment using PostgreSQL\Oracle.

### Prerequisites

Ensure you have the following installed:
- Node.js (version 18 or later)
- Docker and Docker Compose
- Git (for cloning the repository)

### Getting Started

### 1. Clone the Repository

Clone the Stat-ee repository to your local machine:

```bash
git clone https://github.com/crewnew/stat-ee.git
cd stat-ee
```
### 2. Environment Setup


Copy the .env.example file to a new file named .env and update the environment variables to match your setup:

```bash
cp .env.example .env
```
Edit the .env file with your preferred text editor and update the values accordingly.

### 3. Docker Setup

Build and start the Docker containers:

```bash
docker-compose up --build
```

This command builds the Docker image and starts the containers as defined in docker-compose.yml. The application will be running on port 3000 by default.

### Install Dependencies

While the Docker container usually handles this automatically, you can manually install the project dependencies if necessary:

```bash
npm install
```

### Running the Application

With Docker, the application should start automatically after the containers are up. However, if you're running the application locally:

```bash
npm start
```
This command will build the TypeScript files and then start the application.

### Accessing the Application

Once the application is running, access it by navigating to http://localhost:3000 in your web browser (or the port you configured).

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

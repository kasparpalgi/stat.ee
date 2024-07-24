# Stat-ee

**Note:** Due to limitations on access to Oracle and unsuccessful cloud signups, the development of this project was initially carried out using PostgreSQL. The instructions provided here have not been tested with Oracle XE on Arm MacOS as intended. Developers which are encountering issues when migrating to Oracle are advised to provide detailed error messages for troubleshooting assistance.

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

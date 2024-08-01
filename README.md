# Stat-ee

### Installation
- [docker-compose](install-manifests/docker-compose/README.md)
- [docker-run](install-manifests/docker-run/README.md)

#### Routes
```http
GET /eestat/1/elujoud/:id - Get the compani reg. number
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

### Open the docs

Open your terminal and run:

```bash
npm i -g mintlify
```

Navigate to the docs folder:

```bash
cd stat-ee/docs
```
Start the development server:

```bash
mintlify dev
```

This opens the docs in your web browser, usually at http://localhost:4111/.
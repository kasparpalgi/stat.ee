# Stat-ee

### What to expect from the API
#### Routes
```http
GET /eestat/1/elujoud/:id - Get the company based on registration number
```
```http
POST /eestat/1/elujoud - Get the company data with JSON body
``` 

#### The request will fail if:
- Company ID isn't exactly 8 digits
- Cluster value isn't valid
- All fields are null

#### How it works:
- With complete data:
  - All 5 models will give you predictions (y1, y2, y3)

- With missing monthly data:
  - Models 1-4 work normally
  - Model 5 returns null
  - Monthly stats return null

- With some missing monthly data:
  - Up to 3 missing months: Model 5 still works
  - More than 3 missing months: Model 5 returns null

#### Quick note on data processing:
- Annual data works independently of monthly data
- Monthly stats only show up if monthly data exists
- You can have up to 3 missing fields before Model 5 stops working

### Installation
- [docker-compose](install-manifests/docker-compose/README.md)
- [docker-run](install-manifests/docker-run/README.md)

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

## Building the Docer image - Using the script

[/docker_build.sh](docker_build.sh)

#### Navigate in the project root directory.

#### Make the script executable by running:

`chmod +x build-docker.sh`

Execute the script:

`./build-docker.sh`

#### Or using a single command:

`docker build -t stat-ee:latest . && docker save -o stat-ee.tar stat-ee:latest`


## New Route

## POST /eestat/1/elujoud

This route allows you to get company predictions by providing JSON data directly, rather than using a company ID.


## Building the JSON

### Request Format

The request body should be a JSON object with the following structure:



### Company Data
From `company_year_repository.ts`:

#### Query to Use

The CompanyRepository class provides two key methods for retrieving company data:
##### For `company` data:
   - Filters for companies with maa_protsent >= 90%
   - Returns most recent valid year's data
   ```sql
   WITH Filtered AS (
       SELECT * 
       FROM "ELUJOULISUSEINDEKS"."AASTASED"
       WHERE "jykood" = :jykood
       ORDER BY "aasta" DESC
       FETCH FIRST 2 ROWS ONLY
   )
   SELECT *
   FROM Filtered 
   WHERE "maa_protsent" >= 0.9
   ORDER BY "aasta" DESC
   FETCH FIRST 1 ROW ONLY
   ```

##### For `lastYearCompany` data:
   - Gets most recent year without filtering
   - Used for prediction target year
   ```sql
   SELECT *
   FROM "ELUJOULISUSEINDEKS"."AASTASED"
   WHERE "jykood" = :jykood
   ORDER BY "aasta" DESC
   FETCH FIRST 1 ROWS ONLY
   ```

Both queries return data in this structure:

```json
{
  // ...
  "company": {
      "jykood": "string",
      "klaster": "string",
      "aasta": "number",
      "emtak": "string",
      "sektor_nr": "number",
      "ettevotte_suurusklass": "number",
      "maakond": "number",
      "kov": "number"
  },
  "lastYearCompany": {
      "jykood": "string",
      "klaster": "string",
      "aasta": "number",
      "emtak": "string",
      "sektor_nr": "number",
      "ettevotte_suurusklass": "number",
      "maakond": "number",
      "kov": "number"
  }
  // ...
}
```

#### Monthly MEA Query
From `norm_monthly_repository.ts`:
##### Query to Use
```sql
SELECT *
    FROM "ELUJOULISUSEINDEKS"."NORM_KUU_KESK"
    WHERE "klaster" = :klaster
FETCH FIRST 1 ROWS ONLY
```
 
#### Monthly SDS Query
From norm_monthly_repository.ts:
##### Query to Use
```sql
SELECT *
    FROM "ELUJOULISUSEINDEKS"."NORM_KUU_SDS"
    WHERE "klaster" = :klaster
FETCH FIRST 1 ROWS ONLY
```
##### JSON Structure:
```json
{ 
  // ...
  "monthlyMea": {
    // Fields from NORM_KUU_KESK query
  },
  "monthlySds": {
    // Fields from NORM_KUU_SDS query
  },
  "yearlyMea": {
    // Fields from NORM_AASTA_KESK query
  },
  "yearlySds": {
    // Fields from NORM_AASTA_SDS query
  }
  // ...
}
```


### Monthly Data
From `norm_monthly_repository.ts`:
#### Query to Use
```sql
SELECT *
    FROM "ELUJOULISUSEINDEKS"."KUISED"
    WHERE "kood" = :kood
FETCH FIRST 1 ROWS ONLY 
```

#### JSON Structure
```json
{
  // ...
  "monthly": {
    "emtak08": "number",
    "emtak_estat": "string", 
    "maa": "number",
    "vald": "number",
    "tarv_h": "number",
    "oig_grupp": "string",
    "sektor_nr": "number",
    "sektor": "string",
    "kmd_m_min12": "number"
    // ... other monthly metrics
  }
  // ...
}
```


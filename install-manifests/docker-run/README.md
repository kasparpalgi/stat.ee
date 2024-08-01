
1. **Generate Certificates**  
   Follow the steps from [Generate SSL Certificates](#generate-ssl-certificates) guide.
   - **Example**:  
     ```sh
     certs/
     ├── cert.pem
     └── key.pem
     ```
   
2. **Add TensorFlow Models**  
   Follow the steps from [Model Conversion](https://www.tensorflow.org/js/guide/conversion) guide.
   Add the TensorFlow models to the `models/` folder.

   - **Structure**:  
     - Each model should be in a separate folder.
     - Each folder should contain two files:
       - `model.json`
       - `group1-shard1of1.bin`
   - **Folder Naming**:  
     - The folder name should be the same as the model name.
   - **Example**:  
     ```sh
     models/
     ├── efektiivsus_k4_1/
     │   ├── group1-shard1of1.bin
     │   └── model.json
     ├── efektiivsus_k4_2/
     │   ├── group1-shard1of1.bin
     │   └── model.json
     └── efektiivsus_k4_3/
     │   ├── group1-shard1of1.bin
     │   └── model.json
     ```

3. **Copy Environment File**  
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
Go to http://localhost:80 in your browser.


## Generate SSL Certificates

This guide will help you generate self-signed SSL certificates using OpenSSL.

### Prerequisites

- [OpenSSL](https://www.openssl.org/) must be installed on your system.
  - **macOS**: Install via Homebrew:
    ```bash
    brew install openssl
    ```
  - **Windows**: Download and install from the [OpenSSL website](https://www.openssl.org/).
  - **Linux**: Install via package manager:
    ```bash
    sudo apt-get install openssl
    ```

## Steps to Generate SSL Certificates

Navigate to your project's root directory and create a directory named `certs`:
```bash
mkdir certs
```
Generate a Private Key
Run the following command to generate a private key:

```bash
openssl genpkey -algorithm RSA -out certs/key.pem
```
Generate a Certificate Signing Request (CSR)
Create a CSR by running:

```bash
openssl req -new -key certs/key.pem -out certs/csr.pem
```
You will be prompted to enter information about the certificate. You can fill these fields with any values you prefer. Example:

```less
Country Name (2 letter code) [AU]: EE
State or Province Name (full name) [Some-State]: Tartu
Locality Name (eg, city) []: Tartu
Organization Name (eg, company) [Internet Widgits Pty Ltd]: My Company
Organizational Unit Name (eg, section) []: IT
Common Name (e.g. server FQDN or YOUR name) []: ee-stat
Email Address []: admin@mycompany.com
```

Generate the Self-Signed Certificate
Use the CSR to generate a self-signed certificate:

```bash
openssl x509 -req -days 365 -in certs/csr.pem -signkey certs/key.pem -out certs/cert.pem
```
This command will create a certificate (cert.pem) that is valid for 365 days.

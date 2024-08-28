/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import https from "https";
import dotenv from "dotenv";
import { debugLogError } from "./logger";

dotenv.config();

const { PORT, SSL } = process.env;
const port = PORT || 80;
const ssl = SSL === "true";

export function runApp(app: any) {
  try {
    if (ssl) {
      runHTTPS(app);
    } else {
      runHTTP(app);
    }
  } catch (error) {
    debugLogError(error);
    if (error.message == "Exit the application") {
      console.log("Exiting the application");
    } else if (error.message == "SSL certificate not found") {
      console.log(
        "A SSL certificate is required to run the server in HTTPS mode."
      );
      console.log(
        "You can generate a self-signed certificate by following the instructions in the README.md file."
      );
    } else {
      console.log("An unexpected error occurred while starting the server.");
      console.log(
        `Please check the error message for more details: ${error.message}`
      );
    }
    process.exit(1);
  }
}

function runHTTPS(app: any) {
  console.log("Server is configured to run in HTTPS mode");
  try {
    const credentials = sslCertificate();
    // Start HTTPS server
    https.createServer(credentials, app).listen(port, () => {
      if (port === "443") {
        console.log(`HTTPS server running on port https://localhost`);
      } else {
        console.log(`HTTPS server running on port https://localhost:${port}`);
      }
    });
  } catch (error) {
    debugLogError(error);
    if (error.message == "SSL certificate not found") {
      throw new Error("SSL certificate not found");
    } else {
      throw new Error("Exit the application");
    }
  }
}

function runHTTP(app: any) {
  console.log("Server is configured to run in HTTP mode");
  try {
    // Start HTTP server
    app.listen(port, () => {
      if (port === "80") {
        console.log(`HTTP server running on port http://localhost`);
      } else {
        console.log(`HTTP server running on port http://localhost:${port}`);
      }
    });
  } catch (error) {
    debugLogError(error);
    throw new Error("Exit the application");
  }
}

export function sslCertificate() {
  try {
    // Path to SSL certificate and key
    const privateKeyPath = path.join(process.cwd(), "certs", "key.pem");
    const certificatePath = path.join(process.cwd(), "certs", "cert.pem");
    console.log(`Reading SSL certificate and key...`);
    // Read SSL certificate and key
    const privateKey = fs.readFileSync(privateKeyPath, "utf8");
    const certificate = fs.readFileSync(certificatePath, "utf8");

    return { key: privateKey, cert: certificate };
  } catch (error) {
    debugLogError(error);
    throw new Error("SSL certificate not found");
  }
}

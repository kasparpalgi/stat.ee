#!/bin/bash

# Exit on any error
set -e

# Check if running on Linux
if [[ "$(uname)" != "Linux" ]]; then
    echo "Error: This script only works on Linux systems"
    exit 1
fi

echo "Starting Oracle Instant Client installation..."

# Create directories
sudo mkdir -p /opt/oracle/instantclient
sudo mkdir -p /opt/oracle/instantclient/network/admin

# Install required packages
echo "Installing required packages..."
sudo apt-get update
sudo apt-get install -y unzip libaio1 curl

# Navigate to the directory
cd /opt/oracle/instantclient

# Download Oracle Instant Client files
echo "Downloading Oracle Instant Client files..."
sudo curl -O https://download.oracle.com/otn_software/linux/instantclient/2112000/instantclient-basic-linux.x64-21.12.0.0.0dbru.zip
sudo curl -O https://download.oracle.com/otn_software/linux/instantclient/2112000/instantclient-sqlplus-linux.x64-21.12.0.0.0dbru.zip
sudo curl -O https://download.oracle.com/otn_software/linux/instantclient/2112000/instantclient-sdk-linux.x64-21.12.0.0.0dbru.zip

# Unzip files
echo "Extracting files..."
sudo unzip -o instantclient-basic-linux.x64-21.12.0.0.0dbru.zip
sudo unzip -o instantclient-sqlplus-linux.x64-21.12.0.0.0dbru.zip
sudo unzip -o instantclient-sdk-linux.x64-21.12.0.0.0dbru.zip

# Move files from versioned directory to main instantclient directory
echo "Moving files to correct location..."
sudo cp -r instantclient_21_12/* /opt/oracle/instantclient/
sudo rm -rf instantclient_21_12

# Create symbolic links
echo "Creating symbolic links..."
cd /opt/oracle/instantclient
sudo ln -sf libclntsh.so.21.1 libclntsh.so
sudo ln -sf libocci.so.21.1 libocci.so

# Set permissions
echo "Setting permissions..."
sudo chown -R $USER:$USER /opt/oracle
sudo chmod -R 755 /opt/oracle

# Configure library path
echo "Configuring library path..."
sudo sh -c 'echo /opt/oracle/instantclient > /etc/ld.so.conf.d/oracle-instantclient.conf'
sudo ldconfig

# Clean up zip files
echo "Cleaning up..."
cd /opt/oracle/instantclient
sudo rm -f *.zip

# Verify installation
echo "Verifying installation..."
if [ -f /opt/oracle/instantclient/libclntsh.so ]; then
    echo "✅ Oracle Instant Client installed successfully!"
    echo "Library path: $(ls -l /opt/oracle/instantclient/libclntsh.so)"
else
    echo "❌ Installation may have failed. Please check the logs above."
fi

echo "Installation complete!"
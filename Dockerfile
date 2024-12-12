FROM oraclelinux:9

# Install NodeJS 18
RUN dnf -y module enable nodejs:18 && \
    dnf -y install nodejs nodejs-nodemon npm

# Install Oracle Instant Client
RUN dnf -y install oracle-instantclient-release-23ai-el9 && \
    dnf -y install oracle-instantclient-basic && \
    dnf -y install oracle-instantclient-devel oracle-instantclient-sqlplus && \
    rm -rf /var/cache/dnf

# Create non-root user
RUN groupadd --system appgroup && useradd --system --gid appgroup --home /home/appuser appuser

WORKDIR /home/appuser/stat-ee

# Create directories with proper permissions
RUN mkdir -p \
    /home/appuser/stat-ee/certs \
    /home/appuser/stat-ee/models \
    /usr/lib/oracle/23/client64/lib/network/admin && \
    chown -R appuser:appgroup /home/appuser/stat-ee

# Copy package files and install dependencies  
COPY package*.json ./
RUN npm install && npm install -g @vercel/ncc

# Copy application files
COPY . .
RUN npm run pack

# Set up volumes for certificates, models and Oracle config
VOLUME ["/home/appuser/stat-ee/certs", "/home/appuser/stat-ee/models", "/usr/lib/oracle/23/client64/lib/network/admin"]

# Set Oracle environment variables
ENV LD_LIBRARY_PATH=/usr/lib/oracle/23/client64/lib:$LD_LIBRARY_PATH \
    PATH=/usr/lib/oracle/23/client64/bin:$PATH \
    TNS_ADMIN=/usr/lib/oracle/23/client64/lib/network/admin

USER appuser

CMD ["node", "dist/index.js"]

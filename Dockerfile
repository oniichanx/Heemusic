# Stage 1: Build TypeScript
FROM node:21 As builder

WORKDIR /opt/heemusic/

# Copy package files and install dependencies
COPY package*.json ./

# Install necessary tools and update npm
RUN apt-get update && apt-get install -y openssl git \
    && npm install -g npm@latest

RUN npm install
RUN npm config set global --legacy-peer-deps

# Copy source code
COPY . .

# Copy tsconfig.json
COPY tsconfig.json ./
# Copy prisma
COPY prisma ./prisma
# Generate Prisma client
RUN npx prisma db push
# Build TypeScript
RUN npm run build

# Stage 2: Create production image
FROM node:21-slim

ENV NODE_ENV=production

WORKDIR /opt/heemusic/

# Install necessary tools
RUN apt-get update && apt-get install -y openssl

# Copy compiled code and other necessary files from the builder stage
COPY --from=builder /opt/heemusic/dist ./dist
COPY --from=builder /opt/heemusic/src/utils/LavaLogo.txt ./src/utils/LavaLogo.txt
COPY --from=builder /opt/heemusic/prisma ./prisma
COPY --from=builder /opt/heemusic/scripts ./scripts
COPY --from=builder /opt/heemusic/package*.json ./

RUN npm install --omit=dev

RUN npx prisma generate
RUN npx prisma db push

# Ensure application.yml is a file, not a directory
RUN rm -rf /opt/heemusic/application.yml && \
    touch /opt/heemusic/application.yml

# Run as non-root user
RUN addgroup --gid 322 --system heemusic && \
    adduser --uid 322 --system heemusic

# Change ownership of the folder
RUN chown -R heemusic:heemusic /opt/heemusic/

# Switch to the appropriate user
USER heemusic

CMD ["node", "dist/index.js"]
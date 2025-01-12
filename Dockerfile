# Build stage
FROM oven/bun:1.1.43 AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY bun.lockb ./

# Install dependencies
RUN bun install

# Copy application files
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1.1.43-alpine
WORKDIR /app

# Copy only the necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/bun.lockb ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start"]
# ---------- FRONTEND BUILD STAGE ----------
FROM node:22.17.0 AS frontend

# Set working directory
WORKDIR /app

# Copy and install frontend dependencies
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy frontend source and build
COPY frontend ./frontend
RUN cd frontend && npm run build



# ---------- BACKEND STAGE ----------
FROM node:22.17.0 AS backend

# Set working directory
WORKDIR /app

# Copy and install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy backend source
COPY backend ./backend

# Copy built frontend into backend's public folder
COPY --from=frontend /app/frontend/dist ./backend/public

# Expose backend port
EXPOSE 5000

# Set environment variables (optional)
ENV NODE_ENV=production
ENV PORT=5000

# Set working directory to backend
WORKDIR /app/backend

# Start the backend
CMD ["npm", "start"]

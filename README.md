# Production Deployment Repository

This repository contains the necessary files to deploy the application to a production environment using Docker.

## Deployment Steps

### 1. Prerequisites

- Docker and Docker Compose installed on your VPS.
- A domain name pointing to your VPS IP address.
- Your application's frontend and backend have been built.

### 2. Prepare Build Artifacts

1.  **Build your frontend application** (e.g., `npm run build`).
2.  Copy the entire contents of the resulting `dist` folder into the `frontend-dist` directory in this repository.

3.  **Build your backend application** (e.g., `npm run build`).
4.  Copy the entire contents of the resulting `dist` or `build` folder into the `backend-dist` directory.
    *   **Important**: Make sure `package.json` and `package-lock.json` are included in the `backend-dist` directory for installing production dependencies.

### 3. Configure

1.  Update `nginx/conf.d/default.conf` with your actual domain name.
2.  Update `.env.production` with your production secrets and configuration.

### 4. Deploy to VPS

1.  Copy this entire `deployment_repo` directory to your VPS.
2.  Navigate into the directory on your VPS:
    ```bash
    cd /path/to/deployment_repo
    ```
3.  Run Docker Compose:
    ```bash
    docker-compose up -d --build
    ```

### 5. (Optional) Setup HTTPS with Let's Encrypt

After deploying, you can set up SSL:

1.  SSH into your VPS and navigate to the `deployment_repo` directory.
2.  Run Certbot:
    ```bash
    docker-compose run --rm certbot certonly --webroot --webroot-path /var/www/html --email your-email@example.com --agree-tos --no-eff-email -d your_domain.com
    ```
3.  Uncomment the SSL configuration in `nginx/conf.d/default.conf` and restart Nginx:
    ```bash
    docker-compose restart nginx
    ```

# Deployment Setup

This directory contains the webhook listener and deployment scripts for automated CI/CD.

## Setup Instructions

### 1. Install Dependencies
```bash
cd deployment
npm install  # No external dependencies needed - uses Node.js built-ins only
```

### 2. Start the Webhook Listener

The webhook script uses command-line arguments for configuration.

**With Node.js:**
```bash
node webhook.js --port 9000 --secret YOUR_GITHUB_WEBHOOK_SECRET
```

**With PM2 (recommended for production):**
```bash
pm2 start webhook.js --name "frontend-webhook" -- --port 9000 --secret YOUR_GITHUB_WEBHOOK_SECRET
```

**Arguments:**
| Arg | Description | Default |
|-----|-------------|---------|
| `--port` | Port to listen on | 9000 |
| `--secret` | GitHub webhook secret (required) | - |

### 3. Configure GitHub Webhook (Alternative to GitHub Actions)

If you want to use GitHub's native webhooks instead of GitHub Actions:

1. Go to your repository settings → Webhooks → Add webhook
2. Set Payload URL to: `http://your-server:9000`
3. Set Content type to: `application/json`
4. Set Secret to: same value as `--secret`
5. Select events: Just the push event
6. Save

### 4. Configure GitHub Actions (Recommended)

The `.github/workflows/deploy.yml` file is already configured. You need to add secrets:

1. Go to repository settings → Secrets and variables → Actions
2. Add `WEBHOOK_URL`: `http://your-server:9000`
3. Add `WEBHOOK_SECRET`: your secret value

## How It Works

1. Push to `main` branch triggers GitHub Actions
2. GitHub Actions sends a signed webhook to your server
3. Webhook listener verifies the HMAC signature
4. If valid, triggers `deploy.sh` script
5. Deploy script pulls latest code and rebuilds

## Security

- Uses HMAC SHA256 signature verification
- Only accepts POST requests
- Only deploys on `main` branch pushes
- Requires `--secret` argument

## PM2 Management

```bash
# View logs
pm2 logs frontend-webhook

# Restart
pm2 restart frontend-webhook

# Stop
pm2 stop frontend-webhook

# Save PM2 config for auto-restart on reboot
pm2 save
pm2 startup
```

## Deployment Notes

**Note:** This frontend does NOT use Docker. The `deploy.sh` script:
1. Navigates to project root
2. Pulls latest code
3. Installs dependencies with `npm install`
4. Builds with `npm run build`

The build output will be in the `dist/` or `build/` directory (depending on your Vite config).

You should serve this build output using:
- A web server (nginx, Apache)
- A static hosting service (Vercel, Netlify, GitHub Pages)
- Or a Node.js server like `serve`

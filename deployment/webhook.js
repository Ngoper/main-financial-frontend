const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');
const path = require('path');

// --- ARGUMENT PARSING ---
const args = process.argv.slice(2);

function getArgValue(flag) {
    const index = args.indexOf(flag);
    if (index !== -1 && args.length > index + 1) {
        return args[index + 1];
    }
    return null;
}

// --- CONFIGURATION ---
const portArg = getArgValue('--port');
const PORT = portArg ? parseInt(portArg, 10) : 9000;
const SECRET = getArgValue('--secret');

// --- LOGGING ---
function log(msg, type = 'INFO') {
    console.log(`[${new Date().toISOString()}] [${type}] ${msg}`);
}

if (!SECRET) {
    log('Missing --secret argument. Exiting.', 'FATAL');
    log('Usage: node webhook.js --port <port> --secret <webhook_secret>');
    process.exit(1);
}

// --- SERVER ---
const server = http.createServer((req, res) => {
    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
        return;
    }

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const signature = req.headers['x-hub-signature-256'];
        const event = req.headers['x-github-event'];

        // 1. Verify Signature
        if (!signature) {
            log('Missing X-Hub-Signature-256 header', 'WARN');
            res.writeHead(401, { 'Content-Type': 'text/plain' });
            res.end('Unauthorized: Missing signature');
            return;
        }

        const hmac = crypto.createHmac('sha256', SECRET);
        const digest = 'sha256=' + hmac.update(body).digest('hex');

        if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
            log('Invalid signature', 'WARN');
            res.writeHead(401, { 'Content-Type': 'text/plain' });
            res.end('Unauthorized: Invalid signature');
            return;
        }

        // 2. Parse Payload
        let payload;
        try {
            payload = JSON.parse(body);
        } catch (e) {
            log('Invalid JSON payload', 'ERROR');
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Bad Request: Invalid JSON');
            return;
        }

        // 3. Handle Ping Event
        if (event === 'ping') {
            log('Received ping event');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Ping received');
            return;
        }

        // 4. Check branch (only main/master)
        const ref = payload.ref;
        if (ref && !ref.includes('main') && !ref.includes('master')) {
            log(`Ignored ref: ${ref}`, 'INFO');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Ignored: Not main branch');
            return;
        }

        // 5. Trigger Deployment
        log('Triggering deployment...');

        const deployScript = path.join(__dirname, 'deploy.sh');

        // Execute from the deployment directory
        exec(`bash "${deployScript}"`, { cwd: __dirname }, (error, stdout, stderr) => {
            if (error) {
                log(`Deployment error: ${error.message}`, 'ERROR');
                log(`stderr: ${stderr}`, 'ERROR');
            } else {
                log('Deployment completed successfully');
            }
            if (stdout) log(`stdout: ${stdout}`);
        });

        // Respond immediately
        res.writeHead(202, { 'Content-Type': 'text/plain' });
        res.end('Accepted: Deployment triggered');
    });
});

server.listen(PORT, () => {
    log(`Webhook listener running on port ${PORT}`);
});

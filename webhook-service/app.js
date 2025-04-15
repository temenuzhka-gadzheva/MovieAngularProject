const express = require('express');
const { exec } = require('child_process');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const secret = process.env.WEBHOOK_SECRET || 'your-webhook-secret';

function verifySignature(req) {
    const signature = req.headers['x-hub-signature-256'];
    if (!signature) return false;
    
    const hmac = crypto.createHmac('sha256', secret);
    const digest = 'sha256=' + hmac.update(JSON.stringify(req.body)).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

app.post('/webhook', (req, res) => {
    // Verify webhook signature
    if (!verifySignature(req)) {
        return res.status(401).send('Invalid signature');
    }

    // Handle push event
    if (req.headers['x-github-event'] === 'push') {
        console.log('Received push event, updating application...');

        // Execute update script
        exec('sh /app/update.sh', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`);
                return res.status(500).send('Update failed');
            }
            console.log(`Update successful: ${stdout}`);
            res.status(200).send('Update successful');
        });
    } else {
        res.status(200).send('Event received');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Webhook service listening on port ${PORT}`);
}); 
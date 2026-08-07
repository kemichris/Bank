import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { seedRoles } from './seeders/seedRoles.js';

// Load environment variables from .env file
dotenv.config();

const { default: app } = await import("./app.js");

const PORT = process.env.PORT

// Connect to the database
await connectDB();
await seedRoles();

import net from 'node:net';

const socket = new net.Socket();

socket.setTimeout(10000);

socket.on('connect', () => {
    console.log('✅ TCP connection to SMTP server established');
    socket.destroy();
});

socket.on('timeout', () => {
    console.log('❌ TCP connection to SMTP server timed out');
    socket.destroy();
});

socket.on('error', (error) => {
    console.log('❌ SMTP TCP error:', error.message);
});

socket.connect(465, 'server407.web-hosting.com');

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
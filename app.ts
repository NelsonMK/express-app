import express from 'express';

import { router } from './src//controllers/route.controller';
import { authenticate } from './src/middlewares/auth';
import { rateLimiter } from './src/middlewares/rate-limiter';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Apply rate limiter middleware globally
// we need it to run before authentication to limit requests even from unauthenticated users
app.use(rateLimiter);

// I am implementing a simple health check and public route directly here
// as they don't require any special controller logic
// and also to ensure they are accessible without authentication
app.get('/health', (_req, res) => {
	res.json({ status: 'ok' });
});

app.get('/publicPublic', (_req, res) => {
	res.json({ message: 'This is a public route' });
});

// Register the main router for other routes
app.use('/', router);

app.get('/', (_req, res) => {
	res.send('Hello TypeScript 🚀');
});

app.listen(3000, () => {
	console.log('Server running on http://localhost:3000');
});

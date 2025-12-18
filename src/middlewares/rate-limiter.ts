import { Request, Response, NextFunction } from 'express';

type RateLimitEntry = {
	count: number;
	resetTime: number;
};

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;

// In-memory store
const store = new Map<string, RateLimitEntry>();

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
	// Identify user by x-user-id header or IP address in case header is missing
	const userId = (req.headers['x-user-id'] as string | undefined) || req.ip;

	if (!userId) {
		return res.status(400).json({
			error: 'x-user-id header is required',
		});
	}

	const now = Date.now();
	const entry = store.get(userId);

	// First request or window expired
	if (!entry || now > entry.resetTime) {
		store.set(userId, {
			count: 1,
			resetTime: now + WINDOW_MS,
		});
		return next();
	}

	// Exceeded limit
	if (entry.count >= MAX_REQUESTS) {
		return res.status(429).json({
			error: 'Too many requests',
			retryAfter: Math.ceil((entry.resetTime - now) / 1000),
		});
	}

	// Increment count
	entry.count += 1;
	next();
}

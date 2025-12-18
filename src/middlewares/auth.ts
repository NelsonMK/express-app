import { Request, Response, NextFunction } from 'express';

export type UserRole = 'user' | 'admin';

export interface AuthenticatedRequest extends Request {
	user?: {
		role: UserRole;
	};
}

// Middleware to authenticate user based on x-user-role header
export function authenticate(
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) {
	const role = req.headers['x-user-role'] as string | undefined;

	if (!role) {
		return res.status(401).json({
			error: 'User role is required',
		});
	}

	if (role !== 'user' && role !== 'admin') {
		return res.status(401).json({
			error: 'Invalid user role',
		});
	}

	req.user = { role };

	next();
}

// middleware to authorize user based on their role
export function authorize(...allowedRoles: UserRole[]) {
	return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		if (!req.user) {
			return res.status(401).json({
				error: 'Unauthenticated',
			});
		}

		if (!allowedRoles.includes(req.user.role)) {
			return res.status(403).json({
				error: 'Forbidden: insufficient permissions',
			});
		}

		next();
	};
}

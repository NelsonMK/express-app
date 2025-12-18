import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import { appService } from '../services/app.service';

const router = Router();

// Authenticated routes, register the authenticate middleware
// so that all routes can get access to the role from headers
router.use(authenticate);

// Protected route - accessible by 'user' and 'admin'
router.get(
	'/user/dataAccessible',
	authorize('user', 'admin'),
	async (_req, res) => {
		try {
			const data = await appService.getUserData();

			return res.json(data);
		} catch (error) {
			return res.status(500).json({ error: 'Internal Server Error' });
		}
	}
);

// Admin-only route - accessible only by 'admin'
router.get('/admin/dataRestricted', authorize('admin'), async (_req, res) => {
	try {
		const data = await appService.getAdminData();

		return res.json(data);
	} catch (error) {
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});

export { router };

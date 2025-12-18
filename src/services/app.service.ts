/**
 * This is the business logic that is responsible for interacting with the database
 */

class AppService {
	async getUserData() {
		return { name: 'John Doe', age: 30 };
	}

	async getAdminData() {
		return { name: 'Admin User', privileges: ['read', 'write', 'delete'] };
	}
}

const appService = new AppService();

export { appService };

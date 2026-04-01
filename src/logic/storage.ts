const STORAGE_KEY_USERS = 'german_master_users_v2';
const STORAGE_KEY_SESSION = 'german_master_session_v2';

export class StorageManager {
    static getUsers() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '{}'); } catch { return {}; } }
    static saveUser(username: string, data: any) {
        const users = this.getUsers();
        users[username] = data;
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    }
    static getUser(username: string) { return this.getUsers()[username] || null; }
    static persistSession(username: string) { localStorage.setItem(STORAGE_KEY_SESSION, username); }
    static clearSession() { localStorage.removeItem(STORAGE_KEY_SESSION); }
    static getActiveSession() { return localStorage.getItem(STORAGE_KEY_SESSION); }
}

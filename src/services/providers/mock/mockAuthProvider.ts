import { AdminUser } from '../../../types/cms';
import { AuthCredentials, IAuthService } from '../../cms/types';

const AUTH_SESSION_KEY = 'commerceforge_cms_auth_session';

export class MockAuthProvider implements IAuthService {
  private currentUser: AdminUser | null = null;

  constructor() {
    this.currentUser = this.loadSession();
  }

  private loadSession(): AdminUser | null {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem(AUTH_SESSION_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }

  private saveSession(user: AdminUser | null) {
    if (typeof window === 'undefined') return;
    try {
      if (user) {
        localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_SESSION_KEY);
      }
    } catch (e) {
      console.warn('Failed to save session:', e);
    }
  }

  async login(credentials: AuthCredentials): Promise<AdminUser> {
    // Artificial latency to simulate real network request
    await new Promise((res) => setTimeout(res, 600));

    const email = (credentials.email || '').trim().toLowerCase();
    const password = credentials.password || '';

    // Standard client validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      throw new Error('Please enter a valid email address.');
    }

    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    // In mock provider mode, generate a mock authenticated user session.
    // When Firebase Auth is plugged in, this will call `signInWithEmailAndPassword(auth, email, password)`.
    const user: AdminUser = {
      id: `admin-${Date.now()}`,
      email: email,
      name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Studio Admin',
      role: 'superadmin',
      lastLogin: new Date().toISOString(),
    };

    this.currentUser = user;
    this.saveSession(user);
    return user;
  }

  async logout(): Promise<void> {
    await new Promise((res) => setTimeout(res, 200));
    this.currentUser = null;
    this.saveSession(null);
  }

  async getCurrentUser(): Promise<AdminUser | null> {
    if (!this.currentUser) {
      this.currentUser = this.loadSession();
    }
    return this.currentUser ? { ...this.currentUser } : null;
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    await new Promise((res) => setTimeout(res, 600));
    const trimmed = (email || '').trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@')) {
      throw new Error('Please enter a valid email to receive password reset instructions.');
    }
    // Resolves successfully in mock mode.
    // When Firebase Auth is connected, this will call `sendPasswordResetEmail(auth, email)`.
  }
}

export const mockAuthProvider = new MockAuthProvider();

/**
 * Firebase Adapter Skeleton (Unconnected Placeholder)
 * 
 * NOTE: This file does NOT initialize or import Firebase.
 * When you are ready to connect Firebase yourself, install firebase:
 *   npm install firebase
 * and implement these methods with Firestore, Firebase Auth, and Firebase Storage.
 */

import {
  WebsiteContent,
  PortfolioProject,
  PricingPackage,
  ProcessStepItem,
  FAQItem,
  MediaAsset,
  AdminUser,
} from '../../../types/cms';
import {
  IContentService,
  IAuthService,
  IMediaService,
  AuthCredentials,
} from '../../cms/types';

export class FirebaseContentProviderTemplate implements IContentService {
  async getWebsiteContent(_previewDraft: boolean = false): Promise<WebsiteContent> {
    throw new Error('Firebase is not yet connected. Using mock provider.');
  }

  async updateWebsiteContent(_content: Partial<WebsiteContent>): Promise<WebsiteContent> {
    throw new Error('Firebase is not yet connected. Using mock provider.');
  }

  async getSection<K extends keyof WebsiteContent>(_sectionKey: K, _previewDraft: boolean = false): Promise<WebsiteContent[K]> {
    throw new Error('Firebase is not yet connected. Using mock provider.');
  }

  async updateSection<K extends keyof WebsiteContent>(_sectionKey: K, _data: WebsiteContent[K]): Promise<WebsiteContent[K]> {
    throw new Error('Firebase is not yet connected. Using mock provider.');
  }

  async publishAll(): Promise<WebsiteContent> {
    throw new Error('Firebase is not yet connected. Using mock provider.');
  }

  async discardDrafts(): Promise<WebsiteContent> {
    throw new Error('Firebase is not yet connected. Using mock provider.');
  }
}

export class FirebaseAuthProviderTemplate implements IAuthService {
  async login(_credentials: AuthCredentials): Promise<AdminUser> {
    throw new Error('Firebase Auth is not yet connected. Using mock provider.');
  }

  async logout(): Promise<void> {
    throw new Error('Firebase Auth is not yet connected. Using mock provider.');
  }

  async getCurrentUser(): Promise<AdminUser | null> {
    return null;
  }

  async sendPasswordResetEmail(_email: string): Promise<void> {
    throw new Error('Firebase Auth is not yet connected. Using mock provider.');
  }
}

export class FirebaseMediaProviderTemplate implements IMediaService {
  async getMedia(): Promise<MediaAsset[]> {
    throw new Error('Firebase Storage is not yet connected. Using mock provider.');
  }

  async uploadMedia(_file: File, _metadata?: { altText?: string }): Promise<MediaAsset> {
    throw new Error('Firebase Storage is not yet connected. Using mock provider.');
  }

  async deleteMedia(_id: string): Promise<void> {
    throw new Error('Firebase Storage is not yet connected. Using mock provider.');
  }
}

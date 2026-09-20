import { MediaAsset } from '../../../types/cms';
import { IMediaService } from '../../cms/types';
import { INITIAL_MEDIA_ASSETS } from './initialData';

const MEDIA_STORAGE_KEY = 'commerceforge_cms_media_assets_v1';

export class MockMediaProvider implements IMediaService {
  private mediaList: MediaAsset[];

  constructor() {
    this.mediaList = this.loadFromStorage() || JSON.parse(JSON.stringify(INITIAL_MEDIA_ASSETS));
  }

  private loadFromStorage(): MediaAsset[] | null {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem(MEDIA_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }

  private persist() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(this.mediaList));
    } catch (e) {
      console.warn('Failed to persist media assets (storage quota might be exceeded):', e);
    }
  }

  async getMedia(): Promise<MediaAsset[]> {
    return JSON.parse(JSON.stringify(this.mediaList)).sort(
      (a: MediaAsset, b: MediaAsset) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async uploadMedia(file: File, metadata?: { altText?: string }): Promise<MediaAsset> {
    // Artificial latency for realistic progress state
    await new Promise((res) => setTimeout(res, 700));

    // Convert to local Data URL for client-side persistence and preview
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const newAsset: MediaAsset = {
      id: `media-${Date.now()}`,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type || 'image/png',
      url: dataUrl,
      altText: metadata?.altText || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      uploadedBy: 'Studio Admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.mediaList.unshift(newAsset);
    this.persist();
    return newAsset;
  }

  async deleteMedia(id: string): Promise<void> {
    this.mediaList = this.mediaList.filter((m) => m.id !== id);
    this.persist();
  }
}

export const mockMediaProvider = new MockMediaProvider();

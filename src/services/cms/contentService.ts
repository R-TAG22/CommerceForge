import { mockContentProvider } from '../providers/mock/mockContentProvider';
import { IContentService } from './types';

// The application interacts with this abstract content service.
// Currently it delegates to mockContentProvider.
// When Firebase is connected later by the user, this can simply delegate to FirebaseContentProvider.
export const contentService: IContentService = mockContentProvider;

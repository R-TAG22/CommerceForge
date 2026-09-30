import { mockAuthProvider } from '../providers/mock/mockAuthProvider';
import { IAuthService } from './types';

export const authService: IAuthService = mockAuthProvider;

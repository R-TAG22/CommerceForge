import { mockContentProvider } from '../providers/mock/mockContentProvider';
import { IPortfolioService, IPackageService, IProcessService, IFAQService } from './types';

export const portfolioService: IPortfolioService = mockContentProvider;
export const packageService: IPackageService = mockContentProvider;
export const processService: IProcessService = mockContentProvider;
export const faqService: IFAQService = mockContentProvider;

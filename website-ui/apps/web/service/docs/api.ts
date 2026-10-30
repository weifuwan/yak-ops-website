import { apiRequest, postJson } from '@/service/http/client';
import type {
  DocsDocument,
  DocsNavigation,
  DocsSearchHistoryItem,
  DocsSearchHistoryRequest,
  DocsSearchResponse,
} from './types';

const DOCS_API = '/api/v1/docs';

export const getDocsDocument = (slug: string): Promise<DocsDocument> =>
  apiRequest<DocsDocument>(DOCS_API + '/content?slug=' + encodeURIComponent(slug));

export const getDocsNavigation = (): Promise<DocsNavigation> => apiRequest<DocsNavigation>(DOCS_API + '/navigation');

export const searchDocs = (query: string): Promise<DocsSearchResponse> =>
  apiRequest<DocsSearchResponse>(DOCS_API + '/search?q=' + encodeURIComponent(query));

export const getDocsSearchHistory = (): Promise<DocsSearchHistoryItem[]> =>
  apiRequest<DocsSearchHistoryItem[]>(DOCS_API + '/search-history');

export const saveDocsSearchHistory = (entry: DocsSearchHistoryRequest): Promise<DocsSearchHistoryItem> =>
  postJson<DocsSearchHistoryItem>(DOCS_API + '/search-history', entry);

export const clearDocsSearchHistory = (): Promise<string> =>
  apiRequest<string>(DOCS_API + '/search-history', { method: 'DELETE' });

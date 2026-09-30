import { apiRequest } from '@/service/http/client';
import type { DocsDocument } from './types';

const DOCS_API = '/api/v1/docs';

export const getDocsDocument = (slug: string): Promise<DocsDocument> =>
  apiRequest<DocsDocument>(`${DOCS_API}/content?slug=${encodeURIComponent(slug)}`);

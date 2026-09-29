import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getDocsDocument, type DocsDocument } from '@/service/docs';
import { extractDocsToc } from '@/utils/docs';

import DocsHeader from './components/DocsHeader';
import DocsSidebar from './components/DocsSidebar';
import DocsTableOfContents from './components/DocsTableOfContents';
import MarkdownArticle from './components/MarkdownArticle';

const DEFAULT_DOC_SLUG = 'deploy/docker-compose';
const docsSlugFromPath = (pathname: string) => pathname.replace(/^\/docs\/?/, '').replace(/\/$/, '');

function DocsErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-solid border-[#FECACA] bg-[#FEF2F2] px-5 py-4 text-sm text-[#991B1B]">
      <div className="font-semibold">Documentation is temporarily unavailable</div>
      <div className="mt-1 leading-6 opacity-80">{message}</div>
    </div>
  );
}

export default function DocsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const requestedSlug = docsSlugFromPath(location.pathname);
  const [documentData, setDocumentData] = useState<DocsDocument>();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (requestedSlug && requestedSlug !== DEFAULT_DOC_SLUG) {
      navigate('/docs', { replace: true });
      return;
    }

    let cancelled = false;
    setLoading(true);
    setErrorMessage(undefined);

    getDocsDocument(DEFAULT_DOC_SLUG)
      .then((docsDocument) => {
        if (!cancelled) {
          setDocumentData(docsDocument);
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setDocumentData(undefined);
          setErrorMessage(error instanceof Error ? error.message : 'Failed to load documentation');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [navigate, requestedSlug]);

  const toc = useMemo(() => (documentData ? extractDocsToc(documentData.markdown) : []), [documentData]);

  const navigateToDockerCompose = () => {
    setMobileNavOpen(false);
    if (location.pathname !== '/docs/deploy/docker-compose') {
      navigate('/docs/deploy/docker-compose');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-yak text-[#18181B]">
      <DocsHeader onOpenNavigation={() => setMobileNavOpen(true)} />

      <div className="mx-auto flex max-w-[80rem] items-start px-5 lg:px-8">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[14rem] shrink-0 overflow-y-auto py-8 pr-8 lg:block">
          <DocsSidebar onNavigate={navigateToDockerCompose} />
        </aside>

        <main className="min-w-0 flex-1 py-9 lg:px-8 xl:px-10">
          <div className="mx-auto max-w-[760px]">
            {loading ? (
              <div className="min-h-[360px]" />
            ) : errorMessage ? (
              <DocsErrorState message={errorMessage} />
            ) : documentData ? (
              <MarkdownArticle markdown={documentData.markdown} />
            ) : null}
          </div>
        </main>

        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[14rem] shrink-0 overflow-y-auto py-9 pl-8 xl:block">
          <DocsTableOfContents items={toc} />
        </aside>
      </div>

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            aria-label="Close documentation navigation"
            className="absolute inset-0 h-full w-full cursor-pointer border-0 bg-black/25"
            onClick={() => setMobileNavOpen(false)}
            type="button"
          />
          <aside className="absolute inset-y-0 left-0 flex w-[300px] max-w-[86vw] flex-col bg-[#F5F5F5] shadow-[18px_0_50px_rgba(24,24,27,0.16)]">
            <div className="flex h-16 items-center justify-between border-b border-solid border-[#E4E4E7] px-5">
              <span className="text-[15px] font-semibold">Getting Started</span>
              <button
                aria-label="Close navigation"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent text-xl text-[#71717A] hover:bg-black/[0.04]"
                onClick={() => setMobileNavOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <DocsSidebar onNavigate={navigateToDockerCompose} />
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

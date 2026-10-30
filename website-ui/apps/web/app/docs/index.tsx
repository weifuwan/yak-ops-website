import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { getDocsDocument, getDocsNavigation, type DocsDocument, type DocsNavigation } from '@/service/docs';
import { extractDocsToc } from '@/utils/docs';

import ConnectorDocHeader from './components/ConnectorDocHeader';
import DocsHeader from './components/DocsHeader';
import DocsHome from './components/DocsHome';
import DocsRelease2 from './components/DocsRelease2';
import DocsSidebar from './components/DocsSidebar';
import DocsTableOfContents from './components/DocsTableOfContents';
import MarkdownArticle from './components/MarkdownArticle';

const docsSlugFromPath = (pathname: string) =>
  pathname.startsWith('/docs') ? pathname.slice(5).split('/').filter(Boolean).join('/') : '';

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
  const requestedSlug = docsSlugFromPath(location.pathname);
  const isHome = requestedSlug === '';
  const isRelease = requestedSlug === 'release-2.0';
  const isConnectorDocument = requestedSlug.startsWith('connectors/database/');

  const [navigation, setNavigation] = useState<DocsNavigation>();
  const [documentData, setDocumentData] = useState<DocsDocument>();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchRequest, setSearchRequest] = useState(0);

  useEffect(() => {
    setMobileNavOpen(false);
    if (isHome && location.hash === '#connectors') {
      window.requestAnimationFrame(() => document.getElementById('connectors')?.scrollIntoView());
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash, isHome]);

  useEffect(() => {
    let cancelled = false;

    getDocsNavigation()
      .then((docsNavigation) => {
        if (!cancelled) {
          setNavigation(docsNavigation);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setNavigation(undefined);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (isHome || isRelease) {
      setDocumentData(undefined);
      setErrorMessage(undefined);
      setLoading(false);
      return undefined;
    }

    let cancelled = false;
    setLoading(true);
    setErrorMessage(undefined);

    getDocsDocument(requestedSlug)
      .then((docsDocument) => {
        if (!cancelled) {
          setDocumentData(docsDocument);
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
  }, [requestedSlug, isHome, isRelease]);

  const currentDocument = documentData?.slug === requestedSlug ? documentData : undefined;
  const toc = useMemo(() => (currentDocument ? extractDocsToc(currentDocument.markdown) : []), [currentDocument]);

  const closeMobileNavigation = () => setMobileNavOpen(false);
  const docSections = navigation?.sections ?? [];

  return (
    <div
      className={
        isHome || isRelease || isConnectorDocument
          ? 'docs-page min-h-screen bg-white font-yak text-[#18181B]'
          : 'docs-page min-h-screen bg-[#F5F5F5] font-yak text-[#18181B]'
      }
    >
      <DocsHeader
        compact={isConnectorDocument}
        onOpenNavigation={() => setMobileNavOpen(true)}
        searchRequest={searchRequest}
      />

      {isHome ? (
        <DocsHome onSearch={() => setSearchRequest((count) => count + 1)} />
      ) : isRelease ? (
        <DocsRelease2 />
      ) : (
        <div className="mx-auto flex max-w-[80rem] items-start px-5 lg:px-8">
          <aside
            className={[
              'sticky hidden w-[14rem] shrink-0 overflow-y-auto py-8 pr-8 lg:block',
              isConnectorDocument ? 'top-[90px] h-[calc(100vh-90px)]' : 'top-[158px] h-[calc(100vh-158px)]',
            ].join(' ')}
          >
            <DocsSidebar currentSlug={requestedSlug} onNavigate={closeMobileNavigation} sections={docSections} />
          </aside>

          <main className="min-w-0 flex-1 py-9 lg:px-8 xl:px-10">
            <div className="mx-auto max-w-[760px]">
              {loading || (!currentDocument && !errorMessage) ? (
                <div className="min-h-[360px]" />
              ) : errorMessage ? (
                <DocsErrorState message={errorMessage} />
              ) : currentDocument ? (
                <>
                  {isConnectorDocument ? (
                    <ConnectorDocHeader slug={requestedSlug} title={currentDocument.title} />
                  ) : null}
                  <MarkdownArticle markdown={currentDocument.markdown} />
                </>
              ) : null}
            </div>
          </main>

          <aside
            className={[
              'sticky hidden w-[14rem] shrink-0 overflow-y-auto py-9 pl-8 xl:block',
              isConnectorDocument ? 'top-[90px] h-[calc(100vh-90px)]' : 'top-[158px] h-[calc(100vh-158px)]',
            ].join(' ')}
          >
            <DocsTableOfContents items={toc} />
          </aside>
        </div>
      )}

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            aria-label="Close documentation navigation"
            className="absolute inset-0 h-full w-full cursor-pointer border-0 bg-black/25"
            onClick={closeMobileNavigation}
            type="button"
          />
          <aside className="absolute inset-y-0 left-0 flex w-[300px] max-w-[86vw] flex-col bg-white shadow-[18px_0_50px_rgba(24,24,27,0.16)]">
            <div className="flex h-16 items-center justify-between border-b border-solid border-[#E4E4E7] px-5">
              <span className="text-[15px] font-semibold">Documentation</span>
              <button
                aria-label="Close navigation"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent text-xl text-[#71717A] hover:bg-black/[0.04]"
                onClick={closeMobileNavigation}
                type="button"
              >
                ×
              </button>
            </div>
            <nav aria-label="Documentation main pages" className="grid gap-1 border-b border-[#edf0f5] px-4 py-4">
              <Link
                aria-current={isHome ? 'page' : undefined}
                className={
                  isHome
                    ? 'rounded-lg bg-[#ecf6ff] px-3 py-2.5 text-sm font-semibold text-[#086cf5]'
                    : 'rounded-lg px-3 py-2.5 text-sm font-medium text-[#334155] hover:bg-[#f2f6fc]'
                }
                onClick={closeMobileNavigation}
                to="/docs"
              >
                Home
              </Link>
              <Link
                aria-current={isRelease ? 'page' : undefined}
                className={
                  isRelease
                    ? 'rounded-lg bg-[#ecf6ff] px-3 py-2.5 text-sm font-semibold text-[#086cf5]'
                    : 'rounded-lg px-3 py-2.5 text-sm font-medium text-[#334155] hover:bg-[#f2f6fc]'
                }
                onClick={closeMobileNavigation}
                to="/docs/release-2.0"
              >
                Release 2.0
              </Link>
            </nav>
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <DocsSidebar currentSlug={requestedSlug} onNavigate={closeMobileNavigation} sections={docSections} />
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

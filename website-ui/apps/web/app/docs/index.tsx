import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { getDocsDocument, getDocsNavigation, type DocsDocument, type DocsNavigation } from '@/service/docs';
import { extractDocsToc, type DocsTocItem } from '@/utils/docs';

import ConnectorDocHeader from './components/ConnectorDocHeader';
import DocsConnectorOverview from './components/DocsConnectorOverview';
import DocsConnectorSidebar from './components/DocsConnectorSidebar';
import DocsHeader from './components/DocsHeader';
import DocsHome from './components/DocsHome';
import DocsNavigationProgress, { useDocsNavigationProgress } from './components/DocsNavigationProgress';
import DocsRelease2 from './components/DocsRelease2';
import DocsSidebar from './components/DocsSidebar';
import DocsTableOfContents from './components/DocsTableOfContents';
import MarkdownArticle from './components/MarkdownArticle';

const CONNECTORS_TOC: DocsTocItem[] = [
  { id: 'doc-connectors', title: 'Connectors', level: 2 },
  { id: 'doc-database', title: 'Database', level: 2 },
];

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
  const isConnectorOverview = requestedSlug === 'connectors/overview';

  const [navigation, setNavigation] = useState<DocsNavigation>();
  const [navigationLoaded, setNavigationLoaded] = useState(false);
  const [documentData, setDocumentData] = useState<DocsDocument>();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchRequest, setSearchRequest] = useState(0);
  const scrollPathRef = useRef<string | null>(null);
  const { progress, complete } = useDocsNavigationProgress(location.pathname);

  // Keep hash-only navigation from jumping back to the top.
  useEffect(() => {
    if (scrollPathRef.current === location.pathname) return;
    scrollPathRef.current = location.pathname;
    setMobileNavOpen(false);
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

  // Markdown headings may arrive after the hash in an asynchronous document request.
  useEffect(() => {
    if (!location.hash) return undefined;
    const id = decodeURIComponent(location.hash.substring(1));
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, documentData]);

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
      })
      .finally(() => {
        if (!cancelled) setNavigationLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (isHome || isRelease) {
      complete();
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
          complete();
        }
      });

    return () => {
      cancelled = true;
    };
  }, [requestedSlug, location.pathname, isHome, isRelease, complete]);

  const currentDocument = documentData?.slug === requestedSlug ? documentData : undefined;
  const toc = useMemo(() => (currentDocument ? extractDocsToc(currentDocument.markdown) : []), [currentDocument]);
  // The backend navigation is a document registry; each page owns exactly one
  // navigation section. Never show other modules in the current sidebar.
  const currentSection = useMemo(
    () => navigation?.sections.find((section) => section.items.some((item) => item.slug === requestedSlug)),
    [navigation, requestedSlug],
  );
  const docSections = useMemo(() => (currentSection ? [currentSection] : []), [currentSection]);
  const connectorItems = currentSection?.title === 'Connectors' ? currentSection.items : [];
  const pageToc = isConnectorOverview ? CONNECTORS_TOC : toc;

  const closeMobileNavigation = () => setMobileNavOpen(false);

  return (
    <div className="docs-page min-h-screen bg-white font-yak text-[#18181B]">
      <DocsNavigationProgress progress={progress} />
      <DocsHeader onOpenNavigation={() => setMobileNavOpen(true)} searchRequest={searchRequest} />

      {isHome ? (
        <DocsHome onSearch={() => setSearchRequest((count) => count + 1)} />
      ) : isRelease ? (
        <DocsRelease2 />
      ) : (
        <div className="mx-auto flex max-w-[80rem] items-start px-5 lg:px-8">
          {!isConnectorOverview ? (
            <aside className="sticky top-[158px] hidden h-[calc(100vh-158px)] w-[14rem] shrink-0 overflow-y-auto py-8 pr-8 [scrollbar-width:none] lg:block [&::-webkit-scrollbar]:hidden">
              {isConnectorDocument ? (
                <DocsConnectorSidebar
                  currentSlug={requestedSlug}
                  items={connectorItems}
                  onNavigate={closeMobileNavigation}
                  toc={toc}
                />
              ) : (
                <DocsSidebar currentSlug={requestedSlug} onNavigate={closeMobileNavigation} sections={docSections} />
              )}
            </aside>
          ) : null}

          <main className={isConnectorOverview ? 'min-w-0 flex-1 py-9 lg:pr-8 xl:pr-10' : 'min-w-0 flex-1 py-9 lg:px-8 xl:px-10'}>
            <div className={isConnectorOverview ? 'mx-auto max-w-[900px]' : 'mx-auto max-w-[760px]'}>
              {loading || (!currentDocument && !errorMessage) || (isConnectorOverview && !navigationLoaded) ? (
                <div className="min-h-[360px]" />
              ) : errorMessage ? (
                <DocsErrorState message={errorMessage} />
              ) : currentDocument ? (
                isConnectorOverview ? (
                  navigation ? (
                    <DocsConnectorOverview items={connectorItems} />
                  ) : (
                    <DocsErrorState message="The connector catalog could not be loaded." />
                  )
                ) : (
                  <>
                    {isConnectorDocument ? (
                      <ConnectorDocHeader slug={requestedSlug} title={currentDocument.title} />
                    ) : null}
                    <MarkdownArticle markdown={currentDocument.markdown} />
                  </>
                )
              ) : null}
            </div>
          </main>

          <aside className="sticky top-[158px] hidden h-[calc(100vh-158px)] w-[14rem] shrink-0 overflow-y-auto py-9 pl-8 xl:block [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <DocsTableOfContents items={pageToc} />
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
              {isConnectorDocument ? (
                <DocsConnectorSidebar
                  currentSlug={requestedSlug}
                  items={connectorItems}
                  onNavigate={closeMobileNavigation}
                  toc={toc}
                />
              ) : (
                <DocsSidebar currentSlug={requestedSlug} onNavigate={closeMobileNavigation} sections={docSections} />
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

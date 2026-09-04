import { history, useLocation } from '@umijs/max';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getCurrentWebsiteUser, logoutAccount, type CurrentWebsiteUser } from '@/services/auth';
import {
  getDocsDocument,
  getDocsNavigation,
  type DocsDocument,
  type DocsNavigation,
} from '@/services/docs';
import { ApiError } from '@/services/http/client';
import { extractDocsToc } from '@/utils/docs';
import DocsHeader from './components/DocsHeader';
import DocsLanding from './components/DocsLanding';
import DocsSidebar from './components/DocsSidebar';
import DocsTableOfContents from './components/DocsTableOfContents';
import MarkdownArticle from './components/MarkdownArticle';

const docsSlugFromPath = (pathname: string) => pathname.replace(/^\/docs\/?/, '').replace(/\/$/, '');

const shouldRedirectToLogin = (error: unknown) =>
  error instanceof ApiError && (error.status === 401 || error.status === 504);

function DocsErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-solid border-[#d9a99a] bg-[#fff4f0] px-5 py-4 text-sm text-[#7a3425]">
      <div className="font-semibold">Documentation is temporarily unavailable</div>
      <div className="mt-1 leading-6 opacity-80">{message}</div>
    </div>
  );
}

function ArrowLeftIcon() {
  return <span aria-hidden="true">←</span>;
}

function ArrowRightIcon() {
  return <span aria-hidden="true">→</span>;
}

export default function DocsPage() {
  const location = useLocation();
  const currentSlug = docsSlugFromPath(location.pathname);
  const [navigation, setNavigation] = useState<DocsNavigation>();
  const [currentUser, setCurrentUser] = useState<CurrentWebsiteUser>();
  const [documentData, setDocumentData] = useState<DocsDocument>();
  const [bootLoading, setBootLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const documentCacheRef = useRef(new Map<string, DocsDocument>());

  const redirectToLogin = () => {
    const returnTo = `${location.pathname}${location.search}`;
    history.replace(`/login?returnTo=${encodeURIComponent(returnTo)}`);
  };

  const handleApiError = (error: unknown, fallback: string) => {
    if (shouldRedirectToLogin(error)) {
      redirectToLogin();
      return;
    }
    setErrorMessage(error instanceof Error ? error.message : fallback);
  };

  useEffect(() => {
    let cancelled = false;
    setBootLoading(true);
    setErrorMessage(undefined);

    Promise.all([getCurrentWebsiteUser(), getDocsNavigation()])
      .then(([user, docsNavigation]) => {
        if (cancelled) {
          return;
        }

        setCurrentUser(user);
        setNavigation(docsNavigation);

        if (!currentSlug) {
          getDocsDocument(docsNavigation.defaultSlug)
            .then((docsDocument) => {
              if (!cancelled) {
                documentCacheRef.current.set(docsNavigation.defaultSlug, docsDocument);
              }
            })
            .catch((error) => {
              if (!cancelled && shouldRedirectToLogin(error)) {
                redirectToLogin();
              }
            });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          handleApiError(error, 'Failed to initialize documentation');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setBootLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!navigation || !currentSlug) {
      setDocumentData(undefined);
      return undefined;
    }

    const cachedDocument = documentCacheRef.current.get(currentSlug);
    if (cachedDocument) {
      setErrorMessage(undefined);
      setDocumentData(cachedDocument);
      window.scrollTo({ top: 0, behavior: 'auto' });
      return undefined;
    }

    let cancelled = false;
    setErrorMessage(undefined);
    setDocumentData(undefined);

    getDocsDocument(currentSlug)
      .then((docsDocument) => {
        if (!cancelled) {
          documentCacheRef.current.set(currentSlug, docsDocument);
          setDocumentData(docsDocument);
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          handleApiError(error, 'Failed to load documentation');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [navigation, currentSlug]);

  const toc = useMemo(
    () => (documentData ? extractDocsToc(documentData.markdown) : []),
    [documentData],
  );

  const navigateToDoc = async (slug: string) => {
    setMobileNavOpen(false);
    if (slug === currentSlug) {
      return;
    }

    const cachedDocument = documentCacheRef.current.get(slug);
    if (cachedDocument) {
      setErrorMessage(undefined);
      setDocumentData(cachedDocument);
      history.push(`/docs/${slug}`);
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    try {
      const docsDocument = await getDocsDocument(slug);
      documentCacheRef.current.set(slug, docsDocument);
      setErrorMessage(undefined);
      setDocumentData(docsDocument);
      history.push(`/docs/${slug}`);
      window.scrollTo({ top: 0, behavior: 'auto' });
    } catch (error) {
      handleApiError(error, 'Failed to load documentation');
    }
  };

  const navigateToWelcome = () => {
    setMobileNavOpen(false);
    setErrorMessage(undefined);
    setDocumentData(undefined);
    if (!currentSlug) {
      return;
    }
    history.push('/docs');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleLogout = async () => {
    try {
      await logoutAccount();
    } finally {
      history.replace('/login?returnTo=%2Fdocs');
    }
  };

  if (bootLoading && !navigation) {
    return <div className="min-h-screen bg-[#faf9f5]" />;
  }

  if (!navigation) {
    return (
      <div className="min-h-screen bg-[#faf9f5] px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <DocsErrorState message={errorMessage || 'Please try again later.'} />
        </div>
      </div>
    );
  }

  const previousDocument = documentData?.previous;
  const nextDocument = documentData?.next;
  const isLanding = !currentSlug;

  return (
    <div className="min-h-screen bg-[#fdfdf7] font-yak text-[#1f1f1d]">
      <DocsHeader
        isLanding={isLanding}
        navigation={navigation}
        onNavigate={navigateToDoc}
        onOpenNavigation={() => setMobileNavOpen(true)}
        onWelcome={navigateToWelcome}
      />

      {isLanding ? (
        <DocsLanding navigation={navigation} onNavigate={navigateToDoc} />
      ) : (
        <div className="mx-auto flex max-w-[80rem] items-start px-5 lg:px-8">
          <aside className="sticky top-[9.5rem] hidden h-[calc(100vh-9.5rem)] w-[18rem] shrink-0 overflow-y-auto py-8 pr-8 lg:block">
            <DocsSidebar activeSlug={currentSlug} navigation={navigation} onNavigate={navigateToDoc} />
          </aside>

          <main className="min-w-0 flex-1 py-10 lg:px-8 xl:px-12">
            <div className="mx-auto max-w-[760px]">
              {errorMessage ? (
                <DocsErrorState message={errorMessage} />
              ) : documentData ? (
                <>
                  <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-yak-brand">
                    {documentData.section}
                  </div>
                  <MarkdownArticle markdown={documentData.markdown} />

                  <div className="mt-14 flex flex-col gap-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    {previousDocument ? (
                      <button
                        className="group inline-flex min-w-0 items-center gap-2 border-0 bg-transparent p-0 text-left text-sm font-semibold text-[#55544f] transition-colors duration-200 hover:text-[#1f1f1d]"
                        onClick={() => navigateToDoc(previousDocument.slug)}
                        type="button"
                      >
                        <span className="shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-1">
                          <ArrowLeftIcon />
                        </span>
                        <span className="truncate">{previousDocument.title}</span>
                      </button>
                    ) : (
                      <span />
                    )}

                    {nextDocument ? (
                      <button
                        className="group ml-auto inline-flex min-w-0 items-center justify-end gap-2 border-0 bg-transparent p-0 text-right text-sm font-semibold text-[#55544f] transition-colors duration-200 hover:text-[#1f1f1d]"
                        onClick={() => navigateToDoc(nextDocument.slug)}
                        type="button"
                      >
                        <span className="truncate">{nextDocument.title}</span>
                        <span className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1">
                          <ArrowRightIcon />
                        </span>
                      </button>
                    ) : null}
                  </div>
                </>
              ) : null}
            </div>
          </main>

          <aside className="sticky top-[9.5rem] hidden h-[calc(100vh-9.5rem)] w-[16.5rem] shrink-0 overflow-y-auto py-10 pl-8 xl:block">
            <DocsTableOfContents items={toc} />
          </aside>
        </div>
      )}

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            aria-label="Close documentation navigation"
            className="absolute inset-0 h-full w-full border-0 bg-black/25"
            onClick={() => setMobileNavOpen(false)}
            type="button"
          />
          <aside className="absolute inset-y-0 left-0 flex w-[310px] max-w-[86vw] flex-col bg-[#faf9f5] shadow-[18px_0_50px_rgba(20,20,19,0.16)]">
            <div className="flex h-16 items-center justify-between border-b border-solid border-[#e1ded6] px-5">
              <span className="font-yak-serif text-xl font-medium">Yak Ops Docs</span>
              <button
                aria-label="Close navigation"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent text-xl text-[#66645f] hover:bg-black/[0.04]"
                onClick={() => setMobileNavOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <DocsSidebar activeSlug={currentSlug} navigation={navigation} onNavigate={navigateToDoc} />
            </div>
            <div className="border-t border-solid border-[#e1ded6] p-4">
              <div className="mb-3 truncate text-xs text-[#77756f]">{currentUser?.email || 'Signed in'}</div>
              <button
                className="w-full rounded-xl border border-solid border-[#d8d5cd] bg-transparent px-4 py-2.5 text-left text-sm font-semibold text-[#333330] hover:bg-black/[0.035]"
                onClick={handleLogout}
                type="button"
              >
                Sign out
              </button>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

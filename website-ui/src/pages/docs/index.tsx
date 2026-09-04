import { history, useLocation } from '@umijs/max';
import { useEffect, useMemo, useState } from 'react';
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

function DocsBootState() {
  return (
    <div className="min-h-screen bg-[#faf9f5] px-6 py-10">
      <div className="mx-auto max-w-[80rem]">
        <div className="h-10 w-52 rounded-xl bg-[#e5e2da]" />
        <div className="mt-16 grid grid-cols-[260px_minmax(0,1fr)] gap-14">
          <div className="space-y-3">
            {Array.from({ length: 7 }).map((_, index) => (
              <div className="h-8 rounded-lg bg-[#ebe8e1]" key={index} />
            ))}
          </div>
          <div className="max-w-[760px] space-y-4">
            <div className="h-12 w-2/3 rounded-xl bg-[#e5e2da]" />
            <div className="h-4 rounded bg-[#ebe8e1]" />
            <div className="h-4 w-5/6 rounded bg-[#ebe8e1]" />
            <div className="h-4 w-4/6 rounded bg-[#ebe8e1]" />
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const [documentLoading, setDocumentLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const redirectToLogin = () => {
    const returnTo = `${location.pathname}${location.search}`;
    history.replace(`/login?returnTo=${encodeURIComponent(returnTo)}`);
  };

  const handleApiError = (error: unknown, fallback: string) => {
    if (error instanceof ApiError && error.status === 401) {
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
      setDocumentLoading(false);
      return undefined;
    }

    let cancelled = false;
    setDocumentLoading(true);
    setErrorMessage(undefined);
    setDocumentData(undefined);

    getDocsDocument(currentSlug)
      .then((docsDocument) => {
        if (!cancelled) {
          setDocumentData(docsDocument);
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          handleApiError(error, 'Failed to load documentation');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setDocumentLoading(false);
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

  const navigateToDoc = (slug: string) => {
    setMobileNavOpen(false);
    if (slug === currentSlug) {
      return;
    }
    history.push(`/docs/${slug}`);
  };

  const navigateToWelcome = () => {
    setMobileNavOpen(false);
    if (!currentSlug) {
      return;
    }
    history.push('/docs');
  };

  const handleLogout = async () => {
    try {
      await logoutAccount();
    } finally {
      history.replace('/login?returnTo=%2Fdocs');
    }
  };

  if (bootLoading && !navigation) {
    return <DocsBootState />;
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
    <div className="min-h-screen bg-[#faf9f5] font-yak text-[#1f1f1d]">
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
          <aside className="sticky top-28 hidden h-[calc(100vh-7rem)] w-[18rem] shrink-0 overflow-y-auto py-8 pr-8 lg:block">
            <DocsSidebar activeSlug={currentSlug} navigation={navigation} onNavigate={navigateToDoc} />
          </aside>

          <main className="min-w-0 flex-1 py-10 lg:px-8 xl:px-12">
            <div className="mx-auto max-w-[760px]">
              {documentLoading ? (
                <div className="space-y-4 pt-2">
                  <div className="h-4 w-24 rounded bg-[#e5e2da]" />
                  <div className="h-11 w-3/4 rounded-xl bg-[#e2dfd7]" />
                  <div className="h-4 rounded bg-[#ebe8e1]" />
                  <div className="h-4 w-5/6 rounded bg-[#ebe8e1]" />
                  <div className="h-4 w-4/6 rounded bg-[#ebe8e1]" />
                </div>
              ) : errorMessage ? (
                <DocsErrorState message={errorMessage} />
              ) : documentData ? (
                <>
                  <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-yak-brand">
                    {documentData.section}
                  </div>
                  <MarkdownArticle markdown={documentData.markdown} />

                  <div className="mt-14 grid grid-cols-1 gap-3 border-t border-solid border-[#ddd9d0] pt-7 sm:grid-cols-2">
                    {previousDocument ? (
                      <button
                        className="group flex min-h-[86px] items-center gap-3 rounded-xl border border-solid border-[#ddd9d0] bg-transparent px-4 py-3 text-left hover:border-[#aaa69d]"
                        onClick={() => navigateToDoc(previousDocument.slug)}
                        type="button"
                      >
                        <ArrowLeftIcon />
                        <span className="min-w-0">
                          <small className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#88867f]">Previous</small>
                          <strong className="mt-1 block truncate text-sm font-semibold text-[#292927]">
                            {previousDocument.title}
                          </strong>
                        </span>
                      </button>
                    ) : (
                      <span />
                    )}

                    {nextDocument ? (
                      <button
                        className="group flex min-h-[86px] items-center justify-end gap-3 rounded-xl border border-solid border-[#ddd9d0] bg-transparent px-4 py-3 text-right hover:border-[#aaa69d]"
                        onClick={() => navigateToDoc(nextDocument.slug)}
                        type="button"
                      >
                        <span className="min-w-0">
                          <small className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#88867f]">Next</small>
                          <strong className="mt-1 block truncate text-sm font-semibold text-[#292927]">
                            {nextDocument.title}
                          </strong>
                        </span>
                        <ArrowRightIcon />
                      </button>
                    ) : null}
                  </div>
                </>
              ) : null}
            </div>
          </main>

          <aside className="sticky top-28 hidden h-[calc(100vh-7rem)] w-[16.5rem] shrink-0 overflow-y-auto py-10 pl-8 xl:block">
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

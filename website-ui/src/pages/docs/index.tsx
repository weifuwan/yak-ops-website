import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LogoutOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Alert, Drawer, Skeleton } from 'antd';
import { history, Link, useLocation } from '@umijs/max';
import { useEffect, useMemo, useState } from 'react';
import { YakButton } from '@/components/ui';
import { getCurrentWebsiteUser, logoutAccount, type CurrentWebsiteUser } from '@/services/auth';
import {
  getDocsDocument,
  getDocsNavigation,
  type DocsDocument,
  type DocsNavigation,
} from '@/services/docs';
import { ApiError } from '@/services/http/client';
import { extractDocsToc } from '@/utils/docs';
import DocsSearch from './components/DocsSearch';
import DocsSidebar from './components/DocsSidebar';
import DocsTableOfContents from './components/DocsTableOfContents';
import MarkdownArticle from './components/MarkdownArticle';
import './index.less';

const docsSlugFromPath = (pathname: string) => pathname.replace(/^\/docs\/?/, '').replace(/\/$/, '');

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
        if (!currentSlug) {
          history.replace(`/docs/${docsNavigation.defaultSlug}`);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          handleApiError(error, '文档初始化失败');
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
      return;
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
          handleApiError(error, '文档加载失败');
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

  const handleLogout = async () => {
    try {
      await logoutAccount();
    } finally {
      history.replace('/login?returnTo=%2Fdocs');
    }
  };

  if (bootLoading && !navigation) {
    return (
      <div className="yak-docs-boot">
        <Skeleton active paragraph={{ rows: 6 }} title />
      </div>
    );
  }

  if (!navigation) {
    return (
      <div className="yak-docs-boot">
        <Alert
          message="文档暂时不可用"
          description={errorMessage || '请稍后重试'}
          showIcon
          type="error"
        />
      </div>
    );
  }

  return (
    <div className="yak-docs-page">
      <header className="yak-docs-header">
        <div className="yak-docs-header__left">
          <YakButton
            aria-label="打开文档导航"
            className="yak-docs-header__menu"
            icon={<MenuOutlined />}
            iconOnly
            onClick={() => setMobileNavOpen(true)}
          />
          <Link className="yak-docs-brand" to="/">
            <span className="yak-docs-brand__mark">Y</span>
            <span className="yak-docs-brand__name">Yak Ops</span>
            <span className="yak-docs-brand__divider" />
            <span className="yak-docs-brand__docs">Docs</span>
          </Link>
        </div>

        <div className="yak-docs-header__search">
          <DocsSearch onSelect={navigateToDoc} />
        </div>

        <div className="yak-docs-header__user">
          <div className="yak-docs-user-meta">
            <strong>{currentUser?.displayName || 'Yak Ops User'}</strong>
            <span>{currentUser?.email}</span>
          </div>
          <YakButton aria-label="退出登录" icon={<LogoutOutlined />} iconOnly onClick={handleLogout} />
        </div>
      </header>

      <div className="yak-docs-shell">
        <aside className="yak-docs-sidebar">
          <DocsSidebar activeSlug={currentSlug} navigation={navigation} onNavigate={navigateToDoc} />
        </aside>

        <main className="yak-docs-content">
          {documentLoading ? (
            <div className="yak-docs-content__loading">
              <Skeleton active paragraph={{ rows: 10 }} title />
            </div>
          ) : errorMessage ? (
            <Alert
              message="文档加载失败"
              description={errorMessage}
              showIcon
              type="error"
            />
          ) : documentData ? (
            <>
              <div className="yak-docs-breadcrumb">{documentData.section}</div>
              <MarkdownArticle markdown={documentData.markdown} />

              <div className="yak-docs-pagination">
                {documentData.previous ? (
                  <button
                    className="yak-docs-page-link yak-docs-page-link--previous"
                    onClick={() => navigateToDoc(documentData.previous!.slug)}
                    type="button"
                  >
                    <ArrowLeftOutlined />
                    <span>
                      <small>上一篇</small>
                      <strong>{documentData.previous.title}</strong>
                    </span>
                  </button>
                ) : (
                  <span />
                )}

                {documentData.next ? (
                  <button
                    className="yak-docs-page-link yak-docs-page-link--next"
                    onClick={() => navigateToDoc(documentData.next!.slug)}
                    type="button"
                  >
                    <span>
                      <small>下一篇</small>
                      <strong>{documentData.next.title}</strong>
                    </span>
                    <ArrowRightOutlined />
                  </button>
                ) : null}
              </div>
            </>
          ) : null}
        </main>

        <aside className="yak-docs-toc-column">
          <DocsTableOfContents items={toc} />
        </aside>
      </div>

      <Drawer
        className="yak-docs-mobile-drawer"
        closable
        onClose={() => setMobileNavOpen(false)}
        open={mobileNavOpen}
        placement="left"
        title="Yak Ops Docs"
        width={300}
      >
        <DocsSidebar activeSlug={currentSlug} navigation={navigation} onNavigate={navigateToDoc} />
      </Drawer>
    </div>
  );
}

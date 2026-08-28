import { Link } from '@umijs/max';
import type { ReactNode } from 'react';
import './index.less';

export type AuthLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <main className="yak-auth-layout">
      <Link className="yak-auth-layout__brand" to="/">
        <span className="yak-auth-layout__brand-dot" />
        Yak Ops
      </Link>

      <section className="yak-auth-layout__panel">
        <header className="yak-auth-layout__header">
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </header>
        {children}
      </section>
    </main>
  );
}

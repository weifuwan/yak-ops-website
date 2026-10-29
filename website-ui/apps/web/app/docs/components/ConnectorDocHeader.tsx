import { ChevronRight, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

type ConnectorPresentation = {
  image?: string;
  capabilities: string[];
};

const connectorPresentations: Record<string, ConnectorPresentation> = {
  mysql: {
    image: '/images/integrations/MySQL.png',
    capabilities: ['JDBC Source', 'JDBC Sink', 'CDC'],
  },
  postgresql: {
    capabilities: ['JDBC Source', 'JDBC Sink'],
  },
  oracle: {
    image: '/images/integrations/Oracle.png',
    capabilities: ['JDBC Source', 'JDBC Sink'],
  },
};

type ConnectorDocHeaderProps = {
  slug: string;
  title: string;
};

export default function ConnectorDocHeader({ slug, title }: ConnectorDocHeaderProps) {
  const connectorId = slug.substring(slug.lastIndexOf('/') + 1);
  const presentation = connectorPresentations[connectorId] ?? {
    capabilities: ['Database Connector'],
  };

  return (
    <header className="mb-8">
      <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-[13px] leading-5 text-[#71717A]">
        <Link className="text-inherit no-underline hover:text-[#086cf5]" to="/docs#connectors">
          Connectors
        </Link>
        <ChevronRight aria-hidden="true" size={14} />
        <span>Database</span>
        <ChevronRight aria-hidden="true" size={14} />
        <span>{title}</span>
      </nav>

      <div className="mb-4">
        <span className="inline-flex items-center rounded-full bg-[#F0F9FF] px-3 py-1.5 text-[12px] font-medium text-[#0284C7]">
          Database Connector
        </span>
      </div>

      <div className="flex items-center gap-4 border-b border-solid border-[#E4E7EC] pb-5">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F8FAFC]">
          <Database aria-hidden="true" className="text-[#7DA5DF]" size={28} strokeWidth={1.7} />
          {presentation.image ? (
            <img
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-14 w-14 rounded-full bg-[#F8FAFC] object-contain p-2"
              onError={(event) => {
                event.currentTarget.hidden = true;
              }}
              src={presentation.image}
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="m-0 text-[28px] leading-[1.2] font-semibold tracking-[-0.025em] text-[#181D27]">{title}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {presentation.capabilities.map((capability) => (
              <span
                className="inline-flex items-center rounded-full border border-solid border-[#D1E7FF] bg-[#F0F9FF] px-2.5 py-1 text-[12px] font-medium text-[#175CD3]"
                key={capability}
              >
                {capability}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

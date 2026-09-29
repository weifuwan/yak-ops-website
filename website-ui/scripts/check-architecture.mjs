import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const violations = [];

const toRelativePath = (path) => relative(root, path).split(sep).join('/');

const fail = (message) => {
  violations.push(message);
};

const forbiddenPaths = [
  'src',
  'public',
  'tailwind.config.js',
  'biome.json',
  'yarn.lock',
  'apps/web/postcss.config.cjs',
  'apps/web/src',
  'apps/web/pages',
  'apps/web/shared',
];

for (const path of forbiddenPaths) {
  if (existsSync(join(root, path))) {
    fail(`forbidden legacy path exists: ${path}`);
  }
}

const requiredPaths = [
  'ARCHITECTURE.md',
  'FRONTEND_CODE_STYLE.md',
  'docs/tooling.md',
  'apps/web/app/App.tsx',
  'apps/web/app/router/AppRouter.tsx',
  'apps/web/service/http/client.ts',
  'apps/web/themes/global.css',
  'apps/web/themes/tailwind.css',
  'apps/web/vite.config.ts',
  'packages/yak-ui/src/index.ts',
];

for (const path of requiredPaths) {
  if (!existsSync(join(root, path))) {
    fail(`required frontend contract path is missing: ${path}`);
  }
}

const packageRoot = join(root, 'packages');
const allowedPackages = new Set(['yak-ui']);

if (existsSync(packageRoot)) {
  for (const entry of readdirSync(packageRoot, { withFileTypes: true })) {
    if (entry.isDirectory() && !allowedPackages.has(entry.name)) {
      fail(`unexpected workspace package: packages/${entry.name}`);
    }
  }
}

const rootPackage = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const rootRuntimeDependencies = Object.keys(rootPackage.dependencies ?? {});

if (rootRuntimeDependencies.length > 0) {
  fail(`workspace root must not own runtime dependencies: ${rootRuntimeDependencies.join(', ')}`);
}

const forbiddenRootDevDependencies = new Set(['@biomejs/biome', '@umijs/max', 'cross-env', 'less']);

for (const dependency of Object.keys(rootPackage.devDependencies ?? {})) {
  if (forbiddenRootDevDependencies.has(dependency)) {
    fail(`workspace root declares retired tooling dependency: ${dependency}`);
  }
}

const sourceExtensions = new Set(['.js', '.jsx', '.mjs', '.ts', '.tsx', '.json']);
const ignoredDirectoryNames = new Set(['assets', 'dist', 'node_modules', 'public']);
const files = [];

const walk = (directory) => {
  if (!existsSync(directory)) return;

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectoryNames.has(entry.name)) continue;

    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(path);
      continue;
    }

    if (entry.name.endsWith('.less')) {
      fail(`${toRelativePath(path)} uses retired Less styling; use CSS`);
    }

    if (sourceExtensions.has(extname(entry.name))) {
      files.push(path);
    }
  }
};

walk(join(root, 'apps', 'web'));
walk(join(root, 'packages'));
walk(join(root, 'scripts'));

const serviceAppImportPattern = /(?:from\s+|import\s*\()\s*['"]@\/app\//;
const appHttpImportPattern = /(?:from\s+|import\s*\()\s*['"]@\/service\/http(?:\/|['"])/;
const directFetchPattern = /\b(?:globalThis\.|window\.)?fetch\s*\(/;
const legacyAliasPattern = /['"]@\/(?:services|components|styles|layouts|pages)\//;
const umiImportPattern = /['"]@umijs\/max['"]/;

const directFetchOwners = new Set(['apps/web/service/http/client.ts', 'apps/web/service/traffic/api.ts']);

for (const path of files) {
  const relativePath = toRelativePath(path);
  const content = readFileSync(path, 'utf8');

  if (relativePath.startsWith('apps/web/service/') && serviceAppImportPattern.test(content)) {
    fail(`${relativePath} imports app code; service must not depend on app`);
  }

  if (relativePath.startsWith('apps/web/app/') && appHttpImportPattern.test(content)) {
    fail(`${relativePath} imports service/http directly; app must use a domain service`);
  }

  if (directFetchPattern.test(content) && !directFetchOwners.has(relativePath)) {
    fail(`${relativePath} calls fetch outside an approved service transport owner`);
  }

  if (legacyAliasPattern.test(content)) {
    fail(`${relativePath} references a retired legacy alias`);
  }

  if (umiImportPattern.test(content)) {
    fail(`${relativePath} imports retired Umi runtime code`);
  }
}

if (violations.length > 0) {
  console.error('Frontend architecture check failed:');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('Frontend architecture check passed.');

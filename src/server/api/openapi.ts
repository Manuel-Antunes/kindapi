import { generateOpenApiDocument } from 'trpc-openapi';

import { siteConfig } from '@/config/site';
import { appRouter } from './root';

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Kindapi Open Api',
  description: 'The opensource routers for Kindapi',
  version: '1.0.0',
  baseUrl: `${siteConfig.url}/api`,
  docsUrl: siteConfig.links.lisbom,
});
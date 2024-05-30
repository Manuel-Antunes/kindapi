import { createTRPCContext } from "@/server/api/trpc";
import { type NextApiRequest, type NextApiResponse } from 'next';
import cors from 'nextjs-cors';
import { createOpenApiNextHandler } from 'trpc-openapi';

import { env } from "@/env";
import { appRouter } from '@/server/api/root';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Setup CORS
  await cors(req, res);
  const createContext = createTRPCContext
  // Handle incoming OpenAPI requests
  try {

    return createOpenApiNextHandler({
      router: appRouter,
      createContext,
      onError:
        env.NODE_ENV === "development"
          ? ({ path, error }: {
            path?: string;
            error: Error;
          }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
          : undefined,
      responseMeta: null
    })(req, res);
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'deu ruim' })
  }
};

export default handler;
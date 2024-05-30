import { env } from "@/env";
import { type SiteConfig } from "@/types";

const site_url = env.NEXT_PUBLIC_APP_URL || '';

export const siteConfig: SiteConfig = {
  name: "Kindapi",
  description:
    " Oferte ou Alugue números de Whatsapp com a Flowtik. A melhor plataforma de gestão de números de Whatsapp do mercado Digital!",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    lisbom: "https://lisbom.com.br",
    github: "https://github.com/mickasmt/next-saas-stripe-starter",
  },
  mailSupport: "sac@lisbom.com.br"
}
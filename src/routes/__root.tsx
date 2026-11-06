import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts, type ErrorComponentProps } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return <div className="flex min-h-screen items-center justify-center bg-background px-4"><div className="max-w-md text-center"><h1 className="text-7xl font-bold text-foreground">404</h1><h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2><p className="mt-2 text-sm text-muted-foreground">A página não existe ou foi movida.</p><div className="mt-6"><Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Voltar ao início</Link></div></div></div>;
}
function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return <div className="flex min-h-screen items-center justify-center bg-background px-4"><div className="max-w-md text-center"><h1 className="text-xl font-semibold">Não foi possível carregar a página</h1><p className="mt-2 text-sm">Tente atualizar ou voltar ao início.</p><button onClick={() => { router.invalidate(); reset(); }} className="mt-6 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Tentar novamente</button></div></div>;
}
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({ meta: [
    { charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: "Natal em Casa | Árvores de Natal para momentos especiais" },
    { name: "description", content: "Encontre sua árvore de Natal em três tamanhos: 1m, 1,50m e 1,80m. Escolha a sua e faça seu pedido." },
    { name: "theme-color", content: "#173b2d" },
    { property: "og:title", content: "Natal em Casa | O encanto começa na sua casa" },
    { property: "og:description", content: "Três tamanhos de árvores de Natal para criar momentos especiais." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }
  ], links: [{ rel: "stylesheet", href: appCss }, { rel: "icon", href: "/favicon.ico", type: "image/x-icon" }] }),
  shellComponent: RootShell, component: RootComponent, notFoundComponent: NotFoundComponent, errorComponent: ErrorComponent
});
function RootShell({ children }: { children: ReactNode }) {
  return <html lang="pt-BR"><head><HeadContent /></head><body>{children}<Scripts /></body></html>;
}
function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>;
}

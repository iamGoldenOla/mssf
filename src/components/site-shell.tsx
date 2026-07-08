import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { PushNotification } from "./push-notification";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-offwhite text-charcoal">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <PushNotification />
    </div>
  );
}

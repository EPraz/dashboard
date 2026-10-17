import { WebAnchor } from "@/features/aster/ui/WebAnchor";
import { Link } from "expo-router";
import Head from "expo-router/head";
import { AsterMark } from "../features/aster/ui/AsterLogo";

export default function NotFound() {
  return (
    <main className="not-found">
      <Head>
        <title>Page not found · Aster</title>
      </Head>
      <AsterMark />
      <p className="eyebrow">A SMALL DETOUR</p>
      <h1>This page is out of tune.</h1>
      <p className="muted">
        The address may have changed. Your workspace is just a click away.
      </p>
      <Link href="/dashboard" asChild>
        <WebAnchor className="button button-primary">
          Back to overview
        </WebAnchor>
      </Link>
    </main>
  );
}

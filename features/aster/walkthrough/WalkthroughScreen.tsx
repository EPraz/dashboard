import { Link } from "expo-router";
import Head from "expo-router/head";
import { WebAnchor } from "../ui/WebAnchor";
import "../styles/walkthrough.css";

const transcript = [
  [
    "A connected frontend workspace.",
    "Aster is a sales and marketing dashboard for a fictional audio store. It uses browser-local sample data, with no login, API, or real payments.",
  ],
  [
    "Create a customer connection.",
    "Add Jamie Reed as a lead, acquired through Paid search and the Studio Days campaign.",
  ],
  [
    "Keep follow-up context.",
    "Set the lead to Qualified, add a note, and reload to show the saved context.",
  ],
  [
    "First purchase, first conversion.",
    "Two Aurora Studio Headphones create a USD 358 sample sale, reduce inventory, and convert the lead.",
  ],
  [
    "A repeat purchase.",
    "One more unit adds USD 179. Two purchases total USD 537; the customer still counts as one conversion.",
  ],
  [
    "Trace the result.",
    "Inspect the transaction’s buyer, product and campaign. Available inventory falls from 42 to 39, and the overview adds USD 537 in paid revenue.",
  ],
  [
    "Campaign contribution.",
    "Studio Days receives the attributed revenue from both purchases.",
  ],
  [
    "Plan the next move.",
    "Save a USD 1,500 budget proposal with allocations totaling 100%. This planning simulation does not alter achieved sales.",
  ],
  [
    "Reconcile and export.",
    "Filter Jamie’s two purchases and export the matching records to CSV.",
  ],
  [
    "Explore the interface.",
    "Switch from Petrol & apricot to Ink & periwinkle, reload to retain the preference, and navigate the actual mobile layout.",
  ],
];

export default function WalkthroughScreen() {
  return (
    <main className="walkthrough-page">
      <Head>
        <title>Aster · Product walkthrough</title>
        <meta
          name="description"
          content="Watch Aster’s captioned frontend walkthrough: follow a lead through two purchases, inventory, revenue, campaigns and a responsive workspace."
        />
      </Head>
      <div className="walkthrough-inner">
        <Link href="/dashboard" asChild>
          <WebAnchor className="walkthrough-back">
            <img src="/favicon.svg" alt="" /> Explore the Aster demo
          </WebAnchor>
        </Link>
        <header>
          <p className="walkthrough-eyebrow">PRODUCT WALKTHROUGH</p>
          <h1>See Aster in action.</h1>
          <p className="walkthrough-description">
            Follow a lead from first contact to repeat purchase, then explore
            the connected reports, budget planning, and both palettes.
          </p>
        </header>
        <video
          controls
          playsInline
          preload="metadata"
          poster="/walkthrough/poster.jpg"
          aria-label="Aster product walkthrough with embedded English captions"
        >
          <source src="/walkthrough/aster-walkthrough.mp4" type="video/mp4" />
          Your browser cannot play this video.{" "}
          <a href="/walkthrough/aster-walkthrough.mp4">
            Download the MP4 walkthrough
          </a>
          .
        </video>
        <div className="walkthrough-meta">
          <span>3:06</span>
          <span>1080p</span>
          <span>English captions · silent video</span>
        </div>
        <nav className="walkthrough-links" aria-label="Portfolio resources">
          <Link href="/dashboard" asChild>
            <WebAnchor>Try the demo →</WebAnchor>
          </Link>
          <a href="https://github.com/EPraz/dashboard">View the repository →</a>
          <a href="/walkthrough/aster-walkthrough.mp4" download>
            Download MP4
          </a>
          <a href="/walkthrough/aster-walkthrough.vtt" download>
            Download captions
          </a>
        </nav>
        <details>
          <summary>Read the walkthrough transcript</summary>
          <ol>
            {transcript.map(([title, text]) => (
              <li key={title}>
                <strong>{title}</strong> {text}
              </li>
            ))}
          </ol>
        </details>
        <p className="walkthrough-scope">
          All contacts and commercial records are fictional. Edits remain in one
          browser on one device. The walkthrough shows the real public frontend;
          it does not represent payment processing, a backend, or cross-device
          synchronization.
        </p>
      </div>
    </main>
  );
}

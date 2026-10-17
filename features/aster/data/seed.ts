import {
  type Campaign,
  type DemoState,
  type Lead,
  type Product,
  type Transaction,
  sources,
} from "./model";
import { initialBudget } from "./budget";

const catalog: (Omit<Product, "openingStock"> & { stock: number })[] = [
  {
    id: "aurora",
    sku: "AST-H01",
    name: "Aurora Studio Headphones",
    category: "Headphones",
    kind: "headphones",
    priceCents: 17900,
    stock: 42,
    lowStockThreshold: 8,
    description:
      "A balanced, over-ear listening companion. Closed-back comfort for focused sessions and everyday listening.",
  },
  {
    id: "nova",
    sku: "AST-S01",
    name: "Nova Soundbar",
    category: "Speakers",
    kind: "speaker",
    priceCents: 24900,
    stock: 18,
    lowStockThreshold: 5,
    description:
      "Room-filling sound in a considered, compact shape. A simple upgrade for films, music, and everything in between.",
  },
  {
    id: "echo",
    sku: "AST-M01",
    name: "Echo Wireless Microphone",
    category: "Microphones",
    kind: "microphone",
    priceCents: 9900,
    stock: 7,
    lowStockThreshold: 8,
    description:
      "Clear voice capture without the cables. A lightweight microphone for conversations, recording, and creative work.",
  },
  {
    id: "luma",
    sku: "AST-S02",
    name: "Luma Desktop Speakers",
    category: "Speakers",
    kind: "speaker",
    priceCents: 12900,
    stock: 25,
    lowStockThreshold: 6,
    description:
      "A thoughtful pair for a better desk setup. Warm, detailed audio that fits into your workspace.",
  },
  {
    id: "orbit",
    sku: "AST-H02",
    name: "Orbit Wireless Earbuds",
    category: "Headphones",
    kind: "headphones",
    priceCents: 8900,
    stock: 0,
    lowStockThreshold: 6,
    description:
      "Small essentials for your daily soundtrack. A pocket-sized case and comfortable wireless listening.",
  },
  {
    id: "bassline",
    sku: "AST-S03",
    name: "Bassline Subwoofer",
    category: "Speakers",
    kind: "speaker",
    priceCents: 29900,
    stock: 3,
    lowStockThreshold: 5,
    description:
      "Depth you can feel. A compact low-frequency companion for a complete home listening setup.",
  },
  {
    id: "studio-cable",
    sku: "AST-A01",
    name: "Studio USB-C Cable",
    category: "Accessories",
    kind: "accessory",
    priceCents: 1900,
    stock: 80,
    lowStockThreshold: 12,
    description:
      "A durable connection for your recording setup. Braided cable with a considered, dependable finish.",
  },
  {
    id: "arc-stand",
    sku: "AST-A02",
    name: "Arc Microphone Stand",
    category: "Accessories",
    kind: "microphone",
    priceCents: 3900,
    stock: 16,
    lowStockThreshold: 5,
    description:
      "A steady place for your next idea. Adjustable support that keeps a creative workspace organized.",
  },
];
const firstNames = [
  "Morgan",
  "Jamie",
  "Taylor",
  "Jordan",
  "Cameron",
  "Riley",
  "Avery",
  "Quinn",
  "Casey",
  "Reese",
  "Drew",
  "Parker",
  "Robin",
  "Ellis",
  "Skyler",
  "Rowan",
  "Sage",
  "Finley",
  "Hayden",
  "Emerson",
  "Adrian",
  "Blake",
  "Charlie",
  "Dakota",
];
const lastNames = [
  "Chen",
  "Brooks",
  "Rivera",
  "Patel",
  "Kim",
  "Bennett",
  "Silva",
  "Morgan",
  "Reed",
  "Park",
  "Santos",
  "Hayes",
  "Martin",
  "Clarke",
  "Diaz",
  "Wilson",
  "Nguyen",
  "James",
  "Lopez",
  "Carter",
  "Evans",
  "Murphy",
  "Allen",
  "Scott",
];

export function createSeed(now = new Date()): DemoState {
  const ago = (days: number) =>
    new Date(now.getTime() - days * 86_400_000).toISOString();
  const campaigns: Campaign[] = [
    { id: "studio-days", name: "Studio Days", source: "Paid search" },
    { id: "listen-closer", name: "Listen Closer", source: "Email" },
    {
      id: "your-daily-sound",
      name: "Your Daily Sound",
      source: "Social media",
    },
    { id: "sound-at-home", name: "Sound at Home", source: "Display ads" },
  ];
  const leads: Lead[] = Array.from({ length: 72 }, (_, index) => {
    const age = (index * 7) % 89;
    const name = `${firstNames[index % firstNames.length]} ${lastNames[(index * 5 + Math.floor(index / 24)) % lastNames.length]}`;
    const source = sources[index % sources.length];
    return {
      id: `lead-${String(index + 1).padStart(3, "0")}`,
      name,
      email: `${name.toLowerCase().replaceAll(" ", ".")}${index + 1}@example.com`,
      source,
      campaignId:
        index % 4 === 0
          ? undefined
          : campaigns.find((item) => item.source === source)?.id,
      status: (["New", "Contacted", "Qualified", "Lost"] as const)[index % 4],
      createdAt: ago(age),
      lastContactAt: ago(Math.max(0, age - 2)),
      notes:
        index % 7 === 0
          ? [
              {
                id: `note-${index}`,
                text: "Asked about a new home audio setup. Follow up with product recommendations.",
                createdAt: ago(Math.max(0, age - 2)),
              },
            ]
          : [],
    };
  });
  const transactions: Transaction[] = [];
  leads.forEach((lead, index) => {
    if (index % 3 !== 0) return;
    const product = catalog[index % catalog.length];
    const quantity = 1 + (index % 2);
    const age = (index * 7) % 89;
    lead.status = "Converted";
    transactions.push({
      id: `AST-${1001 + transactions.length}`,
      leadId: lead.id,
      productId: product.id,
      quantity,
      unitPriceCents: product.priceCents,
      amountCents: product.priceCents * quantity,
      createdAt: ago(Math.max(0, age - 3)),
      campaignId: lead.campaignId,
    });
    if (index % 9 === 0) {
      const repeatProduct = catalog[(index + 2) % catalog.length];
      transactions.push({
        id: `AST-${1001 + transactions.length}`,
        leadId: lead.id,
        productId: repeatProduct.id,
        quantity: 1,
        unitPriceCents: repeatProduct.priceCents,
        amountCents: repeatProduct.priceCents,
        createdAt: ago(Math.max(0, age - 5)),
        campaignId: lead.campaignId,
      });
    }
  });
  const products = catalog.map(({ stock, ...product }) => ({
    ...product,
    openingStock:
      stock +
      transactions
        .filter((item) => item.productId === product.id)
        .reduce((total, item) => total + item.quantity, 0),
  }));
  return {
    version: 1,
    initializedAt: now.toISOString(),
    leads,
    products,
    campaigns,
    transactions,
    budgetPlan: initialBudget(),
  };
}

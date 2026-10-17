import type { Product } from "../data/model";

export function ProductArt({
  product,
  large = false,
}: {
  product: Product;
  large?: boolean;
}) {
  return (
    <div className={`product-art ${large ? "large" : ""} art-${product.kind}`}>
      <svg
        viewBox="0 0 200 150"
        role="img"
        aria-label={`${product.name} illustration`}
      >
        <circle cx="100" cy="77" r="58" fill="var(--accent-soft)" />
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {product.kind === "headphones" && (
            <>
              <path d="M53 86V69a47 47 0 0 1 94 0v17" />
              <path
                d="M64 73v-6a36 36 0 0 1 72 0v6"
                strokeWidth="2"
                opacity=".5"
              />
              <rect
                x="46"
                y="77"
                width="22"
                height="41"
                rx="10"
                fill="var(--surface)"
              />
              <rect
                x="132"
                y="77"
                width="22"
                height="41"
                rx="10"
                fill="var(--surface)"
              />
              <path
                d="M59 86v22m82-22v22"
                strokeWidth="2"
                stroke="var(--accent-secondary)"
              />
            </>
          )}
          {product.kind === "speaker" && (
            <>
              <rect
                x="66"
                y="22"
                width="68"
                height="110"
                rx="12"
                fill="var(--surface)"
              />
              <circle cx="100" cy="52" r="11" />
              <circle cx="100" cy="96" r="24" />
              <circle
                cx="100"
                cy="96"
                r="10"
                stroke="var(--accent-secondary)"
                strokeWidth="3"
              />
              <path d="M78 140h44" strokeWidth="2" />
            </>
          )}
          {product.kind === "microphone" && (
            <>
              <rect
                x="81"
                y="23"
                width="38"
                height="67"
                rx="19"
                fill="var(--surface)"
              />
              <path d="M69 70v8a31 31 0 0 0 62 0v-8M100 110v20m-23 2h46" />
              <path
                d="M91 38h18m-18 10h18m-18 10h18"
                strokeWidth="2"
                stroke="var(--accent-secondary)"
              />
            </>
          )}
          {product.kind === "accessory" && (
            <>
              <path d="M65 58c-33 42 9 82 48 62 25-13 39-54 11-67-25-11-54 35-18 37" />
              <rect
                x="57"
                y="24"
                width="20"
                height="35"
                rx="5"
                fill="var(--surface)"
              />
              <path
                d="M63 24v-9h8v9m45 51 13-16"
                stroke="var(--accent-secondary)"
              />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}

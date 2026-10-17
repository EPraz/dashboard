import { WebAnchor } from "@/features/aster/ui/WebAnchor";
import { Link, type Href } from "expo-router";
import { PageHeader } from "./primitives";

export function RecordNotFound({
  entity,
  path,
}: {
  entity: string;
  path: Href;
}) {
  return (
    <div className="page-stack">
      <PageHeader
        title={`${entity} not found`}
        subtitle="This record is not part of the current demo. It may have been removed by a reset."
        eyebrow="LET’S GET YOU BACK"
      />
      <div>
        <Link href={path} asChild>
          <WebAnchor className="button button-primary">
            Back to{" "}
            {entity.toLowerCase() === "lead"
              ? "leads"
              : entity.toLowerCase() === "product"
                ? "products"
                : "transactions"}
          </WebAnchor>
        </Link>
      </div>
    </div>
  );
}

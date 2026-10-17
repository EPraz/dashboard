import { WebAnchor } from "@/features/aster/ui/WebAnchor";
import { Link } from "expo-router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { addLeadNote, changeLeadStatus, createLead } from "./lead-actions";
import {
  DemoError,
  type ActionResult,
  type BudgetPlan,
  type DemoState,
  type Lead,
  type LeadStatus,
  type Period,
  type Source,
  type Transaction,
  uniqueId,
} from "./model";
import { validateBudget } from "./budget";
import { recordSale, type SaleInput } from "./sale-actions";
import { createSeed } from "./seed";
import { loadSession, saveSession } from "./storage";

type LeadInput = {
  name: string;
  email: string;
  source: Source;
  campaignId?: string;
};
type SessionContext = {
  state: DemoState;
  period: Period;
  setPeriod: (period: Period) => void;
  createLead: (input: LeadInput) => ActionResult<Lead>;
  setStatus: (id: string, status: LeadStatus) => ActionResult<void>;
  addNote: (id: string, text: string) => ActionResult<void>;
  recordSale: (input: SaleInput) => ActionResult<Transaction>;
  saveBudget: (plan: BudgetPlan) => ActionResult<void>;
  reset: () => void;
};
const DemoContext = createContext<SessionContext | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(loadSession);
  const [state, setState] = useState(initial.state);
  const current = useRef(state);
  const blocked = useRef(initial.blocked);
  const [warning, setWarning] = useState(initial.warning);
  const [period, setPeriod] = useState<Period>("30");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4500);
    return () => clearTimeout(timer);
  }, [notice]);
  const run = useCallback(
    <T,>(
      action: (previous: DemoState) => { state: DemoState; value: T },
      message: string,
    ): ActionResult<T> => {
      try {
        const result = action(current.current);
        current.current = result.state;
        setState(result.state);
        if (!blocked.current) {
          try {
            saveSession(result.state);
            setWarning("");
          } catch {
            setWarning(
              "These changes could not be saved. You can keep working, but they will last for this session only.",
            );
          }
        }
        setNotice(message);
        return { ok: true, value: result.value };
      } catch (error) {
        return {
          ok: false,
          message:
            error instanceof Error
              ? error.message
              : "This action could not be completed.",
          field: error instanceof DemoError ? error.field : undefined,
        };
      }
    },
    [],
  );
  const value: SessionContext = {
    state,
    period,
    setPeriod,
    createLead: (input) =>
      run(
        (previous) =>
          createLead(
            previous,
            { ...input, id: uniqueId("lead") },
            new Date().toISOString(),
          ),
        "Lead created. A new connection starts here.",
      ),
    setStatus: (id, status) =>
      run(
        (previous) =>
          changeLeadStatus(previous, id, status, new Date().toISOString()),
        "Lead status updated.",
      ),
    addNote: (id, text) =>
      run(
        (previous) =>
          addLeadNote(
            previous,
            id,
            uniqueId("note"),
            text,
            new Date().toISOString(),
          ),
        "Note added.",
      ),
    recordSale: (input) =>
      run(
        (previous) => recordSale(previous, input, new Date().toISOString()),
        "Demo sale recorded. Inventory and revenue are up to date.",
      ),
    saveBudget: (plan) =>
      run((previous) => {
        validateBudget(plan);
        return { state: { ...previous, budgetPlan: plan }, value: undefined };
      }, "Budget plan saved. Historical results are unchanged."),
    reset: () => {
      blocked.current = false;
      run(
        () => ({ state: createSeed(), value: undefined }),
        "Demo reset. A fresh workspace is ready.",
      );
      setPeriod("30");
    },
  };
  return (
    <DemoContext.Provider value={value}>
      {warning && (
        <div className="storage-warning" role="status">
          {warning}{" "}
          <Link href="/dashboard/settings" asChild>
            <WebAnchor>Open Settings</WebAnchor>
          </Link>
        </div>
      )}
      {children}
      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error("Aster data requires DemoProvider.");
  return value;
}

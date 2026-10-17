import {
  DemoError,
  leadStatuses,
  sources,
  type DemoState,
  type Lead,
  type LeadStatus,
  type Source,
} from "./model";

export function createLead(
  state: DemoState,
  input: {
    id: string;
    name: string;
    email: string;
    source: Source;
    campaignId?: string;
  },
  now: string,
) {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  if (name.length < 2 || name.length > 120)
    throw new DemoError("Use a name between 2 and 120 characters.", "name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    throw new DemoError("Enter a valid email address.", "email");
  if (state.leads.some((lead) => lead.email.toLowerCase() === email))
    throw new DemoError("A lead with this email already exists.", "email");
  if (!sources.includes(input.source))
    throw new DemoError("Choose an acquisition source.", "source");
  const campaign = input.campaignId
    ? state.campaigns.find((item) => item.id === input.campaignId)
    : undefined;
  if (input.campaignId && (!campaign || campaign.source !== input.source))
    throw new DemoError(
      "Choose a campaign for this acquisition source.",
      "campaignId",
    );
  const lead: Lead = {
    id: input.id,
    name,
    email,
    source: input.source,
    campaignId: campaign?.id,
    status: "New",
    createdAt: now,
    lastContactAt: now,
    notes: [],
  };
  return { state: { ...state, leads: [lead, ...state.leads] }, value: lead };
}

export function changeLeadStatus(
  state: DemoState,
  id: string,
  status: LeadStatus,
  now: string,
) {
  const lead = state.leads.find((item) => item.id === id);
  if (!lead) throw new DemoError("This lead could not be found.");
  if (
    lead.status === "Converted" ||
    status === "Converted" ||
    !leadStatuses.includes(status)
  )
    throw new DemoError(
      "Converted is reserved for a lead’s first paid purchase.",
      "status",
    );
  return {
    state: {
      ...state,
      leads: state.leads.map((item) =>
        item.id === id ? { ...item, status, lastContactAt: now } : item,
      ),
    },
    value: undefined,
  };
}

export function addLeadNote(
  state: DemoState,
  leadId: string,
  noteId: string,
  text: string,
  now: string,
) {
  if (!state.leads.some((item) => item.id === leadId))
    throw new DemoError("This lead could not be found.");
  const content = text.trim();
  if (!content || content.length > 2000)
    throw new DemoError("Write a note between 1 and 2,000 characters.", "note");
  return {
    state: {
      ...state,
      leads: state.leads.map((item) =>
        item.id === leadId
          ? {
              ...item,
              lastContactAt: now,
              notes: [
                { id: noteId, text: content, createdAt: now },
                ...item.notes,
              ],
            }
          : item,
      ),
    },
    value: undefined,
  };
}

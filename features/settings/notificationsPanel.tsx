import React, { useState } from "react";

type ToggleProps = { defaultOn?: boolean };

const ToggleSwitch: React.FC<ToggleProps> = ({ defaultOn = true }) => {
  const [on, setOn] = useState(defaultOn);

  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        on ? "bg-[#ff7b3b]" : "bg-[#d6d6d6]"
      }`}
      aria-pressed={on}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
          on ? "translate-x-[22px]" : "translate-x-[2px]"
        }`}
      />
    </button>
  );
};

type Item = { label: string; desc: string; on: boolean };

type SectionProps = {
  title: string;
  items: Item[];
};

const Section: React.FC<SectionProps> = ({ title, items }) => {
  return (
    <section>
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.03em] text-[#ff7b3b]">
        {title}
      </h3>

      <div className="space-y-5">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-start justify-between gap-6"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#141414]">
                {item.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#9a9a9a]">
                {item.desc}
              </p>
            </div>

            <div className="pt-1 shrink-0">
              <ToggleSwitch defaultOn={item.on} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const sectionsLeft: SectionProps[] = [
  {
    title: "General Notifications",
    items: [
      {
        label: "Account Updates",
        desc: "Receive notifications for profile changes, password resets, and security alerts",
        on: true,
      },
      {
        label: "System Announcements",
        desc: "Stay informed about system updates, new features, or scheduled maintenance.",
        on: true,
      },
      {
        label: "Subscription Reminders",
        desc: "Get reminders about subscription renewals or plan expiration.",
        on: false,
      },
    ],
  },
  {
    title: "Lead Management Notifications",
    items: [
      {
        label: "New Lead Assignments",
        desc: "Notify when a new lead is assigned to you or your team.",
        on: true,
      },
      {
        label: "Lead Follow-Up Reminders",
        desc: "Receive reminders for scheduled follow-ups with leads.",
        on: true,
      },
      {
        label: "Lead Funnel Stage Updates",
        desc: "Get notified when a lead moves to the next stage in the funnel.",
        on: false,
      },
      {
        label: "High-Priority Leads",
        desc: "Alerts for VIP or high-priority leads added to your pipeline.",
        on: false,
      },
    ],
  },
];

const sectionsRight: SectionProps[] = [
  {
    title: "Sales & Marketing Notifications",
    items: [
      {
        label: "Sales Target Achievements",
        desc: "Get notified when you or your team hit monthly/quarterly sales targets.",
        on: true,
      },
      {
        label: "Promotion Performance",
        desc: "Alerts for promotions or discounts nearing their end date or surpassing performance.",
        on: true,
      },
      {
        label: "New Product Updates",
        desc: "Notify when a new product is added to the catalog.",
        on: false,
      },
    ],
  },
  {
    title: "Team Collaboration Notifications",
    items: [
      {
        label: "Task Assignments",
        desc: "Get notified when a new task is assigned to you in a project.",
        on: true,
      },
      {
        label: "Comments & Mentions",
        desc: "Alerts for comments or when someone mentions you in a task or discussion.",
        on: true,
      },
      {
        label: "Team Activity Updates",
        desc: "Notifications for key updates made by team members on shared projects.",
        on: false,
      },
    ],
  },
];

const NotificationsPanel: React.FC = () => {
  return (
    <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
      <div className="space-y-12">
        {sectionsLeft.map((s) => (
          <Section key={s.title} {...s} />
        ))}
      </div>

      <div className="space-y-12">
        {sectionsRight.map((s) => (
          <Section key={s.title} {...s} />
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;

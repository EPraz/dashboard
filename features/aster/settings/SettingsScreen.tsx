import { useState } from "react";
import { useDemo } from "../data/DemoProvider";
import { ThemeControl } from "../theme/ThemeControl";
import { Dialog } from "../ui/Dialog";
import { Icon } from "../ui/Icon";
import { Button, PageHeader, Panel } from "../ui/primitives";

export default function SettingsScreen() {
  const demo = useDemo();
  const [confirming, setConfirming] = useState(false);
  return (
    <div className="page-stack">
      <PageHeader
        title="Make yourself at home"
        subtitle="A few thoughtful preferences for your workspace."
        eyebrow="SETTINGS"
      />
      <Panel
        title="Appearance"
        description="Two different moods. The same clear picture."
      >
        <div className="settings-row">
          <div>
            <strong>Workspace theme</strong>
            <p className="muted small">
              Petrol & apricot in light. Ink & periwinkle after dark.
            </p>
          </div>
          <ThemeControl />
        </div>
        <p className="info-note">
          Your selection is remembered on this device.
        </p>
      </Panel>
      <Panel
        title="Demo workspace"
        description="All business information is fictional and stored only in this browser."
      >
        <div className="settings-row">
          <div>
            <strong>Start fresh</strong>
            <p className="muted small">
              Restore sample records and the initial plans. Your theme stays as
              you chose it.
            </p>
          </div>
          <Button variant="danger" onClick={() => setConfirming(true)}>
            <Icon name="rotate-ccw" size={16} />
            Reset demo
          </Button>
        </div>
      </Panel>
      {confirming && (
        <Dialog title="Reset demo?" onClose={() => setConfirming(false)}>
          <p className="dialog-description muted">
            This replaces your local leads, notes, purchases, inventory changes,
            and budget plans with a fresh sample workspace. Your appearance
            preference stays.
          </p>
          <div className="form-actions">
            <Button variant="secondary" onClick={() => setConfirming(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                demo.reset();
                setConfirming(false);
              }}
            >
              Reset demo
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
}

import React from "react";
import { Ionicons } from "@expo/vector-icons";

const SelectPill: React.FC<{ defaultValue: string }> = ({ defaultValue }) => (
  <button
    type="button"
    className="flex items-center justify-between gap-3 rounded-full border border-[#ededed] bg-white px-4 py-2 text-sm text-[#2a2a2a] min-w-[160px]"
  >
    <span className="truncate">{defaultValue}</span>
    <Ionicons name="chevron-down" size={16} color="#888" />
  </button>
);

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div>
    <label className="block text-sm font-medium text-[#2a2a2a]">{label}</label>
    <div className="mt-2">{children}</div>
  </div>
);

const TextInput: React.FC<{
  defaultValue?: string;
  placeholder?: string;
  leftIcon?: React.ReactNode;
}> = ({ defaultValue, placeholder, leftIcon }) => (
  <div className="flex items-center gap-3 rounded-full border border-[#ededed] bg-white px-4 py-3">
    {leftIcon ? <div className="text-[#a3a3a3]">{leftIcon}</div> : null}
    <input
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full bg-transparent text-sm text-[#2a2a2a] outline-none placeholder:text-[#bcbcbc]"
    />
  </div>
);

const GeneralProfilePanel: React.FC = () => {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
   
      <div className="space-y-6">
        <div>
          <h3 className="text-base font-semibold text-[#141414]">
            Profile Picture
          </h3>
          <p className="mt-1 text-sm text-[#9a9a9a]">
            Upload or update your profile picture for a personalized touch.
          </p>

          <div className="mt-4 flex items-center gap-5">
            <div className="h-16 w-16 rounded-full border border-[#ededed] bg-[#f7f7f7] flex items-center justify-center text-[10px] text-[#a3a3a3]">
              Image Here
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-full border border-[#ff7b3b] px-4 py-2 text-xs font-semibold text-[#ff7b3b]"
              >
                Delete Image
              </button>
              <button
                type="button"
                className="rounded-full bg-[#ff7b3b] px-4 py-2 text-xs font-semibold text-white"
              >
                Upload Image
              </button>
              <span className="w-full text-xs text-[#9a9a9a]">
                PNG or JPG under 2MB
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="First Name">
            <TextInput defaultValue="Hanna" />
          </Field>
          <Field label="Last Name">
            <TextInput defaultValue="Calzoni" />
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <Field label="Username">
            <TextInput defaultValue="@hannacalzoni" />
          </Field>
          <button
            type="button"
            className="h-[46px] rounded-full border border-[#ff7b3b] px-6 text-sm font-semibold text-[#ff7b3b]"
          >
            Change Username
          </button>
        </div>

        <Field label="Email">
          <TextInput
            defaultValue="hannacalzoni@salescape.com"
            leftIcon={<Ionicons name="mail" size={18} color="#9a9a9a" />}
          />
        </Field>

        <Field label="Phone Number">
          <TextInput
            defaultValue="+01 2345678910"
            leftIcon={<Ionicons name="call" size={18} color="#9a9a9a" />}
          />
        </Field>
      </div>

    
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-base font-semibold text-[#141414]">Language</h3>
            <p className="mt-1 text-sm text-[#9a9a9a]">
              Choose your preferred language for the app's interface to enhance
              usability and comfort.
            </p>
          </div>
          <SelectPill defaultValue="English (US)" />
        </div>

        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-base font-semibold text-[#141414]">
              Date Format
            </h3>
            <p className="mt-1 text-sm text-[#9a9a9a]">
              Select the format in which you want dates to be displayed.
            </p>
          </div>
          <SelectPill defaultValue="DD/MM/YYYY" />
        </div>

        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-base font-semibold text-[#141414]">Timezone</h3>
            <p className="mt-1 text-sm text-[#9a9a9a]">
              Set your preferred timezone for accurate time tracking.
            </p>
          </div>
          <SelectPill defaultValue="Automatically" />
        </div>

        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-base font-semibold text-[#141414]">Currency</h3>
            <p className="mt-1 text-sm text-[#9a9a9a]">
              Choose your preferred currency for transactions and financial
              displays.
            </p>
          </div>
          <SelectPill defaultValue="USD ($)" />
        </div>
      </div>
    </div>
  );
};

export default GeneralProfilePanel;

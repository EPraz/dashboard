import React from "react";
import { Ionicons } from "@expo/vector-icons";

/* Reusable select pill */
const SelectPill: React.FC<{ value: string }> = ({ value }) => (
  <button
    type="button"
    className="flex items-center gap-2 rounded-full border border-[#ededed] bg-white px-4 py-2 text-sm text-[#2a2a2a]"
  >
    <span>{value}</span>
    <Ionicons name="chevron-down" size={16} color="#8c8c8c" />
  </button>
);

const BrandingPreferencePanel: React.FC = () => {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      {/* LEFT COLUMN */}
      <div className="space-y-8">
        {/* Brand Logo */}
        <div>
          <h3 className="text-base font-semibold text-[#141414]">Brand Logo</h3>
          <p className="mt-1 text-sm text-[#9a9a9a]">
            Upload your company logo to customize the look and feel of the dashboard.
          </p>

          <div className="mt-4 flex items-center gap-5">
            <div className="h-16 w-16 rounded-full border border-[#ededed] bg-[#f7f7f7] flex items-center justify-center text-[10px] text-[#a3a3a3]">
              Image Here
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button className="rounded-full border border-[#ff7b3b] px-4 py-2 text-xs font-semibold text-[#ff7b3b]">
                Delete Image
              </button>
              <button className="rounded-full bg-[#ff7b3b] px-4 py-2 text-xs font-semibold text-white">
                Upload Image
              </button>
              <span className="w-full text-xs text-[#9a9a9a]">
                PNG or JPG under 5MB
              </span>
            </div>
          </div>
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-[#2a2a2a]">
            Company Name
          </label>
          <div className="mt-2">
            <input
              defaultValue="Salescape"
              className="w-full rounded-full border border-[#ededed] px-4 py-3 text-sm outline-none"
            />
          </div>
        </div>

        {/* Brand Color */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-base font-semibold text-[#141414]">Brand Color</h3>
            <p className="mt-1 max-w-md text-sm text-[#9a9a9a]">
              Set your brand's primary and secondary colors to ensure the dashboard
              matches your corporate identity.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-full border border-[#ededed] px-3 py-2">
            <span className="h-6 w-12 rounded-full bg-[#ff7b3b]" />
            <Ionicons name="chevron-down" size={16} color="#8c8c8c" />
          </button>
        </div>

        {/* Custom Fonts */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-base font-semibold text-[#141414]">Custom Fonts</h3>
            <p className="mt-1 max-w-md text-sm text-[#9a9a9a]">
              Select from the library to enhance the visual appeal of the interface.
            </p>
          </div>
          <SelectPill value="Urbanist" />
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-10">
        {/* Default Views */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.04em] text-[#ff7b3b]">
            Default Views
          </h3>

          <div className="mt-6 space-y-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h4 className="text-sm font-semibold text-[#141414]">
                  Homepage Layout
                </h4>
                <p className="mt-1 text-sm text-[#9a9a9a]">
                  Choose what you see first when you log in
                </p>
              </div>
              <SelectPill value="Dashboard" />
            </div>

            <div className="flex items-start justify-between gap-6">
              <div>
                <h4 className="text-sm font-semibold text-[#141414]">
                  Chart Preferences
                </h4>
                <p className="mt-1 text-sm text-[#9a9a9a]">
                  Pick your preferred chart types (e.g., Pie Charts, Line Graphs,
                  Bar Charts) for visual data representation.
                </p>
              </div>
              <SelectPill value="All Chart" />
            </div>
          </div>
        </div>

        {/* Data Settings */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.04em] text-[#ff7b3b]">
            Data Settings
          </h3>

          <div className="mt-6 space-y-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h4 className="text-sm font-semibold text-[#141414]">
                  Data Refresh Frequency
                </h4>
                <p className="mt-1 text-sm text-[#9a9a9a]">
                  Control how often the platform updates data to balance between
                  real-time accuracy and optimal performance.
                </p>
              </div>
              <SelectPill value="Real-Time" />
            </div>

            <div className="flex items-start justify-between gap-6">
              <div>
                <h4 className="text-sm font-semibold text-[#141414]">
                  Data Filters
                </h4>
                <p className="mt-1 text-sm text-[#9a9a9a]">
                  Save default filters for frequently accessed reports.
                </p>
              </div>
              <SelectPill value="All Categories" />
            </div>

            <div className="flex items-start justify-between gap-6">
              <div>
                <h4 className="text-sm font-semibold text-[#141414]">
                  Data Export
                </h4>
                <p className="mt-1 text-sm text-[#9a9a9a]">
                  Customize how your data is exported to ensure compatibility and ease of use.
                </p>
              </div>
              <SelectPill value="PDF" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingPreferencePanel;

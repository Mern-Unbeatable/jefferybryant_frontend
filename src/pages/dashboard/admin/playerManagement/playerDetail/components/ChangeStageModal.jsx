import { useState } from "react";
import { FiSliders, FiX } from "react-icons/fi";
import Modal from "@/components/dashboard/Modal";
import SelectField from "@/components/dashboard/form/SelectField";
import { primaryButtonClass, secondaryButtonClass } from "@/components/dashboard/form/formStyles";

const STAGES = [
  { value: "Submitted", label: "Submitted" },
  { value: "Verification", label: "Verification" },
  { value: "Watch", label: "Watch" },
  { value: "Review", label: "Review" },
  { value: "Priority", label: "Priority" },
  { value: "Pass", label: "Pass" },
  { value: "Archived", label: "Archived" },
];

const ChangeStageModal = ({ open, onClose, currentStage, onUpdateStage }) => {
  const [selectedStage, setSelectedStage] = useState(currentStage || "Priority");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStage(selectedStage);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="stage-modal-title" className="max-w-md">
      <div className="rounded-lg border border-white/10 bg-[#161b1f] p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <FiSliders className="text-accent" />
            <h3 id="stage-modal-title" className="text-sm font-semibold uppercase tracking-wider">
              Change Intelligence Stage
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-white/50 hover:bg-white/10 hover:text-white"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <p className="text-[11px] text-white/50">
            Select the new pipeline intelligence stage for this player profile.
          </p>

          <div>
            <label htmlFor="pipelineStage" className="mb-1.5 block text-[10px] uppercase tracking-wider text-white/60">
              Pipeline Stage
            </label>
            <SelectField
              id="pipelineStage"
              name="pipelineStage"
              value={selectedStage}
              onChange={(_, val) => setSelectedStage(val)}
              options={STAGES}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className={secondaryButtonClass}>
              Cancel
            </button>
            <button type="submit" className={primaryButtonClass}>
              Update Stage
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ChangeStageModal;


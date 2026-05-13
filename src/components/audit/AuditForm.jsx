"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Stepper from "./Stepper";
import ToolRow from "./ToolRow";
import ReviewSection from "./ReviewSection";
import TeamForm from "./TeamForm";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";

export default function AuditForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [tools, setTools] = useState([
    { tool: "", plan: "", monthlySpend: "", seats: "" },
  ]);
  const [formData, setFormData] = useState({
    teamSize: "",
    useCase: "",
  });

  const addTool = () => {
    setTools([...tools, { tool: "", plan: "", monthlySpend: "", seats: "" }]);
  };

  const updateTool = (index, field, value) => {
    const newTools = [...tools];
    newTools[index][field] = value;
    setTools(newTools);
  };

  const removeTool = (index) => {
    if (tools.length > 1) {
      setTools(tools.filter((_, i) => i !== index));
    }
  };

  const handleNext = () => {
    if (step === 1) {
      const isValid = tools.every(
        (tool) => tool.tool && tool.plan && tool.seats,
      );

      if (!isValid) {
        alert("Please complete all tool details.");
        return;
      }
    }

    if (step === 2) {
      if (!formData.teamSize || !formData.useCase) {
        alert("Please fill all team details.");
        return;
      }
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      localStorage.setItem(
        "auditData",
        JSON.stringify({
          tools,
          formData,
        }),
      );

      router.push("/results");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto">
        <Stepper step={step} />

        <div
          id="audit-form"
          className="bg-white/80 backdrop-blur-xl rounded-[36px] border border-white/50 shadow-[0_20px_80px_rgba(124,58,237,0.12)] p-8 md:p-10 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200/30 blur-3xl rounded-full"></div>
          {step === 1 && (
            <>
              <div className="mb-10">
                <p className="text-purple-600 font-medium mb-3 text-sm sm:text-base">
                  Your Stack
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold mb-3 leading-tight">
                  Tell us about your AI tools
                </h2>
                <p className="text-gray-500 font-medium mb-3 text-sm sm:text-base">
                  Add the AI tools your team is currently paying for.
                </p>
              </div>

              <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 mb-4">
                <p className="text-sm text-gray-500 font-medium">TOOL</p>
                <p className="text-sm text-gray-500 font-medium">PLAN</p>
                <p className="text-sm text-gray-500 font-medium">SEATS</p>
                <p className="text-sm text-gray-500 font-medium">
                  MONTHLY SPEND
                </p>

                <div className="w-10"></div>
              </div>

              <div className="space-y-4 mb-6">
                {tools.map((item, index) => (
                  <ToolRow
                    tools={tools}
                    item={item}
                    index={index}
                    updateTool={updateTool}
                    removeTool={removeTool}
                    key={index}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={addTool}
                className="flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700 transition mb-4"
              >
                <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </span>
                Add another tool
              </button>
            </>
          )}

          {step === 2 && (
            <TeamForm formData={formData} setFormData={setFormData} />
          )}

          {step === 3 && <ReviewSection tools={tools} formData={formData} />}

          <div className="mt-10 flex justify-between">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="flex h-11 w-11 items-center rounded-full justify-center border border-gray-200 bg-white transition hover:bg-gray-50"
              >
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </button>
            ) : (
              <div></div>
            )}

            <button
              onClick={handleNext}
              className="flex h-11 items-center gap-2 rounded-lg bg-black px-5 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:bg-gray-900"
            >
              {step === 3 ? "Generate Report" : "Continue"}

              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AI_TOOLS } from "../../lib/constants";

const ToolRow = ({ tools, index, updateTool, item, removeTool }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm ">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 items-center">
        <div>
          <p className="md:hidden text-sm font-medium mb-2">Tool</p>

          <Select
            value={item.tool}
            onValueChange={(value) => updateTool(index, "tool", value)}
          >
            <SelectTrigger className="w-full !h-14 rounded-2xl border-gray-200 bg-white/70 backdrop-blur-sm text-sm shadow-sm">
              <SelectValue placeholder="Select tool" />
            </SelectTrigger>

            <SelectContent>
              {Object.entries(AI_TOOLS).map(([key, tool]) => (
                <SelectItem key={key} value={key}>
                  {tool.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="md:hidden text-sm font-medium mb-2">Plan</p>

          <Select
            value={item.plan}
            disabled={!item.tool}
            onValueChange={(value) => updateTool(index, "plan", value)}
          >
            <SelectTrigger className="w-full !h-14 rounded-2xl border-gray-200 bg-white/70 backdrop-blur-sm text-sm shadow-sm">
              <SelectValue placeholder="Select plan" />
            </SelectTrigger>

            <SelectContent>
              {item.tool &&
                Object.entries(AI_TOOLS[item.tool].plans).map(
                  ([planKey, plan]) => (
                    <SelectItem key={planKey} value={planKey}>
                      {plan.name} (${plan.price})
                    </SelectItem>
                  ),
                )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="md:hidden text-sm font-medium mb-2">Seats</p>

          <Select
            value={item.seats}
            disabled={!item.plan}
            onValueChange={(value) => updateTool(index, "seats", value)}
          >
            <SelectTrigger className="w-full !h-14 rounded-2xl border-gray-200 bg-white/70 backdrop-blur-sm text-sm shadow-sm">
              <SelectValue placeholder="Seats" />
            </SelectTrigger>

            <SelectContent>
              {[1, 2, 3, 5, 10, 20, 50].map((seat) => (
                <SelectItem key={seat} value={String(seat)}>
                  {seat} seats
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="md:hidden text-sm font-medium mb-2">Monthly Cost</p>

          <div className="!h-14 rounded-2xl border border-gray-200 bg-gray-50 flex items-center px-4 text-sm font-medium">
            $
            {item.tool && item.plan && item.seats
              ? AI_TOOLS[item.tool].plans[item.plan].price * Number(item.seats)
              : "--"}
          </div>
        </div>

        <button
          type="button"
          onClick={() => removeTool(index)}
          className={`w-11 h-11 rounded-2xl flex items-center justify-center border border-gray-200 hover:bg-gray-100 transition ${
            tools.length === 1 ? "opacity-30 cursor-not-allowed" : "opacity-100"
          }`}
          disabled={tools.length === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ToolRow;

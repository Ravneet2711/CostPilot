import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TEAM_SIZES, USE_CASES } from "../../lib/constants";

const TeamForm = ({ formData, setFormData }) => {
  return (
    <>
      <div className="mb-10">
        <p className="text-purple-600 font-medium mb-3">Usage & Team</p>
        <h2 className="text-3xl font-semibold mb-3">Tell us about your team</h2>
        <p className="text-gray-500">
          Help us understand how your team uses AI tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-3">Team Size</label>
          <Select
            value={formData.teamSize}
            onValueChange={(value) =>
              setFormData({ ...formData, teamSize: value })
            }
          >
            <SelectTrigger className="w-full !h-12 min-h-12 rounded-xl border-gray-200 text-sm">
              <SelectValue placeholder="Select team size" />
            </SelectTrigger>
            <SelectContent>
              {TEAM_SIZES.map((team) => (
                <SelectItem key={team.value} value={team.value}>
                  {team.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            Primary Use Case
          </label>
          <Select
            value={formData.useCase}
            onValueChange={(value) =>
              setFormData({ ...formData, useCase: value })
            }
          >
            <SelectTrigger className="w-full !h-12 min-h-12 rounded-xl border-gray-200 text-sm">
              <SelectValue placeholder="Select use case" />
            </SelectTrigger>
            <SelectContent>
              {USE_CASES.map((useCase) => (
                <SelectItem key={useCase.value} value={useCase.value}>
                  {useCase.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default TeamForm;

import React from "react";
import { AI_TOOLS, TEAM_SIZES, USE_CASES } from "../../lib/constants";

const ReviewSection = ({ tools, formData }) => {
  return (
    <>
      <div className="mb-10">
        <p className="text-purple-600 font-medium mb-3">Review</p>
        <h2 className="text-3xl font-semibold mb-3">Review your details</h2>
        <p className="text-gray-500">
          Please confirm your information before submitting.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-linear-to-br from-white to-gray-50 border border-gray-100 shadow-sm rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-4">Your Stack</h3>
          <div className="space-y-4">
            {tools.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
              >
                <div>
                  <p className="text-gray-500">Tool</p>
                  <p className="font-medium capitalize">
                    {item.tool ? AI_TOOLS[item.tool].name : "Not selected"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Plan</p>
                  <p className="font-medium capitalize">
                    {item.tool && item.plan
                      ? `${AI_TOOLS[item.tool].plans[item.plan].name}
     ($${AI_TOOLS[item.tool].plans[item.plan].price})`
                      : "Not selected"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Monthly Spend</p>
                  <p className="font-medium">
                    {item.tool && item.plan && item.seats
                      ? `$${
                          AI_TOOLS[item.tool].plans[item.plan].price *
                          Number(item.seats)
                        }`
                      : "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Seats</p>
                  <p className="font-medium">
                    {item.seats ? `${item.seats} seats` : "Not provided"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-4">Team & Usage</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Team Size</p>
              <p className="font-medium">
                {TEAM_SIZES.find((team) => team.value === formData.teamSize)
                  ?.label || "Not selected"}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Primary Use Case</p>
              <p className="font-medium capitalize">
                {USE_CASES.find((useCase) => useCase.value === formData.useCase)
                  ?.label || "Not selected"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewSection;

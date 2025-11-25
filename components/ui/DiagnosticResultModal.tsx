"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface DiagnosticResult {
  final_probability: number;
  final_prediction: number;
  text_prediction?: number;
  text_probability?: number;
  image_prediction?: number;
  image_probability?: number;
}

interface DiagnosticResultModalProps {
  result: DiagnosticResult;
  isOpen: boolean;
  onClose: () => void;
}

const DiagnosticResultModal: React.FC<DiagnosticResultModalProps> = ({
  result,
  isOpen,
  onClose,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!isOpen) return null;

  const finalProbability = result.final_probability || 0;
  const benignProbability = 1 - finalProbability;
  const predictionText = result.final_prediction === 0 ? "Benigno" : "Maligno";
  const predictionColor = result.final_prediction === 0 ? "#10B981" : "#EF4444";

  const chartData = [
    {
      name: predictionText,
      value: (finalProbability * 100).toFixed(1),
      probability: finalProbability,
      color: predictionColor,
    },
    {
      name: result.final_prediction === 0 ? "Maligno" : "Benigno",
      value: (benignProbability * 100).toFixed(1),
      probability: benignProbability,
      color: result.final_prediction === 0 ? "#EF4444" : "#10B981",
    },
  ];

  const formatProbability = (prob: number | undefined) => {
    if (prob === undefined) return "N/A";
    return `${(prob * 100).toFixed(2)}%`;
  };

  const formatPrediction = (pred: number | undefined) => {
    if (pred === undefined) return "N/A";
    return pred === 0 ? "Benigno" : "Maligno";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl border border-[#E1E5EA] bg-white shadow-xl">
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-[#E1E5EA] px-6 py-4">
          <h2 className="text-2xl font-black tracking-tighter text-[#333333]">Resultado del Diagnóstico</h2>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto px-6 py-6">
          {/* Prediction Text */}
          <div className="mb-6 text-center">
            <p className="text-sm text-slate-500 mb-2">En base a</p>
            <div
              className="inline-block rounded-lg px-6 py-3 text-2xl font-black tracking-tighter text-white"
              style={{ backgroundColor: predictionColor }}
            >
              {predictionText}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="probability"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${(value * 100).toFixed(2)}%`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Details Section */}
          <div className="border-t border-[#E1E5EA] pt-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex w-full items-center justify-between rounded-lg bg-[#F4F7FA] px-4 py-3 text-left transition-colors hover:bg-[#E1E5EA]"
            >
              <span className="text-sm font-semibold text-[#333333]">Details</span>
              <span
                className={`material-symbols-outlined transition-transform ${
                  showDetails ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </button>

            {showDetails && (
              <div className="mt-4 space-y-3 rounded-lg border border-[#E1E5EA] bg-white p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-[#F4F7FA] p-3">
                    <p className="text-xs text-slate-500 mb-1">
                      Predicción de Texto
                    </p>
                    <p className="text-base font-semibold text-[#333333]">
                      {formatPrediction(result.text_prediction)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-[#F4F7FA] p-3">
                    <p className="text-xs text-slate-500 mb-1">
                      Probabilidad de Texto
                    </p>
                    <p className="text-base font-semibold text-[#333333]">
                      {formatProbability(result.text_probability)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-[#F4F7FA] p-3">
                    <p className="text-xs text-slate-500 mb-1">
                      Predicción de Imagen
                    </p>
                    <p className="text-base font-semibold text-[#333333]">
                      {formatPrediction(result.image_prediction)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-[#F4F7FA] p-3">
                    <p className="text-xs text-slate-500 mb-1">
                      Probabilidad de Imagen
                    </p>
                    <p className="text-base font-semibold text-[#333333]">
                      {formatProbability(result.image_probability)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-[#E1E5EA] px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-[#18D2D5] px-6 py-3 font-bold text-[#0A1931] transition-colors hover:bg-[#18D2D5]/90"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticResultModal;


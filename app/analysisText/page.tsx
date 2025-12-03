"use client";

import { submitText } from "@/actions/submit-image-action";
import { useState } from "react";

interface ClinicalField {
  id: string;
  label: string;
  description: string;
}

export const CLINICAL_FIELDS: ClinicalField[] = [
  {
    id: "clump_thickness",
    label: "Grosor de la Masa",
    description: "Espesor del grupo celular",
  },
  {
    id: "uniformity_cell_size",
    label: "Uniformidad del Tamaño Celular",
    description: "Uniformidad del tamaño celular",
  },
  {
    id: "uniformity_cell_shape",
    label: "Uniformidad de la Forma Celular",
    description: "Uniformidad de la forma celular",
  },
  {
    id: "marginal_adhesion",
    label: "Adhesión Marginal",
    description: "Adhesión marginal",
  },
  {
    id: "single_epithelial_size",
    label: "Tamaño de la Célula Epitelial Única",
    description: "Tamaño de célula epitelial única",
  },
  {
    id: "bare_nuclei",
    label: "Núcleos Desnudos",
    description: "Núcleos desnudos",
  },
  {
    id: "bland_chromatin",
    label: "Cromatina Blanda",
    description: "Cromatina suave",
  },
  {
    id: "normal_nucleoli",
    label: "Nucléolos Normales",
    description: "Nucléolos normales",
  },
  {
    id: "mitoses",
    label: "Mitosis",
    description: "Mitosis",
  },
];

interface ApiResponse {
  prediction: number;
  probability: number;
}

interface FormDataState {
  [key: string]: number;
}

function Page() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [formData, setFormData] = useState<FormDataState>({
    clump_thickness: 5,
    uniformity_cell_size: 5,
    uniformity_cell_shape: 5,
    marginal_adhesion: 5,
    single_epithelial_size: 5,
    bare_nuclei: 5,
    bland_chromatin: 5,
    normal_nucleoli: 5,
    mitoses: 5,
  });

  const handleInputChange = (field: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Math.max(1, Math.min(10, value)),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setMessage(null);
    setResult(null);

    const jsonData: Record<string, number> = {};

    try {

      Object.keys(formData).forEach((key) => {
         jsonData[key] = Number(formData[key]); // Conversión segura
      });

      const data = await submitText(jsonData);
      if(data){
        setResult(data);
        setMessage("¡Análisis completado exitosamente!");
      }
    } catch (error) {
      console.error("Error al analizar:", error);
      setMessage(
        `Error en el análisis: ${
          error instanceof Error ? error.message : "Error desconocido del servidor."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mt-20 grow bg-[#F4F7FA]">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* PageHeading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tighter text-[#333333] md:text-5xl">
            Análisis por Parámetros Clínicos
          </h1>
          <p className="mt-2 text-slate-500">
            Ingrese los datos clínicos del paciente para ejecutar un análisis de diagnóstico.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-6 rounded-xl border border-[#E1E5EA] bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-[#333333]">
                Introducir parámetros de diagnóstico
              </h2>
              <p className="text-sm text-slate-500">
                Complete los datos clínicos para un diagnóstico completo.
              </p>
            </div>

            <form
              id="diagnosticForm"
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8"
            >
              {CLINICAL_FIELDS.map((field, index) => (
                <div key={field.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label
                        htmlFor={field.id}
                        className="block text-sm font-semibold text-[#333333]"
                      >
                        {index + 1}. {field.label}
                      </label>
                      <p className="mt-1 text-xs text-slate-500">
                        {field.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-[#18D2D5]">
                        {formData[field.id]}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">/ 10</span>
                    </div>
                  </div>

                  {/* Range Input */}
                  <div className="relative">
                    <input
                      type="range"
                      id={field.id}
                      name={field.id}
                      min="1"
                      max="10"
                      step="1"
                      value={formData[field.id]}
                      onChange={(e) =>
                        handleInputChange(field.id, parseInt(e.target.value))
                      }
                      className="w-full h-2 bg-[#E1E5EA] rounded-lg appearance-none cursor-pointer accent-[#18D2D5]"
                      style={{
                        background: `linear-gradient(to right, #18D2D5 0%, #18D2D5 ${
                          ((formData[field.id] - 1) / 9) * 100
                        }%, #E1E5EA ${
                          ((formData[field.id] - 1) / 9) * 100
                        }%, #E1E5EA 100%)`,
                      }}
                    />
                    <div className="flex justify-between mt-1 text-xs text-slate-400">
                      <span>1</span>
                      <span>5</span>
                      <span>10</span>
                    </div>
                  </div>

                  {/* Number Input */}
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData[field.id]}
                      onChange={(e) =>
                        handleInputChange(
                          field.id,
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-20 px-3 py-2 rounded-md border border-[#E1E5EA] bg-white text-sm text-center font-medium text-[#333333] focus:border-[#18D2D5] focus:ring-2 focus:ring-[#18D2D5]/20 focus:outline-none"
                    />
                    <span className="text-sm text-slate-500">Valor (1-10)</span>
                  </div>
                </div>
              ))}
            </form>

            {message && (
              <p className={`text-sm ${result ? 'text-green-600' : 'text-gray-800'}`}>
                {message}
              </p>
            )}

            {/* Resultados del Análisis */}
            {result && (
              <div className="rounded-lg border border-[#E1E5EA] bg-gradient-to-br from-[#18D2D5]/10 to-[#18D2D5]/5 p-6">
                <h3 className="mb-4 text-lg font-bold text-[#333333]">
                  Resultados del Análisis
                </h3>
                
                <div className="rounded-md bg-[#18D2D5] p-4 text-white">
                  <p className="text-xs opacity-90">Predicción</p>
                  <p className="text-lg font-bold">
                    {result.prediction === 1 ? "Maligno" : "Benigno"}
                    <span className="ml-2 text-sm opacity-90">
                      ({(result.probability * 100).toFixed(2)}%)
                    </span>
                  </p>
                </div>
                <p className="m-6 text-xs text-center text-gray-500">
                  Este análisis es solo una referencia y no reemplaza una evaluación médica. Para un diagnóstico definitivo, consulta con tu médico o un profesional de salud.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Submission Area */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <button
            type="submit"
            form="diagnosticForm"
            disabled={loading}
            className="flex h-12 w-full max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#18D2D5] px-6 text-base font-bold text-white shadow-lg shadow-[#18D2D5]/30 transition-all hover:bg-[#18D2D5]/90 focus:outline-none focus:ring-4 focus:ring-[#18D2D5]/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analizando..." : "Ejecutar diagnóstico"}
          </button>
          <p className="max-w-md text-center text-xs text-slate-400">
            Al enviar, usted acepta que sus datos se procesarán de forma segura
            de acuerdo con nuestra Política de Privacidad. Esta herramienta
            proporciona un análisis preliminar y no sustituye el asesoramiento
            médico profesional.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Page;
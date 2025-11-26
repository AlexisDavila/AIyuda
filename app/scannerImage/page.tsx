"use client";

import { submitImage } from "@/actions/submit-image-action";
import { useRef, useState } from "react";

interface ClinicalField {
  id: string;
  label: string;
  placeholder: string;
}

export const CLINICAL_FIELDS: ClinicalField[] = [
  {
    id: "clump_thickness",
    label: "Grosor de la Masa",
    placeholder: "e.g., 5",
  },
  {
    id: "uniformity_cell_size",
    label: "Uniformidad del Tamaño Celular",
    placeholder: "e.g., 1",
  },
  {
    id: "uniformity_cell_shape",
    label: "Uniformidad de la Forma Celular",
    placeholder: "e.g., 1",
  },
  {
    id: "marginal_adhesion",
    label: "Adhesión Marginal",
    placeholder: "e.g., 1",
  },
  {
    id: "single_epithelial_size",
    label: "Tamaño de la Célula Epitelial Única",
    placeholder: "e.g., 2",
  },
  {
    id: "bare_nuclei",
    label: "Núcleos Desnudos",
    placeholder: "e.g., 1",
  },
  {
    id: "bland_chromatin",
    label: "Cromatina Blanda",
    placeholder: "e.g., 3",
  },
  {
    id: "normal_nucleoli",
    label: "Nucléolos Normales",
    placeholder: "e.g., 1",
  },
  {
    id: "mitoses",
    label: "Mitosis",
    placeholder: "e.g., 1",
  },
];

interface ApiResponse {
  text_prediction: number;
  text_probability: number;
  image_prediction: number;
  image_probability: number;
  final_prediction: number;
  final_probability: number;
}

function Page() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setMessage(null);
    setResult(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Por favor, selecciona un archivo antes de analizar.");
      return;
    }

    if (!["image/jpeg", "image/png"].includes(selectedFile.type)) {
      setMessage("Formato de archivo no válido. Solo JPG y PNG.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    
    // Verificar que todos los campos requeridos tengan valores
    const requiredFields = CLINICAL_FIELDS.map(f => f.id);
    const missingFields = requiredFields.filter(field => !formData.get(field));
    
    if (missingFields.length > 0) {
      setMessage(`Por favor, completa todos los campos: ${missingFields.join(", ")}`);
      return;
    }

    setLoading(true);
    setMessage(null);
    setResult(null);

    try {
      const data = await submitImage(formData)
      if(data){
        setResult(data)
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
            Análisis de Imagen
          </h1>
          <p className="mt-2 text-slate-500">
            Cargue imágenes médicas e ingrese datos del paciente para ejecutar
            un análisis de diagnóstico.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column: Image-Based Analysis */}
          <div className="flex flex-col gap-6 rounded-xl border border-[#E1E5EA] bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#E1E5EA] px-6 py-14 text-center">
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl text-[#18D2D5]">
                  {loading ? "⏳" : selectedFile ? "✓" : "📁"}
                </span>

                <p className="text-lg font-bold tracking-tight text-[#333333]">
                  {selectedFile
                    ? `Archivo: ${selectedFile.name}`
                    : "Análisis basado en imágenes"}
                </p>
                <p className="max-w-xs text-sm text-slate-500">
                  {selectedFile
                    ? `Tamaño: ${(selectedFile.size / 1024 / 1024).toFixed(
                        2
                      )} MB. Listo para analizar.`
                    : `Sube o arrastra y suelta una imagen médica (p. ej., resonancia magnética, tomografía computarizada, radiografía). Formatos de archivo compatibles: JPG, PNG.`}
                </p>
              </div>

              <button
                type="button"
                onClick={handleButtonClick}
                className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#F4F7FA] px-4 text-sm font-bold text-[#333333] hover:bg-slate-200 disabled:opacity-50"
                disabled={loading}
              >
                <span className="truncate">Browse Files</span>
              </button>

              {message && (
                <p className={`mt-4 text-sm ${result ? 'text-green-600' : 'text-gray-800'}`}>
                  {message}
                </p>
              )}
            </div>

            {/* Resultados del Análisis */}
            {result && (
              <div className="rounded-lg border border-[#E1E5EA] bg-gradient-to-br from-[#18D2D5]/10 to-[#18D2D5]/5 p-6">
                <h3 className="mb-4 text-lg font-bold text-[#333333]">
                  Resultados del Análisis
                </h3>
                
                <div className="space-y-3">
                  <div className="rounded-md bg-white p-3">
                    <p className="text-xs text-slate-500">Predicción por Texto</p>
                    <p className="text-sm font-semibold text-[#333333]">
                      {result.text_prediction === 1 ? "Maligno" : "Benigno"}
                      <span className="ml-2 text-slate-500">
                        ({(result.text_probability * 100).toFixed(2)}%)
                      </span>
                    </p>
                  </div>

                  <div className="rounded-md bg-white p-3">
                    <p className="text-xs text-slate-500">Predicción por Imagen</p>
                    <p className="text-sm font-semibold text-[#333333]">
                      {result.image_prediction === 1 ? "Maligno" : "Benigno"}
                      <span className="ml-2 text-slate-500">
                        ({(result.image_probability * 100).toFixed(2)}%)
                      </span>
                    </p>
                  </div>

                  <div className="rounded-md bg-[#18D2D5] p-4 text-white">
                    <p className="text-xs opacity-90">Predicción Final</p>
                    <p className="text-lg font-bold">
                      {result.final_prediction === 1 ? "Maligno" : "Benigno"}
                      <span className="ml-2 text-sm opacity-90">
                        ({(result.final_probability * 100).toFixed(2)}%)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Parameter-Based Analysis */}
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
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              {CLINICAL_FIELDS.map((field) => (
                <div key={field.id} className="col-span-1">
                  <label
                    className="block text-sm font-medium text-slate-600"
                    htmlFor={field.id}
                  >
                    {field.label}
                  </label>
                  <input
                    className="mt-1 block w-full rounded-md border border-[#E1E5EA] bg-white p-2 text-sm shadow-sm focus:border-[#18D2D5] focus:ring-[#18D2D5]"
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    type="number"
                    min="1"
                    max="10"
                    required
                  />
                </div>
              ))}

              <input
                type="file"
                name="file"
                accept=".jpg,.jpeg,.png"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                disabled={loading}
              />
            </form>
          </div>
        </div>

        {/* Submission Area */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <button
            type="submit"
            form="diagnosticForm"
            disabled={!selectedFile || loading}
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
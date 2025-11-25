"use client";

import React, { useState, useRef } from "react";
import DiagnosticResultModal from "@/components/ui/DiagnosticResultModal";

interface DiagnosticFormData {
  clumpThickness: number;
  uniformityCellSize: number;
  uniformityCellShape: number;
  marginalAdhesion: number;
  singleEpithelialCellSize: number;
  bareNuclei: number;
  blandChromatin: number;
  normalNucleoli: number;
  mitoses: number;
}

function DiagnosticarPage() {
  const [formData, setFormData] = useState<DiagnosticFormData>({
    clumpThickness: 5,
    uniformityCellSize: 5,
    uniformityCellShape: 5,
    marginalAdhesion: 5,
    singleEpithelialCellSize: 5,
    bareNuclei: 5,
    blandChromatin: 5,
    normalNucleoli: 5,
    mitoses: 5,
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (field: keyof DiagnosticFormData, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Math.max(1, Math.min(10, value)), // Asegurar que esté entre 1 y 10
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea una imagen
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Por favor, seleccione un archivo de imagen válido.");
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    // Validar que se haya seleccionado una imagen
    if (!selectedImage) {
      setError("Por favor, seleccione una imagen de biopsia.");
      return;
    }

    setIsLoading(true);

    try {
      // Crear FormData para enviar los datos
      const formDataToSend = new FormData();
      
      // Mapear los campos de camelCase a snake_case como requiere el endpoint
      formDataToSend.append("clump_thickness", formData.clumpThickness.toString());
      formDataToSend.append("uniformity_cell_size", formData.uniformityCellSize.toString());
      formDataToSend.append("uniformity_cell_shape", formData.uniformityCellShape.toString());
      formDataToSend.append("marginal_adhesion", formData.marginalAdhesion.toString());
      formDataToSend.append("single_epithelial_size", formData.singleEpithelialCellSize.toString());
      formDataToSend.append("bare_nuclei", formData.bareNuclei.toString());
      formDataToSend.append("bland_chromatin", formData.blandChromatin.toString());
      formDataToSend.append("normal_nucleoli", formData.normalNucleoli.toString());
      formDataToSend.append("mitoses", formData.mitoses.toString());
      formDataToSend.append("file", selectedImage);

      console.log("📤 Enviando datos al endpoint:", {
        clump_thickness: formData.clumpThickness,
        uniformity_cell_size: formData.uniformityCellSize,
        uniformity_cell_shape: formData.uniformityCellShape,
        marginal_adhesion: formData.marginalAdhesion,
        single_epithelial_size: formData.singleEpithelialCellSize,
        bare_nuclei: formData.bareNuclei,
        bland_chromatin: formData.blandChromatin,
        normal_nucleoli: formData.normalNucleoli,
        mitoses: formData.mitoses,
        file: selectedImage.name,
      });

      const response = await fetch("http://localhost:8000/predict/multimodal", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Error al procesar la solicitud" }));
        console.error("❌ Error en la respuesta del endpoint:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Respuesta del endpoint:", data);
      setResult(data);
      setIsModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error al enviar el formulario");
    } finally {
      setIsLoading(false);
    }
  };

  const formFields = [
    {
      key: "clumpThickness" as keyof DiagnosticFormData,
      label: "Clump Thickness",
      description: "Espesor del grupo celular",
    },
    {
      key: "uniformityCellSize" as keyof DiagnosticFormData,
      label: "Uniformity of Cell Size",
      description: "Uniformidad del tamaño celular",
    },
    {
      key: "uniformityCellShape" as keyof DiagnosticFormData,
      label: "Uniformity of Cell Shape",
      description: "Uniformidad de la forma celular",
    },
    {
      key: "marginalAdhesion" as keyof DiagnosticFormData,
      label: "Marginal Adhesion",
      description: "Adhesión marginal",
    },
    {
      key: "singleEpithelialCellSize" as keyof DiagnosticFormData,
      label: "Single Epithelial Cell Size",
      description: "Tamaño de célula epitelial única",
    },
    {
      key: "bareNuclei" as keyof DiagnosticFormData,
      label: "Bare Nuclei",
      description: "Núcleos desnudos",
    },
    {
      key: "blandChromatin" as keyof DiagnosticFormData,
      label: "Bland Chromatin",
      description: "Cromatina suave",
    },
    {
      key: "normalNucleoli" as keyof DiagnosticFormData,
      label: "Normal Nucleoli",
      description: "Nucléolos normales",
    },
    {
      key: "mitoses" as keyof DiagnosticFormData,
      label: "Mitoses",
      description: "Mitosis",
    },
  ];

  return (
    <main className="mt-20 grow bg-[#F4F7FA] min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Page Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-tighter text-[#333333] md:text-5xl">
            Diagnóstico Médico
          </h1>
          <p className="mt-3 text-slate-500 text-base">
            Ingrese los parámetros clínicos para realizar un análisis de diagnóstico preciso.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl border border-[#E1E5EA] bg-white p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {formFields.map((field, index) => (
              <div key={field.key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label
                      htmlFor={field.key}
                      className="block text-sm font-semibold text-[#333333]"
                    >
                      {index + 2}. {field.label}
                    </label>
                    <p className="mt-1 text-xs text-slate-500">
                      {field.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#18D2D5]">
                      {formData[field.key]}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">/ 10</span>
                  </div>
                </div>

                {/* Range Input */}
                <div className="relative">
                  <input
                    type="range"
                    id={field.key}
                    min="1"
                    max="10"
                    step="1"
                    value={formData[field.key]}
                    onChange={(e) =>
                      handleInputChange(field.key, parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-[#E1E5EA] rounded-lg appearance-none cursor-pointer accent-[#18D2D5]"
                    style={{
                      background: `linear-gradient(to right, #18D2D5 0%, #18D2D5 ${
                        ((formData[field.key] - 1) / 9) * 100
                      }%, #E1E5EA ${
                        ((formData[field.key] - 1) / 9) * 100
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
                    value={formData[field.key]}
                    onChange={(e) =>
                      handleInputChange(
                        field.key,
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="w-20 px-3 py-2 rounded-md border border-[#E1E5EA] bg-white text-sm text-center font-medium text-[#333333] focus:border-[#18D2D5] focus:ring-2 focus:ring-[#18D2D5]/20 focus:outline-none"
                  />
                  <span className="text-sm text-slate-500">Valor (1-10)</span>
                </div>

                {index < formFields.length - 1 && (
                  <div className="border-t border-[#E1E5EA] pt-6"></div>
                )}
              </div>
            ))}

            {/* Image Upload Section */}
            <div className="pt-6 border-t border-[#E1E5EA]">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-2">
                    11. Imagen de Biopsia Microscópica
                  </label>
                  <p className="text-xs text-slate-500 mb-4">
                    Adjunte una imagen de biopsia microscópica de tumores de mama
                    (benignos o malignos). Se recomienda imágenes con zoom óptico de
                    400x. Formatos compatibles: JPG, PNG.
                  </p>
                </div>

                {!imagePreview ? (
                  <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-[#E1E5EA] bg-[#F4F7FA] px-6 py-10 text-center transition-colors hover:border-[#18D2D5] hover:bg-[#F0F4FF]">
                    <div className="flex flex-col items-center gap-3">
                      <span className="material-symbols-outlined text-5xl text-[#18D2D5]">
                        upload_file
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#333333]">
                          Arrastre y suelte una imagen aquí
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          o haga clic para seleccionar un archivo
                        </p>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="biopsy-image-upload"
                    />
                    <label
                      htmlFor="biopsy-image-upload"
                      className="flex h-10 min-w-[120px] cursor-pointer items-center justify-center rounded-lg bg-white border border-[#E1E5EA] px-4 text-sm font-semibold text-[#333333] transition-colors hover:bg-[#18D2D5] hover:text-white hover:border-[#18D2D5]"
                    >
                      <span className="material-symbols-outlined text-lg mr-2">
                        folder_open
                      </span>
                      Seleccionar archivo
                    </label>
                  </div>
                ) : (
                  <div className="relative rounded-lg border border-[#E1E5EA] bg-[#F4F7FA] p-4">
                    <div className="flex items-start gap-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={imagePreview}
                          alt="Vista previa de biopsia"
                          className="h-32 w-32 rounded-md object-cover border border-[#E1E5EA]"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-semibold text-[#333333] truncate">
                            {selectedImage?.name}
                          </p>
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="flex-shrink-0 ml-2 p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Eliminar imagen"
                          >
                            <span className="material-symbols-outlined text-xl">
                              close
                            </span>
                          </button>
                        </div>
                        <p className="text-xs text-slate-500">
                          {selectedImage?.size ? (selectedImage.size / 1024 / 1024).toFixed(2) : "0.00"} MB
                        </p>
                        <label
                          htmlFor="biopsy-image-upload"
                          className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-[#18D2D5] hover:text-[#18D2D5]/80 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-base">
                            edit
                          </span>
                          Cambiar imagen
                        </label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="biopsy-image-upload"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="pt-6 border-t border-[#E1E5EA]">
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6 border-t border-[#E1E5EA]">
              <button
                type="submit"
                disabled={isLoading || !selectedImage}
                className="w-full flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-[#18D2D5] text-[#0A1931] font-bold text-base shadow-lg shadow-[#18D2D5]/30 transition-all hover:bg-[#18D2D5]/90 focus:outline-none focus:ring-4 focus:ring-[#18D2D5]/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined text-xl animate-spin">
                      sync
                    </span>
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xl">
                      science
                    </span>
                    <span>Ejecutar Diagnóstico</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Disclaimer */}
          <div className="mt-6 pt-6 border-t border-[#E1E5EA]">
            <p className="text-xs text-center text-slate-400 leading-relaxed">
              Al enviar, usted acepta que sus datos se procesarán de forma segura
              de acuerdo con nuestra Política de Privacidad. Esta herramienta
              proporciona un análisis preliminar y no sustituye el asesoramiento
              médico profesional.
            </p>
          </div>
        </div>
      </div>

      {/* Diagnostic Result Modal */}
      {result && (
        <DiagnosticResultModal
          result={result}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
}

export default DiagnosticarPage;


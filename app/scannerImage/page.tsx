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

function page() {
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
      [field]: Math.max(1, Math.min(10, value)),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

    if (!selectedImage) {
      setError("Por favor, seleccione una imagen médica.");
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      
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
  return (
    <main className="mt-20 grow bg-[#F4F7FA]">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* PageHeading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tighter text-[#333333] md:text-5xl">
            Análisis de Imagen
          </h1>
          <p className="mt-2 text-slate-500">
            Cargue imágenes médicas e ingrese datos del paciente para ejecutar un análisis de diagnóstico.
          </p>
        </div>
        {/* Main Content Area */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column: Image-Based Analysis */}
          <div className="flex flex-col gap-6 rounded-xl border border-[#E1E5EA] bg-white  p-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-[#333333]">
                Cargar Imagen Médica
              </h2>
              <p className="text-sm text-slate-500">
                Sube una imagen médica (p. ej., resonancia magnética, tomografía computarizada, radiografía). Formatos compatibles: JPG, PNG.
              </p>
            </div>
            {!imagePreview ? (
              <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#E1E5EA]  px-6 py-14 text-center">
                <div className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-4xl! text-[#2A64F5]">
                    upload_file
                  </span>
                  <p className="text-lg font-bold tracking-tight text-[#333333] ">
                    Análisis basado en imágenes
                  </p>
                  <p className="max-w-xs text-sm text-slate-500 ">
                    Arrastre y suelte una imagen aquí o haga clic para seleccionar
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="medical-image-upload"
                />
                <label
                  htmlFor="medical-image-upload"
                  className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#F4F7FA] px-4 text-sm font-bold text-[#333333]  hover:bg-slate-200"
                >
                  <span className="truncate">Browse Files</span>
                </label>
              </div>
            ) : (
              <div className="relative rounded-lg border border-[#E1E5EA] bg-[#F4F7FA] p-4">
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={imagePreview}
                      alt="Vista previa de imagen médica"
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
                      htmlFor="medical-image-upload"
                      className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-[#2A64F5] hover:text-[#2A64F5]/80 cursor-pointer"
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
                      id="medical-image-upload"
                    />
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
                Complete los parámetros clínicos para un diagnóstico completo.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Clump Thickness
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.clumpThickness}
                    onChange={(e) => handleInputChange("clumpThickness", parseInt(e.target.value) || 1)}
                    className="p-2 block w-full rounded-md border-[#E1E5EA] bg-white text-sm shadow-sm focus:border-[#2A64F5] focus:ring-[#2A64F5]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Uniformity Cell Size
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.uniformityCellSize}
                    onChange={(e) => handleInputChange("uniformityCellSize", parseInt(e.target.value) || 1)}
                    className="p-2 block w-full rounded-md border-[#E1E5EA] bg-white text-sm shadow-sm focus:border-[#2A64F5] focus:ring-[#2A64F5]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Uniformity Cell Shape
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.uniformityCellShape}
                    onChange={(e) => handleInputChange("uniformityCellShape", parseInt(e.target.value) || 1)}
                    className="p-2 block w-full rounded-md border-[#E1E5EA] bg-white text-sm shadow-sm focus:border-[#2A64F5] focus:ring-[#2A64F5]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Marginal Adhesion
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.marginalAdhesion}
                    onChange={(e) => handleInputChange("marginalAdhesion", parseInt(e.target.value) || 1)}
                    className="p-2 block w-full rounded-md border-[#E1E5EA] bg-white text-sm shadow-sm focus:border-[#2A64F5] focus:ring-[#2A64F5]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Single Epithelial Size
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.singleEpithelialCellSize}
                    onChange={(e) => handleInputChange("singleEpithelialCellSize", parseInt(e.target.value) || 1)}
                    className="p-2 block w-full rounded-md border-[#E1E5EA] bg-white text-sm shadow-sm focus:border-[#2A64F5] focus:ring-[#2A64F5]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Bare Nuclei
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.bareNuclei}
                    onChange={(e) => handleInputChange("bareNuclei", parseInt(e.target.value) || 1)}
                    className="p-2 block w-full rounded-md border-[#E1E5EA] bg-white text-sm shadow-sm focus:border-[#2A64F5] focus:ring-[#2A64F5]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Bland Chromatin
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.blandChromatin}
                    onChange={(e) => handleInputChange("blandChromatin", parseInt(e.target.value) || 1)}
                    className="p-2 block w-full rounded-md border-[#E1E5EA] bg-white text-sm shadow-sm focus:border-[#2A64F5] focus:ring-[#2A64F5]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Normal Nucleoli
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.normalNucleoli}
                    onChange={(e) => handleInputChange("normalNucleoli", parseInt(e.target.value) || 1)}
                    className="p-2 block w-full rounded-md border-[#E1E5EA] bg-white text-sm shadow-sm focus:border-[#2A64F5] focus:ring-[#2A64F5]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Mitoses
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.mitoses}
                    onChange={(e) => handleInputChange("mitoses", parseInt(e.target.value) || 1)}
                    className="p-2 block w-full rounded-md border-[#E1E5EA] bg-white text-sm shadow-sm focus:border-[#2A64F5] focus:ring-[#2A64F5]"
                  />
                </div>
              </div>
              {/* Error Message */}
              {error && (
                <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isLoading || !selectedImage}
                  className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#2A64F5] h-12 px-6 text-base font-bold text-white shadow-lg shadow-[#2A64F5]/30 transition-all hover:bg-[#2A64F5]/90 focus:outline-none focus:ring-4 focus:ring-[#2A64F5]/50 disabled:cursor-not-allowed disabled:opacity-50 "
                >
                  {isLoading ? (
                    <span className="truncate">Procesando...</span>
                  ) : (
                    <span className="truncate">Ejecutar diagnóstico</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Disclaimer */}
        <div className="mt-8 flex flex-col items-center justify-center">
          <p className="max-w-md text-center text-xs text-slate-400 ">
            Al enviar, usted acepta que sus datos se procesarán de forma segura de acuerdo con nuestra Política de Privacidad. 
            Esta herramienta proporciona un análisis preliminar y no sustituye el asesoramiento médico profesional.
          </p>
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

export default page;

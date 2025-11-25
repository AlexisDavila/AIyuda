"use client";

import { useRef, useState } from "react";
import { submitImage } from "@/actions/submit-image-action";
import { ClinicDataResposenseSchema, ClinicDataSchema } from "@/src/schema"; 

interface ClinicalField {
  id: string; // Se usa para htmlFor, id e input name
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

function page() {
  // Referencia al campo de archivo oculto
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado para mostrar el archivo seleccionado y la carga
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // 1. Maneja la acción de hacer clic en el botón
  const handleButtonClick = () => {
    // Activa el clic en el input de tipo 'file'
    fileInputRef.current?.click();
  };

  // 2. Maneja el evento de cambio del input de archivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setMessage(null); // Limpiar mensajes anteriores al seleccionar un archivo
  };

  // 3. Maneja el envío del formulario al Server Action
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Por favor, selecciona un archivo antes de analizar.");
      return;
    }

    // Validación básica de tipo de archivo y tamaño (opcional, pero recomendado)
    if (!["image/jpeg", "image/png"].includes(selectedFile.type)) {
      setMessage("Formato de archivo no válido. Solo JPG y PNG.");
      return;
    }
    // Preparar el objeto FormData para enviar el archivo y los datos clínicos
    const formData = new FormData(event.currentTarget);
    const formData2 = ClinicDataSchema.safeParse(event.currentTarget);
    const formData3 = ClinicDataSchema.safeParse(formData);
    debugger;
    
    setLoading(true);
    setMessage(null);

    // Llamar al Server Action con el FormData
    const result = await submitImage(formData);

    setLoading(false);

    if (result.success) {
      setMessage(
        `¡Análisis exitoso! Probabilidad detectada: ${JSON.stringify(
          result.success
        )}`
      );
    } else {
      setMessage(
        `Error en el análisis: ${
          result.errors || "Error desconocido del servidor."
        }`
      );
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

          <div className="flex flex-col gap-6 rounded-xl border border-[#E1E5EA] bg-white  p-6 shadow-sm">
            {/* EmptyState (Image Uploader) */}

            <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#E1E5EA]  px-6 py-14 text-center">
              <div className="flex flex-col items-center gap-2">
                {/* Icono de Archivo o Carga */}
                <span className="material-symbols-outlined text-4xl! text-[#18D2D5]">
                  {loading
                    ? "hourglass_empty"
                    : selectedFile
                    ? "check_circle"
                    : "upload_file"}
                </span>

                <p className="text-lg font-bold tracking-tight text-[#333333] ">
                  {selectedFile
                    ? `Archivo: ${selectedFile.name}`
                    : "Análisis basado en imágenes"}
                </p>
                <p className="max-w-xs text-sm text-slate-500 ">
                  {selectedFile
                    ? `Tamaño: ${(selectedFile.size / 1024 / 1024).toFixed(
                        2
                      )} MB. Listo para analizar.`
                    : `Sube o arrastra y suelta una imagen médica (p. ej., resonancia magnética, tomografía computarizada, radiografía). Formatos de archivo compatibles: JPG, PNG.`}
                </p>
              </div>

              <button
                type="button" // Usar type="button" para evitar el submit al hacer click
                onClick={handleButtonClick}
                className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#F4F7FA] px-4 text-sm font-bold text-[#333333] hover:bg-slate-200 disabled:opacity-50"
                disabled={loading}
              >
                <span className="truncate">Browse Files</span>
              </button>

              {message && (
                <p className="mt-4 text-sm text-gray-800">{message}</p>
              )}
            </div>
          </div>
          {/* Right Column: Parameter-Based Analysis */}
          <div className="flex flex-col gap-6 rounded-xl border border-[#E1E5EA] bg-white p-6 shadow-sm">
            {/* SectionHeader and BodyText */}
            <div>
              <h2 className="text-lg font-bold tracking-tight text-[#333333]">
                Introducir parámetros de diagnóstico
              </h2>
              <p className="text-sm text-slate-500">
                Complete los datos clínicos para un diagnóstico completo.
              </p>
            </div>
            {/* Form */}
            <form id="diagnosticForm" onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {CLINICAL_FIELDS.map((field) => (
                <div key={field.id} className="col-span-1">
                  <label
                    className="block text-sm font-medium text-slate-600 "
                    htmlFor={field.id}
                  >
                    {field.label}
                  </label>
                  <input
                    className="p-2 mt-1 block w-full rounded-md border-[#E1E5EA] bg-white text-sm shadow-sm focus:border-[#18D2D5] focus:ring-[#18D2D5]"
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    type="number"
                    min="1"
                    max="10"
                  />
                </div>
              ))}
              {/* Campo de Archivo Oculto (Input Real) */}

              <input
                type="file"
                name="file" // ¡CRUCIAL! Debe coincidir con 'file' en tu Server Action
                accept=".jpg,.jpeg,.png"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden" // Ocultamos el input feo del navegador
                disabled={loading}
              />
            </form>
          </div>
        </div>
        {/* Submission Area */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          {/* Botón de Submit (Envía el formulario al Server Action) 
          <button className="flex w-full max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#18D2D5] h-12 px-6 text-base font-bold text-white shadow-lg shadow-[#18D2D5]/30 transition-all hover:bg-[#18D2D5]/90 focus:outline-none focus:ring-4 focus:ring-[#18D2D5]/50 disabled:cursor-not-allowed disabled:opacity-50 ">
            <span className="truncate">Ejecutar diagnóstico</span>
          </button>
          */}
          <button
            type="submit"
            form="diagnosticForm"
            disabled={!selectedFile || loading}
            className="flex w-full max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#18D2D5] h-12 px-6 text-base font-bold text-white shadow-lg shadow-[#18D2D5]/30 transition-all hover:bg-[#18D2D5]/90 focus:outline-none focus:ring-4 focus:ring-[#18D2D5]/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analizando..." : "Ejecutar diagnóstico"}
          </button>
          <p className="max-w-md text-center text-xs text-slate-400 ">
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

export default page;

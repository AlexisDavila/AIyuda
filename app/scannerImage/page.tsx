import React from "react";

function page() {
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
            {/* EmptyState (Image Uploader) */}
            <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#E1E5EA]  px-6 py-14 text-center">
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-4xl! text-[#2A64F5]">
                  upload_file
                </span>
                <p className="text-lg font-bold tracking-tight text-[#333333] ">
                  Análisis basado en imágenes
                </p>
                <p className="max-w-xs text-sm text-slate-500 ">
                  Sube o arrastra y suelta una imagen médica 
                  (p. ej., resonancia magnética, tomografía computarizada, radiografía). Formatos de archivo compatibles: JPG, PNG.
                </p>
              </div>
              <button className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#F4F7FA] px-4 text-sm font-bold text-[#333333]  hover:bg-slate-200">
                <span className="truncate">Browse Files</span>
              </button>
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
                Complete los datos del paciente y clínicos para un diagnóstico completo.
              </p>
            </div>
            {/* Form */}
            <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              
              <div>
                <label
                  className="block text-sm font-medium text-slate-600 "
                  htmlFor="patient-age"
                >
                  Patient Age
                </label>
                <input
                  className="p-2 mt-1 block w-full rounded-md border-[#E1E5EA] bg-white text-sm shadow-sm focus:border-[#2A64F5] focus:ring-[#2A64F5]"
                  id="patient-age"
                  placeholder="e.g., 58"
                  type="number"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-slate-600 "
                  htmlFor="cancer-type"
                >
                  Tipo Cancer
                </label>
                <select
                  className="p-2 mt-1 block w-full rounded-md border-[#E1E5EA]  bg-white  text-sm shadow-sm focus:border-[#2A64F5] focus:ring-[#2A64F5]"
                  id="cancer-type"
                >
                  <option>Select type...</option>
                  <option>Breast Cancer</option>
                  <option>Lung Cancer</option>
                  <option>Prostate Cancer</option>
                  <option>Skin Cancer (Melanoma)</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  className="block text-sm font-medium text-slate-600 "
                  htmlFor="biomarker-levels"
                >
                  Biomarker Levels (ng/mL)
                </label>
                <input
                  className="p-2 mt-1 block w-full rounded-md border-[#E1E5EA]  bg-white  text-sm shadow-sm focus:border-[#2A64F5] focus:ring-[#2A64F5]"
                  id="biomarker-levels"
                  placeholder="e.g., 4.5"
                  type="text"
                />
              </div>
            </form>
          </div>
        </div>
        {/* Submission Area */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <button className="flex w-full max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#2A64F5] h-12 px-6 text-base font-bold text-white shadow-lg shadow-[#2A64F5]/30 transition-all hover:bg-[#2A64F5]/90 focus:outline-none focus:ring-4 focus:ring-[#2A64F5]/50 disabled:cursor-not-allowed disabled:opacity-50 ">
            <span className="truncate">Ejecutar diagnóstico</span>
          </button>
          <p className="max-w-md text-center text-xs text-slate-400 ">
            Al enviar, usted acepta que sus datos se procesarán de forma segura de acuerdo con nuestra Política de Privacidad. 
            Esta herramienta proporciona un análisis preliminar y no sustituye el asesoramiento médico profesional.
          </p>
        </div>
      </div>
    </main>
  );
}

export default page;

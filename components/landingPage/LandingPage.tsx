import React from "react";
import Link from "next/link";
//import {Summa} from '.fonts';


function LandingPage() {
  return (
    <main className="my-24">
      {/** Hero */}
      <section className=" hero relative w-full py-20 lg:py-32 flex items-center justify-center bg-cover bg-center">
        <div className="w-full max-w-6xl px-4 lg:px-8 text-center">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter max-w-3xl">
              Tu Primera Línea de Defensa. Evaluación de Riesgo de Cáncer con Precisión de IA.
            </h1>
            <h2 className="text-slate-300 text-lg md:text-xl font-normal leading-normal max-w-2xl">
              Aprovechar la inteligencia artificial avanzada para analizar
              exploraciones médicas para una detección rápida y precisa del
              cáncer.
            </h2>
            <Link href="/diagnosticar" className="mt-4 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-[#18D2D5] text-[#0A1931] text-base font-bold tracking-wide shadow-xl shadow-secondary/20 hover:bg-opacity-90 transition-all transform hover:scale-105">
              <span className="truncate">Analizar ahora</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[#F4F7F9]">
        <div className="w-full max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Un proceso simple y seguro
            </h2>
            <p className="mt-3 text-lg text-[#64748b] dark:text-[#94a3b8] max-w-2xl mx-auto">
              Nuestro proceso optimizado garantiza que obtenga sus resultados de forma rápida y segura.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-4 rounded-xl border-0 border-slate-200 dark:border-slate-800 bg-white dark:bg-primary/50 p-8 shadow-sm">
              <div className="flex items-center justify-center size-14 rounded-full bg-[#18D2D5]/20 text-[#18D2D5]">
                <span className="material-symbols-outlined">upload_file</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">Sube</h3>
                <p className="text-[#64748b] dark:text-[#94a3b8] text-sm leading-relaxed">
                  Suba su escaneo médico de forma segura desde cualquier dispositivo. 
                  Nuestra plataforma no almacena las imagenes, garantizando su privacidad.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4 rounded-xl border-0 border-slate-200 dark:border-slate-800 bg-white dark:bg-primary/50 p-8 shadow-sm">
              <div className="flex items-center justify-center size-14 rounded-full bg-[#18D2D5]/20 text-[#18D2D5]">
                <span className="material-symbols-outlined">
                  model_training
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">Analiza</h3>
                <p className="text-[#64748b] dark:text-[#94a3b8] text-sm leading-relaxed">
                  Nuestra IA avanzada, entrenada en miles de escaneos, 
                  analiza los datos con precisión y velocidad.

                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4 rounded-xl border-0 border-slate-200 dark:border-slate-800 bg-white dark:bg-primary/50 p-8 shadow-sm">
              <div className="flex items-center justify-center size-14 rounded-full bg-[#18D2D5]/20 text-[#18D2D5]">
                <span className="material-symbols-outlined">summarize</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">Reporte</h3>
                <p className="text-[#64748b] dark:text-[#94a3b8] text-sm leading-relaxed">
                  Reciba un informe fácil de entender 
                  con resultados claros y conocimientos prácticos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Technology Spotlight*/}
      <section className="py-20 lg:py-28 bg-white dark:bg-primary/30">
        <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-4">
            <span className="text-[#18D2D5] font-bold text-sm">
              Nuestra Tecnología
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Precisión en la que puede confiar
            </h2>
            <p className="text-lg text-[#64748b] dark:text-[#94a3b8]">
              Nuestro modelo de Machine Learning se basa en los últimos avances en aprendizaje profundo. 
              Detecta patrones invisibles para el ojo humano, lo que resulta en una mayor precisión y una detección más temprana. 
              Nos comprometemos a proporcionar tecnología que empodera a los pacientes y apoya a los profesionales clínicos.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-lg bg-bg-[#64748b] dark:bg-primary/50">
                <p className="text-3xl font-bold text-[#18D2D5]">99.7%</p>
                <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
                  Tasa de precisión
                </p>
              </div>
              <div className="p-4 rounded-lg bg-bg-[#64748b] dark:bg-primary/50">
                <p className="text-3xl font-bold text-[#18D2D5]">&lt; 2 Min</p>
                <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
                  Tiempo promedio de análisis
                </p>
              </div>
            </div>
          </div>
          <div>
            <img
              alt="Abstract 3D rendering of AI neural network connections in blue and teal"
              className="rounded-xl shadow-2xl object-cover w-full h-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5aLHTMw_x6ERdVqpgPM6vCNZ_rHgiiZ6HQDHJBLXegiY9pIVmMUIXogJl6bdlxYMojwWfLvs7z7E_SOfLDMZooxmcLGZrSf9smiEd4eivlUxzVKCX3TZekgR_hB6pWexfXRC7tMFAyJisvvStCyJ1vb2q9hnX0mmKQFVjXfDFQYZw-oNvEF0ZA97K86qUotd-XDbv3YtZm2REDzazQOJDXHfOkBJzM3dUv2TZbKELZPxiuPXBghjGXrbmqY5kipgIfh10xCpz8p4"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;

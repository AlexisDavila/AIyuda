"use server"

import { ErrorResponseSchema, ClinicDataSchema, SuccessResponseSchema, ClinicDataResposenseSchema } from "@/src/schema"

export async function submitImage(formData:unknown) {

   try { 
      // Enviar directamente a la API de FastAPI
      const response = await fetch("http://127.0.0.1:8000/predict/image", {
        method: "POST",
        body: formData as BodyInit,
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data
      
    } catch (error) {
      console.error("Error al analizar:", error);
    } 
   
}
export async function submitText(formData: unknown) {

  try {
    const response = await fetch("http://127.0.0.1:8000/predict/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),  // ← envío RAW JSON
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error al analizar:", error);
  }
}

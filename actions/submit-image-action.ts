"use server"

import { ErrorResponseSchema, ClinicDataSchema, SuccessResponseSchema } from "@/src/schema"

export async function submitImage(data:unknown) {
   console.log(data)
   const order = ClinicDataSchema.parse(data)
   const url = `${process.env.NEXT_PUBLIC_API_URL}/predict/multimodal`
   const req = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({...order})
   })
   const json = await req.json()
   
   if(!req.ok) {
      const errors = ErrorResponseSchema.parse(json)
      return { 
         errors : errors.message.map(issue => issue),
         success: ''
      }
   }
   const success = SuccessResponseSchema.parse(json)
   console.debug(success)
   return {
      errors: [],
      success: success.message
   }
}
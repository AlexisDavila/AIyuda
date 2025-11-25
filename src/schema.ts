import z, { number } from "zod";
import { TypeOf } from "zod/v3";



export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    slug:z.string(),
    price: z.coerce.number(),
    inventory: z.number(),
    isFeatured: z.boolean()
})

export interface Categories {
    id: number
    name: string
    slug: string
}[]
export const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string()
})

export const CategoriesResponseSchema = z.array(CategorySchema)
export const CategoryWithProductsResponseSchema = CategorySchema.extend({
    products: z.array(ProductSchema)
});

export const ProductResponseSchema = z.object({
  ProductSchema
})
/** Product Image */
export interface ProductImage {
  id: number
  url : string
  altText?: string
}

export const ProductImageSchema = z.object({
  id: z.number(),
  url: z.string(),
  altText: z.string()
})

export const ProductImageResponseSchema = z.object({
  data: z.array(ProductImageSchema),
});

/** Shopping Cart */
const ShoppingCartContentsSchema = ProductSchema.pick({
    name: true,
    image: true,
    price: true,
    inventory: true
}).extend({
    productId: z.number(),
    quantity: z.number()
})

export const ShoppingCartSchema = z.array(ShoppingCartContentsSchema)

export const CouponResponseSchema = z.object({
    name: z.string().default(''),
    message: z.string(),
    percentage: z.coerce.number().min(0).max(100).default(0)
})

export type Product = z.infer<typeof ProductSchema>
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>
export type CarItem = z.infer<typeof ShoppingCartContentsSchema>
export type Coupon = z.infer<typeof CouponResponseSchema>


/** Product for HomePage */
export const ProductHomeSchema = z.object({
    title: z.string(),
    imageUrl: z.string()
})

export type ProductHome = z.infer<typeof ProductHomeSchema>

/** Product for Detail */
export const ImageSchema = z.object({
  id: z.number(),
  url: z.string(),
  altText: z.string().nullable(),
  sortOrder: z.number(),
  isPrimary: z.boolean(),
})

export const ImageSchemaResponse = z.array(ImageSchema)

export const TagSchema = z.object({
  name: z.string(),
  slug: z.string(),
  color: z.string().nullable(),
  isActive: z.boolean(),
})


export const TagSchemaResponse = z.array(TagSchema)

export const GalleryImageSchema = z.object({
  id: z.number(),
  slug: z.string(),
  descripcion: z.string().nullable(),
  image: z.string().nullable(),
  isActive: z.boolean(),
})

export const GalleryImageSchemaResponse = z.array(GalleryImageSchema)

export const ProductDetailSchema = ProductSchema.extend({
  images: z.array(ImageSchema),
  tags: z.array(TagSchema),
  gallery: z.array(GalleryImageSchema)
})

export type ProductDetail = z.infer<typeof ProductDetailSchema>


export const ClinicDataSchema = z.object({
   clump_thickness: z.number(),
   uniformity_cell_size: z.number(),
   uniformity_cell_shape: z.number(),
   marginal_adhesion: z.number(),
   single_epithelial_size: z.number(),
   bare_nuclei: z.number(),
   bland_chromatin: z.number(),
   normal_nucleoli: z.number(),
   mitoses: z.number(),
   file: z.instanceof(File, { 
    message: "Se requiere un archivo de imagen válido." 
  }),
})

export const ClinicDataResposenseSchema = z.object({
   text_prediction: z.number(),
   text_probability: z.number(),
   image_prediction: z.number(),
   image_probability: z.number(),
   final_prediction: z.number(),
   final_probability: z.number()
})

/** Order for car */

const OrderContentSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  price: z.number()
})
export const OrderSchema = z.object({
  total: z.number(),
  coupon: z.string(),
  contents: z.array(OrderContentSchema).min(1, {message: 'El Carrito no puede ir vacio'})
})

/** Success / Error Response */
export const SuccessResponseSchema = z.object({
  message: z.string()
})
export const ErrorResponseSchema = z.object({
  message: z.array(z.string()),
  error: z.string(),
  statusCode: z.number()
})
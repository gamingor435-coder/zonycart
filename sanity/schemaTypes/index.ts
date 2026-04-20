import { type SchemaTypeDefinition } from 'sanity'
import product from './product' // Aapka purana product schema
import review from './review'   // Aapka purana review schema
import order from './order'     // Ye naya order schema

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, review, order], // Order ko yahan shamil karein
}
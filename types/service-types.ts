export interface ServiceCategory {
  id: string
  name: string
}

export interface Service {
  id: string
  title: string
  description: string
  price: number
  duration: number
  image: string
  categoryId: string
  featured: boolean
  benefits: string[]
}

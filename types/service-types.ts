export interface ServiceCategory {
  id: string
  name: string
  description?: string
  image?: string
}

export interface Service {
  id: string
  title: string
  description: string
  price: number
  duration: number
  image: string
  category: ServiceCategory
  featured: boolean
  benefits: string[]
}

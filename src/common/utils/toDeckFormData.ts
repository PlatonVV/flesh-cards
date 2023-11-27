import { CreateDeckArgs } from '@/services/decks/decks.types.ts'

export const toDeckFormData = (body: CreateDeckArgs) => {
  const formData = new FormData()

  formData.append('name', body.name)
  formData.append('isPrivate', body.isPrivate.toString())
  if (body.cover) formData.append('cover', body.cover)
  else formData.append('cover', '')

  return formData
}

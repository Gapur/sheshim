export interface Comment {
  id: string
  votes: number
  text: string
  createdAt: string
  createdBy: {
    id: string
    name: string
  }
}

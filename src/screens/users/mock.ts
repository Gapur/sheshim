export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  password?: string
  city?: string
  country?: string
  avatar?: string
  reputation?: number
  position?: string
}

export const data: User[] = [
  {
    id: 1,
    firstName: 'Gapur',
    lastName: 'Kassym',
    email: 'test@gmail.com',
    city: 'Karagandy',
    country: 'Kazakhstan',
    avatar: 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
    reputation: 200,
    position: 'Software Developer',
  },
  {
    id: 2,
    firstName: 'Quantin',
    lastName: 'Gordon',
    email: 'test@gmail.com',
    city: 'Telavle',
    country: 'Israel',
    avatar: 'https://react.semantic-ui.com/images/avatar/large/christian.jpg',
    reputation: 4520,
    position: 'Software Developer',
  },
  {
    id: 3,
    firstName: 'John',
    lastName: 'Lucas',
    email: 'test@gmail.com',
    city: 'New York',
    country: 'USA',
    avatar: 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg',
    reputation: 21421,
    position: 'Software Developer',
  },
  {
    id: 4,
    firstName: 'Sarah',
    lastName: 'Donald',
    email: 'test@gmail.com',
    city: 'Los Angeles',
    country: 'USA',
    avatar: 'https://react.semantic-ui.com/images/avatar/large/matt.jpg',
    reputation: 20,
    position: 'Software Developer',
  },
  {
    id: 5,
    firstName: 'Aidana',
    lastName: 'Daulenova',
    email: 'test@gmail.com',
    city: 'Kyzylorda',
    country: 'Kazakhstan',
    avatar: 'https://react.semantic-ui.com/images/avatar/large/tom.jpg',
    reputation: 300,
    position: 'Software Developer',
  },
]

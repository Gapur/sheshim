import { Node as SlateNode } from 'slate'

export interface Question {
  id: number
  votes: number
  answersCount: number
  views: number
  title: string
  body: SlateNode[]
  tags: string[]
  createdAt: string
  createdBy: string
  answers: Answer[]
  comments: Comment[]
}

export interface Answer {
  id: number
  votes: number
  body: SlateNode[]
  createdAt: string
  createdBy: string
  comments: Comment[]
}

export interface Comment {
  id: number
  votes: number
  text: string
  createdAt: string
  createdBy: string
}

export const data: Question[] = [
  {
    id: 1,
    votes: 0,
    answersCount: 8,
    views: 9,
    title: 'React live server is not displaying anything just showing the tab keep on loading',
    body: [
      {
        type: 'paragraph',
        children: [
          { text: 'This is editable ' },
          { text: 'rich', bold: true },
          { text: ' text, ' },
          { text: 'much', italic: true },
          { text: ' better than a ' },
          { text: '<textarea>', code: true },
          { text: '!' },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            text: "Since it's rich text, you can do things like turn a selection of text ",
          },
          { text: 'bold', bold: true },
          {
            text: ', or add a semantically rendered block quote in the middle of the page, like this:',
          },
        ],
      },
      {
        type: 'block-quote',
        children: [{ text: 'A wise quote.' }],
      },
      {
        type: 'paragraph',
        children: [{ text: 'Try it out for yourself!' }],
      },
    ],
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: 'Gapur Kassym',
    comments: [],
    answers: [
      {
        id: 1,
        votes: 1,
        body: [{ type: 'paragraph', children: [{ text: 'If you are using React Router, you have to use this' }] }],
        createdAt: 'asked 3 hours ago',
        createdBy: 'Gapur Kassym',
        comments: [
          {
            id: 1,
            votes: 1,
            text: 'This has been very useful for my research. Thanks as well!',
            createdAt: 'Yesterday at 12:30AM',
            createdBy: 'Elliot Fu',
          },
          {
            id: 2,
            votes: 1,
            text: 'Dude, this is awesome. Thanks so much',
            createdBy: 'Joe Henderson',
            createdAt: '2 days ago',
          },
        ],
      },
      {
        id: 2,
        votes: 6,
        body: [{ type: 'paragraph', children: [{ text: 'If you are using React Router, you have to use this' }] }],
        createdAt: 'asked 3 hours ago',
        createdBy: 'Gapur Kassym',
        comments: [],
      },
    ],
  },
  {
    id: 2,
    votes: 0,
    answersCount: 8,
    views: 9,
    title: 'React live server is not displaying anything just showing the tab keep on loading',
    body: [],
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: 'Gapur Kassym',
    comments: [],
    answers: [
      {
        id: 1,
        votes: 1,
        body: [{ type: 'paragraph', children: [{ text: 'If you are using React Router, you have to use this' }] }],
        createdAt: 'asked 3 hours ago',
        createdBy: 'Gapur Kassym',
        comments: [],
      },
      {
        id: 2,
        votes: 6,
        body: [{ type: 'paragraph', children: [{ text: 'If you are using React Router, you have to use this' }] }],
        createdAt: 'asked 3 hours ago',
        createdBy: 'Gapur Kassym',
        comments: [],
      },
    ],
  },
  {
    id: 3,
    votes: 0,
    answersCount: 8,
    views: 9,
    title: 'React live server is not displaying anything just showing the tab keep on loading',
    body: [],
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: 'Gapur Kassym',
    comments: [],
    answers: [
      {
        id: 1,
        votes: 1,
        body: [{ type: 'paragraph', children: [{ text: 'If you are using React Router, you have to use this' }] }],
        createdAt: 'asked 3 hours ago',
        createdBy: 'Gapur Kassym',
        comments: [],
      },
      {
        id: 2,
        votes: 6,
        body: [{ type: 'paragraph', children: [{ text: 'If you are using React Router, you have to use this' }] }],
        createdAt: 'asked 3 hours ago',
        createdBy: 'Gapur Kassym',
        comments: [],
      },
    ],
  },
  {
    id: 4,
    votes: 0,
    answersCount: 8,
    views: 9,
    title: 'React live server is not displaying anything just showing the tab keep on loading',
    body: [],
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: 'Gapur Kassym',
    answers: [],
    comments: [],
  },
  {
    id: 5,
    votes: 0,
    answersCount: 8,
    views: 9,
    title: 'React live server is not displaying anything just showing the tab keep on loading',
    body: [],
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: 'Gapur Kassym',
    comments: [],
    answers: [
      {
        id: 1,
        votes: 1,
        body: [{ type: 'paragraph', children: [{ text: 'If you are using React Router, you have to use this' }] }],
        createdAt: 'asked 3 hours ago',
        createdBy: 'Gapur Kassym',
        comments: [],
      },
      {
        id: 2,
        votes: 6,
        body: [{ type: 'paragraph', children: [{ text: 'If you are using React Router, you have to use this' }] }],
        createdAt: 'asked 3 hours ago',
        createdBy: 'Gapur Kassym',
        comments: [],
      },
    ],
  },
  {
    id: 6,
    votes: 0,
    answersCount: 8,
    views: 9,
    title: 'React live server is not displaying anything just showing the tab keep on loading',
    body: [],
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: 'Gapur Kassym',
    answers: [],
    comments: [],
  },
  {
    id: 7,
    votes: 0,
    answersCount: 8,
    views: 9,
    title: 'React live server is not displaying anything just showing the tab keep on loading',
    body: [],
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: 'Gapur Kassym',
    comments: [],
    answers: [
      {
        id: 1,
        votes: 1,
        body: [{ type: 'paragraph', children: [{ text: 'If you are using React Router, you have to use this' }] }],
        createdAt: 'asked 3 hours ago',
        createdBy: 'Gapur Kassym',
        comments: [],
      },
      {
        id: 2,
        votes: 6,
        body: [{ type: 'paragraph', children: [{ text: 'If you are using React Router, you have to use this' }] }],
        createdAt: 'asked 3 hours ago',
        createdBy: 'Gapur Kassym',
        comments: [],
      },
    ],
  },
]

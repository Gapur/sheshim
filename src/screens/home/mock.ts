import { Question } from 'models'

export const data: Question[] = [
  {
    id: '1',
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
            text:
              ', or add a semantically rendered block quote in the middle of the page, like this:',
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
    createdBy: {
      id: '1',
      name: 'Gapur Kassym',
    },
    comments: [],
    answers: [
      {
        id: '1',
        votes: 1,
        body: [
          {
            type: 'paragraph',
            children: [{ text: 'If you are using React Router, you have to use this' }],
          },
        ],
        createdAt: 'asked 3 hours ago',
        createdBy: {
          id: '1',
          name: 'Gapur Kassym',
        },
        comments: [
          {
            id: '1',
            votes: 1,
            text: 'This has been very useful for my research. Thanks as well!',
            createdAt: 'Yesterday at 12:30AM',
            createdBy: {
              id: '2',
              name: 'Elliot Fu',
            },
          },
          {
            id: '2',
            votes: 1,
            text: 'Dude, this is awesome. Thanks so much',
            createdBy: {
              id: '3',
              name: 'Joe Henderson',
            },
            createdAt: '2 days ago',
          },
        ],
      },
      {
        id: '2',
        votes: 6,
        body: [
          {
            type: 'paragraph',
            children: [{ text: 'If you are using React Router, you have to use this' }],
          },
        ],
        createdAt: 'asked 3 hours ago',
        createdBy: {
          id: '1',
          name: 'Gapur Kassym',
        },
        comments: [],
      },
    ],
  },
  {
    id: '2',
    votes: 0,
    answersCount: 8,
    views: 9,
    title: 'React live server is not displaying anything just showing the tab keep on loading',
    body: [],
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: {
      id: '1',
      name: 'Gapur Kassym',
    },
    comments: [],
    answers: [
      {
        id: '1',
        votes: 1,
        body: [
          {
            type: 'paragraph',
            children: [{ text: 'If you are using React Router, you have to use this' }],
          },
        ],
        createdAt: 'asked 3 hours ago',
        createdBy: {
          id: '1',
          name: 'Gapur Kassym',
        },
        comments: [],
      },
      {
        id: '2',
        votes: 6,
        body: [
          {
            type: 'paragraph',
            children: [{ text: 'If you are using React Router, you have to use this' }],
          },
        ],
        createdAt: 'asked 3 hours ago',
        createdBy: {
          id: '1',
          name: 'Gapur Kassym',
        },
        comments: [],
      },
    ],
  },
  {
    id: '3',
    votes: 0,
    answersCount: 8,
    views: 9,
    title: 'React live server is not displaying anything just showing the tab keep on loading',
    body: [],
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: {
      id: '1',
      name: 'Gapur Kassym',
    },
    comments: [],
    answers: [
      {
        id: '1',
        votes: 1,
        body: [
          {
            type: 'paragraph',
            children: [{ text: 'If you are using React Router, you have to use this' }],
          },
        ],
        createdAt: 'asked 3 hours ago',
        createdBy: {
          id: '1',
          name: 'Gapur Kassym',
        },
        comments: [],
      },
      {
        id: '2',
        votes: 6,
        body: [
          {
            type: 'paragraph',
            children: [{ text: 'If you are using React Router, you have to use this' }],
          },
        ],
        createdAt: 'asked 3 hours ago',
        createdBy: {
          id: '1',
          name: 'Gapur Kassym',
        },
        comments: [],
      },
    ],
  },
  {
    id: '4',
    votes: 0,
    answersCount: 8,
    views: 9,
    title: 'React live server is not displaying anything just showing the tab keep on loading',
    body: [],
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: {
      id: '1',
      name: 'Gapur Kassym',
    },
    answers: [],
    comments: [],
  },
  {
    id: '5',
    votes: 0,
    answersCount: 8,
    views: 9,
    title: 'React live server is not displaying anything just showing the tab keep on loading',
    body: [],
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: {
      id: '1',
      name: 'Gapur Kassym',
    },
    comments: [],
    answers: [
      {
        id: '1',
        votes: 1,
        body: [
          {
            type: 'paragraph',
            children: [{ text: 'If you are using React Router, you have to use this' }],
          },
        ],
        createdAt: 'asked 3 hours ago',
        createdBy: {
          id: '1',
          name: 'Gapur Kassym',
        },
        comments: [],
      },
      {
        id: '2',
        votes: 6,
        body: [
          {
            type: 'paragraph',
            children: [{ text: 'If you are using React Router, you have to use this' }],
          },
        ],
        createdAt: 'asked 3 hours ago',
        createdBy: {
          id: '1',
          name: 'Gapur Kassym',
        },
        comments: [],
      },
    ],
  },
  {
    id: '6',
    votes: 0,
    answersCount: 8,
    views: 9,
    title: 'React live server is not displaying anything just showing the tab keep on loading',
    body: [],
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: {
      id: '1',
      name: 'Gapur Kassym',
    },
    answers: [],
    comments: [],
  },
  {
    id: '7',
    votes: 0,
    answersCount: 8,
    views: 9,
    title: 'React live server is not displaying anything just showing the tab keep on loading',
    body: [],
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: {
      id: '1',
      name: 'Gapur Kassym',
    },
    comments: [],
    answers: [
      {
        id: '1',
        votes: 1,
        body: [
          {
            type: 'paragraph',
            children: [{ text: 'If you are using React Router, you have to use this' }],
          },
        ],
        createdAt: 'asked 3 hours ago',
        createdBy: {
          id: '1',
          name: 'Gapur Kassym',
        },
        comments: [],
      },
      {
        id: '2',
        votes: 6,
        body: [
          {
            type: 'paragraph',
            children: [{ text: 'If you are using React Router, you have to use this' }],
          },
        ],
        createdAt: 'asked 3 hours ago',
        createdBy: {
          id: '1',
          name: 'Gapur Kassym',
        },
        comments: [],
      },
    ],
  },
]

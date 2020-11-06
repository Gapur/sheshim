export interface Question {
  id: number
  votes: number
  answersCount: number
  views: number
  title: string
  body: string
  tags: string[]
  createdAt: string
  createdBy: string
  answers: Answer[]
  comments: Comment[]
}

export interface Answer {
  id: number
  votes: number
  body: string
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
    body:
      "I accidentally committed the wrong files to Git, but I haven't pushed the commit to the server yet. How can I undo those commits from the local repository?",
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: 'Gapur Kassym',
    comments: [],
    answers: [
      {
        id: 1,
        votes: 1,
        body: 'If you are using React Router, you have to use this',
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
        body: 'If you are using React Router, you have to use this',
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
    body:
      'we could do something like this <div id="tags-container"> {tags.map(t => <Link className="tags" activeStyle={{ color: \'red\' }} to={t.path}>{t.title}</Link>)}</div> I wanna know how can I do same thing in v4?',
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: 'Gapur Kassym',
    comments: [],
    answers: [
      {
        id: 1,
        votes: 1,
        body: 'If you are using React Router, you have to use this',
        createdAt: 'asked 3 hours ago',
        createdBy: 'Gapur Kassym',
        comments: [],
      },
      {
        id: 2,
        votes: 6,
        body: 'If you are using React Router, you have to use this',
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
    body:
      "I accidentally committed the wrong files to Git, but I haven't pushed the commit to the server yet. How can I undo those commits from the local repository?",
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: 'Gapur Kassym',
    comments: [],
    answers: [
      {
        id: 1,
        votes: 1,
        body: 'If you are using React Router, you have to use this',
        createdAt: 'asked 3 hours ago',
        createdBy: 'Gapur Kassym',
        comments: [],
      },
      {
        id: 2,
        votes: 6,
        body: 'If you are using React Router, you have to use this',
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
    body:
      "I accidentally committed the wrong files to Git, but I haven't pushed the commit to the server yet. How can I undo those commits from the local repository?",
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
    body:
      "I accidentally committed the wrong files to Git, but I haven't pushed the commit to the server yet. How can I undo those commits from the local repository?",
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: 'Gapur Kassym',
    comments: [],
    answers: [
      {
        id: 1,
        votes: 1,
        body: 'If you are using React Router, you have to use this',
        createdAt: 'asked 3 hours ago',
        createdBy: 'Gapur Kassym',
        comments: [],
      },
      {
        id: 2,
        votes: 6,
        body: 'If you are using React Router, you have to use this',
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
    body:
      "I accidentally committed the wrong files to Git, but I haven't pushed the commit to the server yet. How can I undo those commits from the local repository?",
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
    body:
      "I accidentally committed the wrong files to Git, but I haven't pushed the commit to the server yet. How can I undo those commits from the local repository?",
    tags: ['reactjs', 'create-react-app'],
    createdAt: 'asked 3 hours ago',
    createdBy: 'Gapur Kassym',
    comments: [],
    answers: [
      {
        id: 1,
        votes: 1,
        body: 'If you are using React Router, you have to use this',
        createdAt: 'asked 3 hours ago',
        createdBy: 'Gapur Kassym',
        comments: [],
      },
      {
        id: 2,
        votes: 6,
        body: 'If you are using React Router, you have to use this',
        createdAt: 'asked 3 hours ago',
        createdBy: 'Gapur Kassym',
        comments: [],
      },
    ],
  },
]

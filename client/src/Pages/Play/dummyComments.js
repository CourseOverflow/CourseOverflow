const dummyComments = [
  {
    id: 1,
    name: "John Doe",
    text: "This is a dummy comment, lets get slimy",
    thread: [
      { id: 1, name: "Jane Doe", text: "This is a dummy reply" },
      { id: 2, name: "John Doe", text: "This is a dummy reply" },
      { id: 3, name: "Jane Doe", text: "This is a dummy reply" },
      { id: 4, name: "John Doe", text: "This is a dummy reply" },
    ],
  },
  {
    id: 2,
    name: "Jane Doe",
    text: "This is a dummy comment",
    thread: [
      { id: 1, name: "John Doe", text: "This is a dummy reply" },
      { id: 2, name: "Jane Doe", text: "This is a dummy reply" },
      { id: 3, name: "John Doe", text: "This is a dummy reply" },
      { id: 4, name: "Jane Doe", text: "This is a dummy reply" },
    ],
  },
  {
    id: 3,
    name: "John Doe",
    text: "This is a dummy comment",
    thread: [
      { id: 1, name: "Jane Doe", text: "This is a dummy reply" },
      { id: 4, name: "John Doe", text: "This is a dummy reply" },
    ],
  },
  {
    id: 4,
    name: "Jane Doe",
    text: "This is a dummy comment",
    thread: [],
  },
  {
    id: 5,
    name: "John Doe",
    text: "This is a dummy comment",
    thread: [{ id: 1, name: "Jane Doe", text: "This is a dummy reply" }],
  },
];

export default dummyComments;

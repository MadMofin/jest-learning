export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  text: string;
}

export interface Todo {
  id: number;
  title: string;
  tasks: Array<string>;
}

export interface Comment {
  id: number;
  text: string;
}

export interface Album {
  id: number;
  title: string;
  songs: Array<string>;
}

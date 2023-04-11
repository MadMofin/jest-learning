import axios from "axios";

export const commentUrl =
  "https://jsonplaceholder.typicode.com/posts/1/comments";

export async function fetchUsers() {
  try {
    return await axios.get(`https://jsonplaceholder.typicode.com/users`);
  } catch (e) {
    return [];
  }
}

export async function fetchTodos() {
  try {
    return await axios.get(`https://jsonplaceholder.typicode.com/todos`);
  } catch (e) {
    return [];
  }
}

export async function fetchComments() {
  try {
    return await axios.get(commentUrl);
  } catch (e) {
    return [];
  }
}

export async function fecthAlbum() {
  try {
    return await axios.get(`https://jsonplaceholder.typicode.com/albums`);
  } catch (e) {
    return [];
  }
}

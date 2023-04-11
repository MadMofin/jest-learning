import axios from "axios";

export async function fetchUsers() {
  try {
    return await axios.get(`https://jsonplaceholder.typicode.com/users`);
  } catch (e) {
    return [];
  }
}

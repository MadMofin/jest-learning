import { User, Post, Todo, Comment, Album } from "../utils/interfaces";
import * as Factory from "factory.ts";
import { faker } from "@faker-js/faker";

export const personFactory = Factory.makeFactory<User>({
  id: Factory.each((i) => i),
  name: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
});

export const postFactory = Factory.makeFactory<Post>({
  id: Factory.each((i) => i),
  title: faker.commerce.product(),
  text: faker.commerce.productDescription(),
});

export const todoFactory = Factory.makeFactory<Todo>({
  id: Factory.each((i) => i),
  title: faker.name.jobTitle(),
  tasks: [],
});

export const commentFactory = Factory.makeFactory<Comment>({
  id: Factory.each((i) => i),
  text: faker.word.preposition(),
});

export const albumFactory = Factory.makeFactory<Album>({
  id: Factory.each((i) => i),
  title: faker.music.genre(),
  songs: [],
});

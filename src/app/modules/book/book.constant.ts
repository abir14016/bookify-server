import { IGenre } from "./book.interface";

export const bookSearchableFields = ["title", "author", "genre"];

export const bookFilterableFields = ["searchTerm", "genre", "publicationYear"];

export const genres: IGenre[] = [
  "Self-Help",
  "Detective",
  "Programming",
  "Thriller",
  "Science Fiction",
  "Novel",
];

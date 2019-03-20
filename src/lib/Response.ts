// Packages.
import * as Wittgenstein from '@scenicroutes/wittgenstein';

// Internal.
import { Formatter } from './Formatter';
import * as Types from '../types';

// Code.
export class Response {
  readonly page: number;
  readonly pages: number;
  readonly perpage: number;
  readonly total: number;
  readonly photo: Array<Wittgenstein.Photo>;

  static create(input: unknown): Response | Error {
    input = Formatter.formatResponse(input);

    if (isResponse(input)) {
      const { photo, ...other } = input;
      const safePhoto: Array<Wittgenstein.Photo> = [];

      for (const photoItem of photo) {
        const maybePhoto = Wittgenstein.Photo.create(
          Formatter.formatPhoto(photoItem)
        );

        if (maybePhoto instanceof Error) {
          return maybePhoto;
        }
        safePhoto.push(maybePhoto);
      }

      return new Response({ ...other, photo: safePhoto });
    }

    const errMsg = isSafeResponse(input).errMsg;
    return new Error(`ValidationError: ${errMsg}`);
  }

  private constructor(input: CreateResponseInput) {
    this.page = input.page;
    this.pages = input.pages;
    this.perpage = input.perpage;
    this.total = input.total;
    this.photo = input.photo;
  }
}

export const RESPONSE_PROPS = ['page', 'pages', 'perpage', 'total', 'photo'];

export const isResponse = (input: unknown): input is CreateResponseInput => {
  return isSafeResponse(input).isSafe;
};

export const isSafeResponse = (input: unknown): Types.IsSafe => {
  if (typeof input !== 'object') {
    return {
      isSafe: false,
      errMsg: `Expected type of input to be object, got ${typeof input}.`,
    };
  }

  if (input === null) {
    return {
      isSafe: false,
      errMsg: `Expected input not to be null.`,
    };
  }

  for (const key of RESPONSE_PROPS) {
    if (!input.hasOwnProperty(key)) {
      return {
        isSafe: false,
        errMsg: `Expected all input properties to be set, missing ${key}.`,
      };
    }
  }

  const { page, pages, perpage, total } = input as {
    page: unknown;
    pages: unknown;
    perpage: unknown;
    total: unknown;
  };

  const numbers = { page, pages, perpage, total };

  for (const [key, value] of Object.entries(numbers)) {
    if (typeof value !== 'number' || value === NaN) {
      return {
        isSafe: false,
        errMsg: `Expected type of input.${key} to be number, got ${typeof value}.`,
      };
    }
  }

  return {
    isSafe: true,
    errMsg: '',
  };
};

export interface CreateResponseInput {
  readonly page: number;
  readonly pages: number;
  readonly perpage: number;
  readonly total: number;
  readonly photo: Array<Wittgenstein.Photo>;
}

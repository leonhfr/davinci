// Internal.
import * as Types from '../types';

// Code.
export class Formatter {
  static formatResponse(input: any): any {
    if (typeof input !== 'object' || input === null) {
      return input;
    }

    const { page, pages, perpage, total } = input;
    return {
      ...input,
      page: Number(page),
      pages: Number(pages),
      perpage: Number(perpage),
      total: Number(total),
    };
  }

  static formatPhoto(
    input: any,
    properties?: Types.PhotoProperties
  ): any {
    if (typeof input !== 'object' || input === null) {
      return input;
    }

    let { description, tags } = input;

    if (description && description._content) {
      description = description._content;
    }

    if (tags && typeof tags === 'string') {
      tags = tags.split(' ');
    }

    return { ...input, description, tags, ...properties };
  }
}

// Internal.
import { Formatter } from './Formatter';
import * as Mocks from '../mocks';
import * as Types from '../types';

// Code.
describe('Formatter', () => {
  it('should be defined', () => {
    expect(Formatter).toBeDefined();
  });

  describe('formatResponse', () => {
    it('should return the input if it is not an object', () => {
      expect(Formatter.formatResponse(undefined)).toBeUndefined();
      expect(Formatter.formatResponse(null)).toBeNull();
    });
    it('should correctly format an API response', () => {
      const result = Formatter.formatResponse(Mocks.createMockResponse());
      expect(result).toMatchSnapshot();
    });
  });
  describe('formatPhoto', () => {
    it('should return the input if it is not an object', () => {
      expect(Formatter.formatPhoto(undefined)).toBeUndefined();
      expect(Formatter.formatPhoto(null)).toBeNull();
    });
    it('should correctly format an API response', () => {
      const photo = Mocks.createMockPhoto();
      const result1 = Formatter.formatPhoto(photo);
      const result2 = Formatter.formatPhoto({
        ...photo,
        description: undefined,
        tags: undefined,
      });
      expect(result1).toMatchSnapshot();
      expect(result2).toMatchSnapshot();
    });
    it('should correctly pass properties', () => {
      const properties: Types.PhotoProperties = {
        zoneId: '4ab7068b-6c6c-46d2-8009-1d7d1ab35a3b',
        inside: false,
      };
      const result = Formatter.formatPhoto(Mocks.createMockPhoto(), properties);
      expect(result).toMatchSnapshot();
    });
  });
});

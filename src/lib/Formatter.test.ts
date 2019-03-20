// Internal.
import { Formatter } from './Formatter';
import * as Mocks from '../mocks';

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
      const result = Formatter.formatPhoto(
        Mocks.createMockPhoto(),
        Mocks.photoProperties
      );
      expect(result).toMatchSnapshot();
    });
  });
});

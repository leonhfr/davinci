// Internal.
import { Response, RESPONSE_PROPS, isResponse } from './Response';
import * as Mocks from '../mocks';

// Code.
describe('Response', () => {
  describe('Class', () => {
    it('should be defined', () => {
      expect(Response).toBeDefined();
    });

    describe('create', () => {
      it('should fail to create a new instance - invalid input', () => {
        expect(Response.create(null)).toMatchSnapshot();
      });
      it('should create a new instance', () => {
        expect(
          Response.create(Mocks.createMockResponseInput())
        ).toMatchSnapshot();
      });
      it('should return errors when the photos are not correctly formatted', () => {
        expect(
          Response.create({
            ...Mocks.createMockResponse(),
            photo: [Mocks.createMockPhoto()],
          })
        ).toMatchSnapshot();
      });
      it('should create a new instance when the photos are correctly formatted', () => {
        expect(
          Response.create(
            {
              ...Mocks.createMockResponse(),
              photo: [Mocks.createMockPhoto()],
            },
            { zoneId: '4ab7068b-6c6c-46d2-8009-1d7d1ab35a3b', inside: false }
          )
        ).toMatchSnapshot();
      });
    });
  });

  describe('Validation', () => {
    it('should be defined', () => {
      expect(RESPONSE_PROPS).toBeDefined();
    });
    it('should match the expected value', () => {
      expect(RESPONSE_PROPS).toMatchSnapshot();
    });
    it('should be up to date', () => {
      expect(RESPONSE_PROPS).toEqual(
        Object.keys(Response.create(Mocks.createMockResponseInput()))
      );
    });
  });

  describe('isResponse', () => {
    it('should be defined', () => {
      expect(isResponse).toBeDefined();
    });
    it('should handle an invalid input - wrong type', () => {
      expect(isResponse('__FAIL__')).toBe(false);
    });
    it('should handle an invalid input - null type', () => {
      expect(isResponse(null)).toBe(false);
    });
    it('should handle an invalid input - missing props', () => {
      expect(isResponse({})).toBe(false);
    });
    it('should handle an invalid input - numbers', () => {
      expect(
        isResponse({
          ...Mocks.createMockResponseInput(),
          page: '__FAIL__',
        })
      ).toBe(false);
    });
  });
});

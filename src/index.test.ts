// Packages.
import axios from 'axios';

// Internal.
import { FLICKR_API_ENDPOINT } from './constants';
import * as index from './index';
import { Flickr } from './index';
import * as Mocks from './mocks';

// Code.
describe('index', () => {
  it('should expose the expected entries', () => {
    expect(index).toMatchSnapshot();
  });
});

describe('Flickr', () => {
  describe('API', () => {
    let axiosGetSpy: jest.SpyInstance;
    beforeEach(() => {
      axiosGetSpy = jest.spyOn(axios, 'get');
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should be defined', () => {
      expect(Flickr.API).toBeDefined();
    });

    describe('search', () => {
      it('should be defined', () => {
        expect(Flickr.API.search).toBeDefined();
      });
      it('should return an error if the request fails', async () => {
        const mockApiResponse = {
          data: {},
          status: 500,
          statusText: 'ERROR',
          headers: '',
          config: '',
        };
        axiosGetSpy = jest
          .spyOn(axios, 'get')
          //@ts-ignore
          .mockImplementation(async () => Promise.resolve(mockApiResponse));

        const result = await Flickr.API.search(
          Mocks.apiKey,
          Mocks.searchOptions,
          Mocks.photoProperties
        );
        expect(result).toMatchSnapshot();
      });
      it('should query the api with axios.get and return the expected result', async () => {
        const mockApiResponse = {
          data: {
            photos: Mocks.createMockResponse({
              photo: [Mocks.createMockPhoto()],
            }),
          },
          status: 200,
          statusText: 'OK',
          headers: '',
          config: '',
        };
        axiosGetSpy = jest
          .spyOn(axios, 'get')
          //@ts-ignore
          .mockImplementation(async () => Promise.resolve(mockApiResponse));

        const result = await Flickr.API.search(
          Mocks.apiKey,
          Mocks.searchOptions,
          Mocks.photoProperties
        );
        expect(result).toMatchSnapshot();
        expect(axiosGetSpy).toHaveBeenCalledTimes(1);
        expect(axiosGetSpy).toHaveBeenCalledWith(FLICKR_API_ENDPOINT, {
          api_key: 'test_api_key',
          format: 'json',
          method: 'flickr.photos.search',
          sort: 'date-posted-asc',
          accuracy: '16',
          content_type: '1',
          media: 'photos',
          extras: 'geo,description,owner_name,tags,views,o_dims',
          per_page: '250',
          bbox: '2.18,41.4,2.19,41.5',
          min_upload_date: '1546300800',
          max_upload_date: '1546387200',
          tags: 'foo,bar',
        });
      });
    });
  });
});

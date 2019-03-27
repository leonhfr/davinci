// Packages.
import axios from 'axios';
import * as debug from 'debug';

// Internal.
import { FLICKR_API_ENDPOINT, FLICKR_API_PARAMETERS } from './constants';
import { Response } from './lib/Response';
import * as Types from './types';

// Code.
const debugError = debug('davinci:error:flickr');
const debugVerbose = debug('davinci:verbose:flickr');

export namespace Flickr {
  export class API {
    static async search(
      api_key: string,
      searchOptions: Types.SearchOptions,
      photoProperties?: Types.PhotoProperties
    ): Promise<Response | Error> {
      debugVerbose(
        `requesting photos.search with parameters %o`,
        searchOptions
      );

      const methodParameters = {
        method: 'flickr.photos.search',
        sort: 'date-posted-asc',
        accuracy: 16,
        content_type: 1,
        media: 'photos',
        extras: 'geo,description,owner_name,tags,views,o_dims',
        per_page: 250,
      };

      const parameters = this.makeSafeParameters({
        api_key,
        ...FLICKR_API_PARAMETERS,
        ...methodParameters,
        ...searchOptions,
      });

      const response = await axios.get(FLICKR_API_ENDPOINT, {
        params: parameters,
      });

      const { data, status, statusText } = response;

      if (status !== 200) {
        debugError(
          `Flickr API answered with %s: %s: %j`,
          status,
          statusText,
          data
        );
        return new Error(`Flickr API answered with ${status}: ${statusText}`);
      }

      debugVerbose(`photos.search answered with: %o`, data);

      try {
        const string = (data as string).toString().slice(14, -1);

        const json = JSON.parse(string);

        const { photos } = json;

        return Response.create(photos, photoProperties);
      } catch (err) {
        debugError(`Couldn't complete parsing.`);
        return err;
      }
    }

    private static makeSafeParameters(
      parameters: Types.RequestParameters
    ): Types.SafeRequestParameters {
      const safeParameters: Types.SafeRequestParameters = {};

      for (const [key, value] of Object.entries(parameters)) {
        if (typeof value === 'string') {
          safeParameters[key] = value;
        } else if (typeof value === 'number') {
          safeParameters[key] = value.toString();
        } else if (Array.isArray(value)) {
          safeParameters[key] = value.join(',');
          // flickr: minimum_longitude, minimum_latitude, maximum_longitude, maximum_latitude
          // turf: extent in minX, minY, maxX, maxY order
        }
      }

      return safeParameters;
    }
  }

  export type SearchOptions = Types.SearchOptions;

  export type PhotoProperties = Types.PhotoProperties;
}

// Packages.
import * as turfHelpers from '@turf/helpers';

// Code.
export type IsSafe = {
  isSafe: boolean;
  errMsg: string;
};

export type KeyValue = { [key: string]: any };

export type RequestParameters = {
  [key: string]: number | string | Array<string> | turfHelpers.BBox | undefined;
};

export type SafeRequestParameters = {
  [key: string]: string;
};

export type FlickrSearchOptions = {
  bbox: turfHelpers.BBox;
  min_upload_date: number;
  max_upload_date: number;
  page?: number;
  geo_context?: number; // 0 undefined, 1 indoors, 2 outdoors
  tags?: Array<string>; // prefix with '-' to exclude
  tag_mode?: string; // 'any' or 'all'
  test?: string; // (title, description or tags) prefix with '-' to exclude
};

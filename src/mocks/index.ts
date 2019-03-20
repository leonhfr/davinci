// Internal.
import { CreateResponseInput } from '../lib/Response';
import * as Types from '../types';

// Code.
export const createMockResponseInput = (
  response?: any
): CreateResponseInput => {
  const _response = response || {};
  return {
    page: _response.page || 1,
    pages: _response.pages || 25225,
    perpage: _response.perpage || 2,
    total: _response.total || 50450,
    photo: _response.photo || [],
  };
};

export const createMockResponse = (response?: any) => {
  const _response = response || {};
  return {
    page: _response.page || 1,
    pages: _response.pages || '25225',
    perpage: _response.perpage || 2,
    total: _response.total || '50450',
    photo: _response.photo || [],
  };
};

export const createMockPhoto = (photo?: any) => {
  const _photo = photo || {};
  return {
    id: _photo.id || '32457360587',
    owner: _photo.owner || '41710899@N08',
    secret: _photo.secret || '69b27ceb18',
    server: _photo.server || '4898',
    farm: _photo.farm || 5,
    title: _photo.title || 'Arc de Triomf',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0,
    description: _photo.description || {
      _content:
        'The Arc de Triomf was built as the entrance of the 1888 Barcelona Universal Exposition. It was designed by architect Josep Vilaseca i Casanovas in the Neo-Mudéjar style.',
    },
    ownername: _photo.ownername || 'jdf_92',
    views: _photo.views || 16,
    tags:
      _photo.tags ||
      'spain barcelona arcdetriomf 1888barcelonaworldfair neomudéjar 1888barcelonauniversalexposition catelonia',
    latitude: _photo.latitude || 41.390791,
    longitude: _photo.longitude || 2.18114,
    accuracy: 16,
    context: _photo.context || 0,
    place_id: 'iFsnXNZTUriu3usbkw',
    woeid: '20220092',
    geo_is_family: 0,
    geo_is_friend: 0,
    geo_is_contact: 0,
    geo_is_public: 1,
  };
};

export const photoProperties: Types.PhotoProperties = {
  zoneId: '4ab7068b-6c6c-46d2-8009-1d7d1ab35a3b',
  inside: false,
};

export const apiKey = 'test_api_key';

export const searchOptions: Types.SearchOptions = {
  bbox: [2.18, 41.4, 2.19, 41.5],
  min_upload_date: 1546300800,
  max_upload_date: 1546387200,
  tags: ['foo', 'bar'],
  page: undefined,
};

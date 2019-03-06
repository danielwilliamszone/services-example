import { createAxiosClient, get } from '../../../../index';
export const client = createAxiosClient();

const baseUrl = '/api/codessearch/ethnicity';

const getEthnicityCodes = () =>
  get({ url: baseUrl, client })
    .then(({ data }) => data.hits)
    .catch(error => Promise.reject(error));

export default getEthnicityCodes;

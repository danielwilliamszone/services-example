import axiosCaseConverter from 'axios-case-converter';
import axios from 'axios';
import { PATH_BASE } from './common/consts';

axios.defaults.baseURL = process.env.NODE_ENV === 'test' ? '' : `${PATH_BASE}`;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const injectInterceptors = (client, interceptors = {}) => {
  const { response, request } = interceptors;
  const newClient = { ...client };

  if (response) {
    client.interceptors.response.use(response);
  }

  if (request) {
    client.interceptors.request.use(request);
  }

  return newClient;
};

const axiosHandleUnAuthRequests = (client) => {
  client.interceptors.response.use(
    response => response,
    (error) => {
      const unAuthorizedResponses = [401, 403];
      const { response: { status } = {} } = error;

      if (unAuthorizedResponses.includes(status)) {
        window.location.reload();
      }

      return Promise.reject(error);
    },
  );

  return client;
};

export const createAxiosClient = (settings = {}, convertCase = true) => {
  const axiosInstance = axios.create(settings.config);

  // Converter switches between snakeCase and camelCase
  const client = convertCase ? axiosCaseConverter(axiosInstance) : axiosInstance;

  injectInterceptors(client, settings.interceptors);

  axiosHandleUnAuthRequests(client);

  return client;
};

export const get = ({
  url, params, cancelToken, client,
}) =>
  client.get(url, {
    cancelToken,
    params,
  });

export const put = ({ url, data, client }) => client.put(url, data);

export const patch = ({ url, data, client }) => client.patch(url, data);

export const post = ({ url, data, client }) => client.post(url, data);

export const cancellableInstance = (msg = 'Replaced') => {
  // Mutable - must be changed with each request
  let call = null;

  return () => {
    if (call) {
      call.cancel(msg);
    }

    // Mutate the last call
    call = axios.CancelToken.source();

    return call;
  };
};

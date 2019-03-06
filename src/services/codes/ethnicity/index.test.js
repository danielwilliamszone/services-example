import '@babel/polyfill';
import moxios from 'moxios';
import getEthnicityCodes, { client as ethnicityCodesAxiosClient } from './';

const baseUrl = '/api/codessearch/ethnicity';

describe('Service | Ethnicity codes', () => {
  describe('Requests', () => {
    beforeEach(() => {
      moxios.install(ethnicityCodesAxiosClient);
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should call get ethnicity codes', (done) => {
      getEthnicityCodes();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        expect(request.url).toContain(baseUrl);
        expect(request.config.method).toEqual('get');
        done();
      });
    });

    it('should return hits from data', async (done) => {
      moxios.stubRequest(baseUrl, {
        status: 200,
        response: { hits: { item: 'A' } },
      });

      try {
        const data = await getEthnicityCodes();
        expect(data).toEqual({ item: 'A' });
        done();
      } catch (error) {
        // not expecting an error
      }
    });

    it('should return an error when a 404 is returned', async (done) => {
      moxios.stubRequest(baseUrl, {
        status: 404,
        response: { message: 'problem' },
      });

      try {
        await getEthnicityCodes();
      } catch (error) {
        expect(error.response.status).toEqual(404);
        expect(error.response.data.message).toEqual('problem');
        done();
      }
    });
  });
});

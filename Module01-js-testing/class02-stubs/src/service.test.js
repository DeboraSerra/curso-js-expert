const Service = require("./service");
const assert = require('assert');
const mocks = {
  tatooine: require('../mocks/tatooine.json'),
  alderaan: require('../mocks/alderaan.json'),
}

const tatooine = require('../mocks/tatooine.json');
const alderaan = require('../mocks/alderaan.json');

const { createSandbox } = require('sinon')

const sinon = createSandbox();

const BASE_URL_1 = 'https://swapi.dev/api/planets/1'
const BASE_URL_2 = 'https://swapi.dev/api/planets/2'

;(async () => {
  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);
  stub
    .withArgs(BASE_URL_1).resolves(mocks.tatooine)
    .withArgs(BASE_URL_2).resolves(mocks.alderaan)

    {
      const expected = {
        name: "Tatooine",
        surfaceWater: "1",
        appearIn: 5
      }
      const result = await service.getPlanets(BASE_URL_1);
      assert.deepStrictEqual(result, expected)
    }
    {
      const expected = {
        name: "Alderaan",
        surfaceWater: "40",
        appearIn: 2
      }
      const result = await service.getPlanets(BASE_URL_2);
      assert.deepStrictEqual(result, expected)
    }
    
})()

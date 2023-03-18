class Service {
  async makeRequest (url) {
    const data = await (await fetch(url)).json();
    return data;
  }

  async getPlanets(url) {
    const data = await this.makeRequest(url);
    const result = {
      name: data.name,
      surfaceWater: data.surface_water,
      appearIn: data.films.length,
    }
    return result;
  }
}

module.exports = Service;
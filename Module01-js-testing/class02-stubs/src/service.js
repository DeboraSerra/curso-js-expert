class Service {
  async makeRequest (url) {
    const data = await (await fetch(url)).json();
    return data;
  }
}

module.exports = Service;
const rewiremock = require("rewiremock/node");
const { deepStrictEqual } = require("assert");

// poderia estar em outro arquivo
const dbData = [
  { name: "John Doe" },
  { name: "Jane Doe" },
  { name: "Mario Bros" },
];
class MockDatabase {
  connect = () => this;
  find = async (query) => dbData;
}

rewiremock(() => require("../src/util/database")).with(MockDatabase);

(async () => {
  {
    const expected = dbData.map(({ name }) => ({
      name: name.toUpperCase(),
    }));
    rewiremock.enable();
    const UserFactory = require("../src/factory/userFactory");
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find({ name: "John Doe" });
    deepStrictEqual(result, expected);
    rewiremock.disable();
  }
  {
    const expected = dbData
      .filter(({ name }) => name === "John Doe")
      .map(({ name }) => ({
        name: name.toUpperCase(),
      }));
    const UserFactory = require("../src/factory/userFactory");
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find({ name: "John Doe" });
    deepStrictEqual(result, expected);
  }
})();

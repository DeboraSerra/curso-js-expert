import knex from 'knex'

export default class PostgresStrategy {
  #instance
  constructor(connectionString) {
    this.connectionString = connectionString;
    this.table = 'warriors'
  }

  async connect() {
    this.#instance = knex({
      client: "pg",
      connection: this.connectionString,
    });
    return this.#instance.raw('select 1+1 as result');
  }

  async create(item) {
    return this.#instance(this.table).insert(item)
  }

  async read() {
    return this.#instance(this.table).select('*')
  }
}

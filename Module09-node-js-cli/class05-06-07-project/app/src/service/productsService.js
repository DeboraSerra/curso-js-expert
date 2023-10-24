export default class ProductsService {
  constructor({ repository: productsRepository }) {
    this.productsRepository = productsRepository;
  }

  create(data) {
    return this.productsRepository.create(data);
  }

  read(query) {
    return this.productsRepository.read(query);
  }

  update(id, data) {
    return this.productsRepository.update(id, data);
  }

  delete(id) {
    return this.productsRepository.delete(id);
  }
}
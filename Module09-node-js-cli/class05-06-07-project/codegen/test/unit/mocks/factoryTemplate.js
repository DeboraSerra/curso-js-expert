export default `import ProductService from '../services/productService.js'
import ProductRepository from '../repositories/productRepository.js'

export default class ProductFactory {
  static getInstance() {
    const repository = new ProductRepository()
    const service = new ProductService({ repository })
    return service
  }
}`
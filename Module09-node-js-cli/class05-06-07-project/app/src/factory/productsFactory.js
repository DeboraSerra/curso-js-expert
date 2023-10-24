import ProductsService from '../service/productsService.js'
import ProductsRepository from '../repository/productsRepository.js'

export default class ProductsFactory {
  static getInstance() {
    const repository = new ProductsRepository()
    const service = new ProductsService({ repository })
    return service
  }
}
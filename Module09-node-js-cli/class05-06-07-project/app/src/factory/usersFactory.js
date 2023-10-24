import UsersService from '../service/usersService.js'
import UsersRepository from '../repository/usersRepository.js'

export default class UsersFactory {
  static getInstance() {
    const repository = new UsersRepository()
    const service = new UsersService({ repository })
    return service
  }
}
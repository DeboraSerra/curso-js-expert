export default class UsersService {
  constructor({ repository: usersRepository }) {
    this.usersRepository = usersRepository;
  }

  create(data) {
    return this.usersRepository.create(data);
  }

  read(query) {
    return this.usersRepository.read(query);
  }

  update(id, data) {
    return this.usersRepository.update(id, data);
  }

  delete(id) {
    return this.usersRepository.delete(id);
  }
}
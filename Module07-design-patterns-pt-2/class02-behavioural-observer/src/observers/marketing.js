export default class Marketing {
  update({ id, userName }) {
    // importante lembrar que o update é responsável por gerencial seus error e exceptions
    console.log(`Marketing for user ${userName} with id ${id} will be send`);
  }
}
export default class Util {
  static #transform({ str: [first, ...rest] , upperCase = true}) {
    return [
      upperCase ? first.toUpperCase() : first.toLowerCase(),
      ...rest,
    ].join("");
  }
  static upperCaseFirstLetter(str) {
    return str.trim() ? Util.#transform({ str }) : "";
  }

  static lowerCaseFirstLetter(str) {
    return str.trim() ? Util.#transform({ str, upperCase: false },) : "";
  }
}

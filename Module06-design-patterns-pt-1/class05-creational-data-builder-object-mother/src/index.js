/**
 * ProductId: should be between 2 and 20 characters
 * Name: should be only letters
 * Price: should be between 0 and 10000
 * Category: should be electronic or organic
 */

function productValidator(product) {
  const { id, name, price, category } = product;
  const errors = [];

  const invalidMessages = {
    id: "Id should be between 2 and 20 characters",
    name: "Name should be only letters",
    price: "Price should be between 0 and 10000",
    category: "Category should be electronic or organic",
  };

  const isIdValid = id.length >= 2 && id.length <= 20;
  const isNameValid = /^[a-zA-Z]+$/g.test(name);
  const isPriceValid = price >= 0 && price <= 10000;
  const isCategoryValid = category === "electronic" || category === "organic";

  [isIdValid, isNameValid, isPriceValid, isCategoryValid].forEach(
    (isValid, index) => {
      if (!isValid) {
        errors.push(Object.values(invalidMessages)[index]);
      }
    }
  );

  return {
    result: errors.length === 0,
    errors,
  };
}

module.exports = { productValidator };

import { describe, expect, it, jest } from "@jest/globals";
import { NotImplementedException } from "../src/util/exceptions.js";
import Order from "../src/entities/order.js";
import OrderBusiness from "../src/business/orderBusiness";

describe("OrderBusiness", () => {
  it('execution Order Business without Template Method', () => {
    const order = new Order({ customerId: 1, amount: 100, products: [{ description: 'Produto 1', price: 100 }] })
    const orderBusiness = new OrderBusiness()
    /**
     * Todos os devs devem obrigatoriamente lembrar de seguir a risca esse fluxo de
     * execução, caso contrário, o sistema não funcionará corretamente.
    */
    const isValid = orderBusiness._validateRequiredFields(order)
    expect(isValid).toBeTruthy()
    const result = orderBusiness._create(order)
    expect(result).toBeTruthy()
  })
  it('execution Order Business with Template Method', () => {
    const order = new Order({ customerId: 1, amount: 100, products: [{ description: 'Produto 1', price: 100 }] })
    const orderBusiness = new OrderBusiness()
    /**
     * Com Template Method, a sequência de passos é sempre executada
     * e evita a replicação de lógica
     */
    const validationFn = jest.spyOn(orderBusiness, orderBusiness._validateRequiredFields.name)
    const createFn = jest.spyOn(orderBusiness, orderBusiness._create.name)
    const result = orderBusiness.create(order)
    expect(result).toBeTruthy()
    expect(validationFn).toHaveBeenCalled()
    expect(createFn).toHaveBeenCalled()
  })
});

import { describe, it, jest, beforeAll } from "@jest/globals";
import Payment from "../src/events/payments";
import PaymentSubject from "../src/subjects/paymentSubject";
import Shipment from "../src/observers/shipment";
import Marketing from "../src/observers/marketing";

describe("Test suit for Observer Pattern", () => {
  // beforeAll(() => {
  //   jest.spyOn(console, console.log.name).mockImplementation(() => {});
  // })
  it("#PaymentSubject notify observers", () => {
    const subject = new PaymentSubject();
    const observer = {
      update: jest.fn(),
    };
    subject.subscribe(observer);
    const data = "Hello World!";
    subject.notify(data);
    expect(observer.update).toHaveBeenCalledWith(data);
  });
  it("#PaymentSubject should not notify unsubscribed observers", () => {
    const subject = new PaymentSubject();
    const observer = {
      update: jest.fn(),
    };
    const data = "Hello World!";
    subject.subscribe(observer);
    subject.unsubscribe(observer);
    subject.notify(data);
    expect(observer.update).not.toHaveBeenCalled();
  });
  it("#Payment should notify subject after a credit card transaction", () => {
    const subject = new PaymentSubject();
    const payment = new Payment(subject);
    const paymentSubjectSpy = jest.spyOn(payment.paymentSubject, payment.paymentSubject.notify.name);
    const paymentData = {
      userName: "John Doe",
      id: Date.now(),
    };
    payment.creditCard(paymentData);
    expect(paymentSubjectSpy).toHaveBeenCalledWith(paymentData);
  });
  it("#All should notify subscribers after a credit card transaction", () => {
    const subject = new PaymentSubject();
    const shipment = new Shipment()
    const marketing = new Marketing()
    const payment = new Payment(subject);
    const shipmentSpy = jest.spyOn(shipment, shipment.update.name);
    const marketingSpy = jest.spyOn(marketing, marketing.update.name);
    subject.subscribe(marketing);
    subject.subscribe(shipment);
    const paymentData = {
      userName: "John Doe",
      id: Date.now(),
    };
    payment.creditCard(paymentData);
    expect(marketingSpy).toHaveBeenCalledWith(paymentData);
    expect(shipmentSpy).toHaveBeenCalledWith(paymentData);
  });
});

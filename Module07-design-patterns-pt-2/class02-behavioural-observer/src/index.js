import Marketing from "./observers/marketing.js";
import Payment from "./events/payments.js";
import PaymentSubject from "./subjects/paymentSubject.js";
import Shipment from "./observers/shipment.js";

const subject = new PaymentSubject();
const shipment = new Shipment();
const marketing = new Marketing();

subject.subscribe(marketing);
subject.subscribe(shipment);

const payment = new Payment(subject);
const paymentData = {
  userName: "John Doe",
  id: Date.now(),
};
payment.creditCard(paymentData);

subject.unsubscribe(marketing);

const paymentData2 = {
  userName: "Jane Doe",
  id: Date.now(),
};
payment.creditCard(paymentData2);
const orderStore = require("../stores/order-store");
const { createOrderData } = require("../domain/orders");

function createOrder(input) {
  const orderData = createOrderData(input);
  return orderStore.create(orderData);
}

function listOrders() {
  return orderStore.list();
}

function getOrder(id) {
  return orderStore.findById(id);
}

function deleteOrder(id) {
  return orderStore.remove(id);
}

module.exports = { createOrder, listOrders, getOrder, deleteOrder };

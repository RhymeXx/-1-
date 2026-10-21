const { randomUUID } = require("node:crypto");

const orders = [];

function makeOrderId() {
  return `ord-${randomUUID().slice(0, 8)}`;
}

function create(orderData) {
  const order = { ...orderData, id: makeOrderId() };
  orders.push(order);
  return order;
}

function list() {
  return [...orders];
}

function findById(id) {
  return orders.find((order) => order.id === id) || null;
}

function remove(id) {
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) return false;
  orders.splice(index, 1);
  return true;
}

module.exports = { create, list, findById, remove };

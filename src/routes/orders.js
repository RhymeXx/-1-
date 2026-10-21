const express = require("express");
const orderService = require("../services/order-service");
const { validateCreateOrder, toOrderResponse } = require("../domain/orders");
const { validationProblem, notFoundProblem } = require("../middleware/errors");

const router = express.Router();

router.post("/", (req, res, next) => {
  const validationErrors = validateCreateOrder(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json(validationProblem("Invalid order", validationErrors));
  }

  try {
    const order = orderService.createOrder(req.body);
    return res.status(201).location(`/orders/${order.id}`).json(toOrderResponse(order));
  } catch (error) {
    return next(error);
  }
});

router.get("/", (req, res) => {
  const orders = orderService.listOrders().map(toOrderResponse);
  return res.status(200).json({ orders, count: orders.length });
});

router.get("/:id", (req, res) => {
  const order = orderService.getOrder(req.params.id);
  if (!order) return res.status(404).json(notFoundProblem());
  return res.status(200).json(toOrderResponse(order));
});

router.delete("/:id", (req, res) => {
  const removed = orderService.deleteOrder(req.params.id);
  if (!removed) return res.status(404).json(notFoundProblem());
  return res.status(204).send();
});

module.exports = router;

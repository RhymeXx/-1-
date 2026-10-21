const { describe, test } = require("node:test");
const assert = require("node:assert/strict");
const { validateCreateOrder, createOrderData, toOrderResponse } = require("../src/domain/orders");

describe("Order domain", () => {
  test("validates required customer and item fields", () => {
    assert.deepEqual(validateCreateOrder({ customerName: "", items: [] }), [
      "customerName is required",
      "At least one item is required",
    ]);
  });

  test("calculates total on the server and trims input", () => {
    const order = createOrderData({
      customerName: " Alex ",
      items: [
        { name: " Keyboard ", quantity: 1, price: 120 },
        { name: "Cable", quantity: 2, price: 7.25 },
      ],
    });

    assert.equal(order.customerName, "Alex");
    assert.equal(order.total, 134.5);
    assert.equal(order.status, "created");
    assert.equal(order.items[0].name, "Keyboard");
    assert.equal(toOrderResponse(order).createdAt, undefined);
  });

  test("rejects non-finite quantity and price", () => {
    const errors = validateCreateOrder({
      customerName: "Alex",
      items: [{ name: "Item", quantity: Infinity, price: NaN }],
    });
    assert.deepEqual(errors, [
      "items[0].quantity must be greater than zero",
      "items[0].price must be greater than zero",
    ]);
  });
});

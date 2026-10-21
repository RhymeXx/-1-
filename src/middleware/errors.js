function validationProblem(message, details) {
  return { error: { code: "VALIDATION_ERROR", message, details } };
}

function notFoundProblem() {
  return { error: { code: "ORDER_NOT_FOUND", message: "Order not found" } };
}

function handleErrors(error, req, res, next) {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json(validationProblem("Invalid JSON body", ["Request body must contain valid JSON"]));
  }

  console.error(error);
  return res.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "Unexpected server error" },
  });
}

module.exports = { validationProblem, notFoundProblem, handleErrors };

const { PAYSUITE } = require("../config");

async function createPayment(payload) {
  const response = await fetch(`${PAYSUITE.baseUrl}/api/v1/payments`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });

  return {
    response,
    result: await parseJsonResponse(response),
  };
}

async function getPayment(paymentId) {
  const response = await fetch(`${PAYSUITE.baseUrl}/api/v1/payments/${paymentId}`, {
    method: "GET",
    headers: buildHeaders(),
  });

  return {
    response,
    result: await parseJsonResponse(response),
  };
}

function buildHeaders() {
  return {
    Authorization: `Bearer ${PAYSUITE.apiToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

async function parseJsonResponse(response) {
  const text = await response.text();

  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

module.exports = {
  createPayment,
  getPayment,
};
export function errorFormat(message, status) {
  return { error: { status: status || 500, message } };
}

// function to generate random six characters
export function generateCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

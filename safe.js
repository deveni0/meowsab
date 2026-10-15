const ignored = new Set([
  "ERR_INVALID_ARG_TYPE",
]);

function isIgnored(err) {
  if (!err) return false;
  if (err.code && ignored.has(err.code)) return true;
  if (typeof err.message === "string" && err.message.includes("rate-overlimit")) return true;
  return false;
}

process.on("uncaughtException", (err) => {
  if (isIgnored(err)) return;
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  if (isIgnored(err)) return;
  console.error("Unhandled Rejection:", err);
});
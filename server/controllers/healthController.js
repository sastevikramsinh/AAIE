export async function getHealth(req, res) {
  return res.status(200).json({
    status: "ok",
    service: "aaie-server",
    timestamp: new Date().toISOString(),
  });
}


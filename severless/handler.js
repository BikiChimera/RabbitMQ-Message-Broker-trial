module.exports.processMessage = async (event) => {
  const data = JSON.parse(event.body || '{}');
  console.log("Lambda received:", data);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Message processed!" }),
  };
};

exports.handler = async (event, context) => {
  const clientIp = event.headers['client-ip'];
  
  // Here you would log the IP address
  console.log(`IP logged: ${clientIp}`);
  
  // You can also send this data to a database or a third-party logging service
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `IP ${clientIp} logged successfully.` }),
  };
};
const net = require('net');


const forwardHost = '1.1.1.1'; //backende
const forwardPort = 12345; //backned port
const forwardConn = 3; // Max Active Connections Not ratelimit
const FrontPort = 22; //proxy port frontend connection
const activeConnections = {};


const server = net.createServer((client) => {

  const clientIp = client.remoteAddress;

  if (activeConnections[clientIp] >= forwardConn) { //Block more than xx connections
    console.log(`Rejected connection from ${clientIp}: too many active connections`);
    client.destroy();
    return;
  }


  if (client.encrypted) {
    console.log(`Rejected TLS connection from ${clientIp}`);
    client.destroy();
    return;
  }


  if (activeConnections[clientIp]) {
    activeConnections[clientIp]++;
  } else {
    activeConnections[clientIp] = 1;
  }

  console.log(`Accepted connection from ${clientIp}`);


  const forward = net.createConnection({
    host: forwardHost,
    port: forwardPort,
  });


  client.pipe(forward);
  forward.pipe(client);
  
  client.on('end', () => {
    activeConnections[clientIp]--;
    console.log(`Closed connection from ${clientIp}`);
  });


  forward.on('error', (err) => console.error(err));
  client.on('error', (err) => console.error(err));


  client.on('data', (data) => { //Kill a connection if transmi HTTP data, may kill the connection if the attack method is HTTP-XXXXXX
    if (data.toString().includes('HTTP')) {
      console.log(`Killing connection from ${clientIp} due to HTTP data: ${data.toString()}`);
      client.destroy();
    }
  });
});

server.listen(FrontPort, () => {
  console.log(`Server listening on ${server.address().port}`);
});

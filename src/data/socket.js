import socketIOClient from "socket.io-client";
const ENDPOINT = "http://103.199.7.185";
const socket = socketIOClient(ENDPOINT);

const RETRY_INTERVAL = 1000;
var timeout;
let connected = false;
socket.on('connect',function(){
  connected = true;
  clearTimeout(timeout);
	socket.emit('authenticate', {
		token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjMwZjE5YTBjNTA4YTBlYzRkNmVmN2QiLCJpYXQiOjE2MTEwNDU3MTgsImV4cCI6MTYxMTEzMjExOH0.k3BuSg5kfP3oIovRMnpoCjwtBOkFPdFL-_niVzj1Cxs"
	});
});

socket.on('disconnect', () => {
  connected = false;
  console.log("Socket disconnected");
  retryConnectOnFailure(RETRY_INTERVAL);
});

var retryConnectOnFailure = function (retryInMilliseconds) {
	timeout = setTimeout(function () {
		if (!connected) {
			console.log("Try to connect...", connected)
			socket.connect("http://103.199.7.185");
			retryConnectOnFailure(retryInMilliseconds);
		}
	}, retryInMilliseconds);
};
export {socket};
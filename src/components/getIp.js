const os = require("os");

const networkInterfaces = os.networkInterfaces();
const ip = networkInterfaces["Wi-Fi"][1]["address"];

REACT_APP_DEPLOY_DOMAIN = `http://${ip}`;
console.log(`http://${ip}`);
return `http://${ip}`;

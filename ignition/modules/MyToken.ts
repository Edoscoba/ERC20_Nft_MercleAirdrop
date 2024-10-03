
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


const EDOSEModule = buildModule("EDOSEModule", (m) => {
    console.log("deploying contract....");
    const Mytoken = m.contract("EDOSE");

    return {Mytoken };
  console.log("deployed token address: ",tokenTransfer);
});

export default EDOSEModule;

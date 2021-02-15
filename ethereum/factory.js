import web3 from "./web3";

import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x5fE27621b33bE8f235Db27709A99A3AeB1D7b852"
);

export default instance;
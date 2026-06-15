const Addition = artifacts.require("Addition");
const ConvertisseurCrypto = artifacts.require("ConvertisseurCrypto");
const GestionChaines = artifacts.require("GestionChaines");
const Signe = artifacts.require("Signe");
const Parite = artifacts.require("Parite");
const GestionTableau = artifacts.require("GestionTableau");
const Rectangle = artifacts.require("Rectangle");
const Payment = artifacts.require("Payment");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Addition, 10, 20);
  await deployer.deploy(ConvertisseurCrypto);
  await deployer.deploy(GestionChaines);
  await deployer.deploy(Signe);
  await deployer.deploy(Parite);
  await deployer.deploy(GestionTableau);
  await deployer.deploy(Rectangle, 0, 0, 5, 3);
  await deployer.deploy(Payment, accounts[0]);
};

import { Contract } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

/**
 * Deploys a contract named "MultiDAOTreasury" using the deployer account and
 * stablecoin address from the hardhat configuration.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployMultiDAOTreasury: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer, stablecoin } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Deploy the MultiDAOTreasury contract
  const multiDAOTreasury = await deploy("MultiDAOTreasury", {
    from: deployer,
    args: [stablecoin], // Use the stablecoin address from the config
    log: true,
    autoMine: true, // Enable autoMine for local network
  });

  // Get the deployed contract to interact with it
  console.log("👋 MultiDAOTreasury Contract deployed at address:", multiDAOTreasury.address);
};

export default deployMultiDAOTreasury;

// Tags for easier deployment
deployMultiDAOTreasury.tags = ["MultiDAOTreasury"];

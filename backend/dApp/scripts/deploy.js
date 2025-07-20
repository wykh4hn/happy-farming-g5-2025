const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Deploying Marketplace contract...");

  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.waitForDeployment();
  const address = await marketplace.getAddress();

  console.log("Marketplace deployed to:", address);

  // Get the ABI from the artifacts
  const artifact = await hre.artifacts.readArtifact("Marketplace");

  // Create the contract data for frontend
  const contractData = {
    address: address,
    abi: artifact.abi,
  };

  // Ensure the contracts directory exists in frontend
  const contractsDir = path.join(__dirname, "../../../frontend/src/contracts");
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  // Write the contract data to frontend
  fs.writeFileSync(
    path.join(contractsDir, "Marketplace.json"),
    JSON.stringify(contractData, null, 2)
  );

  console.log(
    "Contract ABI and address saved to frontend/src/contracts/Marketplace.json"
  );

  // Also save to a deployment info file
  const deploymentInfo = {
    network: hre.network.name,
    address: address,
    deployedAt: new Date().toISOString(),
    contractName: "Marketplace",
  };

  fs.writeFileSync(
    path.join(contractsDir, "deployment.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

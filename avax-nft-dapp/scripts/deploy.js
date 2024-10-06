async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with account:", deployer.address);
  
    // Déployer le contrat avec l'adresse du propriétaire
    const DocumentNFT = await ethers.getContractFactory("DocumentNFT");
    const contract = await DocumentNFT.deploy(deployer.address);  // Utilise l'adresse du déployeur comme propriétaire initial
  
    await contract.deployed();
    console.log("Contract deployed to:", contract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Minting NFT with account:", deployer.address);
  
    // L'adresse du contrat déployé
    const contractAddress = "0xDa980bB31b13b641be5Fb6578927c73C6263Aa31";
  
    // Obtenir le contrat déployé
    const DocumentNFT = await ethers.getContractAt("DocumentNFT", contractAddress);
  
    // Mint un NFT avec un tokenURI (exemple d'un lien IPFS)
    const tx = await DocumentNFT.mint(deployer.address, "ipfs://your-token-uri");
    console.log("Transaction hash:", tx.hash);
  
    await tx.wait();
    console.log("NFT minted successfully");
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
async function main() {
    const { ethers } = require("hardhat");
  
    const VaulContract = await ethers.getContractFactory("Vault");
    const vaultContract = await VaulContract.deploy();
  
   // const ExampleToken = await ethers.getContractFactory("ExampleToken");
   // const exampleToken = await ExampleToken.deploy(1000000); 
   // await exampleToken.deployed();
  
   /* //Inicializa el contrato
    const tx1 = await vaultContract.initialize(exampleToken.address,exampleToken.address,exampleToken.address,exampleToken.address); 
    console.log("1 Contrato inicializado")
  
    //Agarra la wallet del usuario
    const accounts = await ethers.getSigners();
    const defaultSigner = accounts[0];
  
    //Incrementa el allowance para que el contrato pueda retirar
    const amountToApprove = ethers.utils.parseEther("100"); // Reemplaza 100 con la cantidad que desees aprobar
    await exampleToken.connect(defaultSigner).approve(vaultContract.address, amountToApprove);
    console.log("2 Allowance aumentado correctamente.");
  
    const tx2 = await vaultContract.deposit(exampleToken.address,100); 
    console.log("3 Funciono todo correctamente")*/
    
  }
  
  main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
  
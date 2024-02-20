import { ethers } from "hardhat"

const deploy = async () => {
    async function isContract(address: string): Promise<boolean> {
        const code = await ethers.provider.getCode(address)
        return code !== "0x"
    }

    try {
        //Vault
        const Vault = await ethers.getContractFactory("Vault")
        const deployedContract = await Vault.deploy()
        await deployedContract.deployed()

        //insuranceFundArg
        const insuranceFundArg = await ethers.getContractFactory("InsuranceFund")
        const deployedContract2 = await insuranceFundArg.deploy()
        await deployedContract2.deployed()

        //ClearingHouses
        const clearingHouseConfigArg = await ethers.getContractFactory("ClearingHouseConfig")
        const deployedContract3 = await clearingHouseConfigArg.deploy()
        await deployedContract3.deployed()

        //accountBalance
        const accountBalanceArg = await ethers.getContractFactory("AccountBalance")
        const deployedContract4 = await accountBalanceArg.deploy()
        await deployedContract4.deployed()

        //exchangeArg
        const exchangeArg = await ethers.getContractFactory("Exchange")
        const deployedContract5 = await exchangeArg.deploy()
        await deployedContract5.deployed()

        const ExampleToken = await ethers.getContractFactory("ExampleToken")
        const exampleToken = await ExampleToken.deploy(1000000)
        await exampleToken.deployed()

        const accounts = await ethers.getSigners()
        const defaultSigner = accounts[0]

        const amountToApprove = ethers.utils.parseEther("100")
        await exampleToken.connect(defaultSigner).approve(deployedContract.address, amountToApprove)

        const isContractAddress = await isContract(deployedContract2.address)

        if (isContractAddress) {
            console.log("La dirección", deployedContract2.address, "es un contrato.")
        } else {
            console.log("La dirección", deployedContract2.address, "no es un contrato.")
        }

        console.log("Vault contract deployed at address:", deployedContract.address)
        console.log("Token contract deployed at address:", exampleToken.address)

        console.log("Paso 1")
        console.log("Ejecutando initialize()")
        const tx = await deployedContract.initialize(
            deployedContract2.address,
            deployedContract3.address,
            deployedContract4.address,
            deployedContract5.address,
        )
        console.log("Transacción enviada1:", tx.hash)

        console.log("Paso 2")
        console.log("Ejecutando deposit()")
        const tx2 = await deployedContract.deposit(exampleToken.address, ethers.utils.parseUnits("1", 18))
        console.log("Transacción enviada2:", tx2.hash)
    } catch (error) {
        console.error("Ocurrió un error durante el despliegue o ejecución:", error)
    }
}

// Ejecutamos la función deploy
deploy()

import * as dotenv from "dotenv"
import { ethers } from "ethers"
// Load environment variables from .env file
dotenv.config()

// Get the vars key from the .env file
const deployerKey = process.env.PRIVATE_KEY
const providerUrl = process.env.PROVIDER_URL

// Import ABI and bytecode of the contract
import Vault from "../../artifacts/contracts/Vault.sol/Vault.json"

// Initialize provider and wallet
const provider = new ethers.providers.JsonRpcProvider(providerUrl)
const wallet = new ethers.Wallet(deployerKey, provider)

const deploy = async () => {
    try {
        const VaultVault = new ethers.ContractFactory(Vault.abi, Vault.bytecode, wallet)
        const deployedContract = await VaultVault.deploy()
        await deployedContract.deployed()

        console.log("Contrat deploy address:", deployedContract.address)
        const contract = new ethers.Contract(deployedContract.address, Vault.abi, wallet)

        console.log("Deposit()")
        try {
            const amountInWei = ethers.utils.parseUnits("1", 18)
            const token = "0xc2B5Acd41726f5a3F4670ff7bFff043Ea2f3B865"
            const tx = await contract.deposit(token, amountInWei)
            console.log("Transacción enviada:", tx.hash)

            const receipt = await tx.wait()
            console.log("Transacción confirmada en el bloque:", receipt.blockNumber)
        } catch (error) {
            console.error("Error al depositar:", error)
        }
    } catch (error) {
        console.error("An error occurred in the deployment:", error)
    }
}

// Execute the deploy function
deploy()

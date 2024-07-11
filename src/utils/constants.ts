import { ethers } from "ethers";
import factoryArtifact from "@uniswap/v2-core/build/UniswapV2Factory.json";

export const fetchTokenProvider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/aMOPLBt_56L39th6b_kp58R2N65TxK9y')

export const factoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
export const factoryContract = new ethers.Contract(factoryAddress, factoryArtifact.abi, fetchTokenProvider)

import { ethers } from "ethers";
import express from "express";
import { factoryContract } from "../utils/constants";

let tokensData : tokenDataInterface[] = [];
interface tokenDataInterface {
    tokenAddress: string,
    poolAddress: string
}

export const listenToTokens = async (ws: any) => {
    console.log("Starting to listen")
    let running = true; 

    const onPairCreated = (token0: string, token1: string, pool: string) => {
        if (token1 === '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2') {
            const tokenData: tokenDataInterface = {
                tokenAddress: token0,
                poolAddress: pool
            }
            console.log(tokenData);
            tokensData.unshift(tokenData)
            ws.send(JSON.stringify(tokenData))
        }
    };

    factoryContract.on('PairCreated', onPairCreated);

    ws.onclose = () => {
        console.log('Turning off listening');
        factoryContract.off('PairCreated', onPairCreated);
    }
}

export const removeToken = async (req: express.Request, res: express.Response) => {
    try{
        const tokenAddress = req.body.tokenAddress;
        tokensData = tokensData.filter(item => item.tokenAddress !== tokenAddress)
        console.log(tokensData)
    }catch(error){
        console.log(error);
    }
}

export const testRoute = async (req: express.Request, res: express.Response) => {
    try{
        console.log(req.body);
        const response = {
            status: 2000,
        }
        res.status(200).json(response);
    }catch(error){
        console.log(error);
    }
}
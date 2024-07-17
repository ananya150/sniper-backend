import Web3 from 'web3';
import WebSocket from 'ws';
import { keccak256, toChecksumAddress } from 'web3-utils';
import rlp from 'rlp';
import { ethers } from 'ethers';

const web3 = new Web3('wss://eth-mainnet.g.alchemy.com/v2/aMOPLBt_56L39th6b_kp58R2N65TxK9y');
const web3Provider = new Web3('https://eth-mainnet.g.alchemy.com/v2/aMOPLBt_56L39th6b_kp58R2N65TxK9y')
const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/aMOPLBt_56L39th6b_kp58R2N65TxK9y');

let blockEvents = []

const listen = async () => {
    
    var msg = 
    {
      "jsonrpc" : "2.0",
      "id" : 1,
      "method" : "eth_subscribe",
      "params" : [
        "alchemy_minedTransactions"
      ]
    };
    var ws = new WebSocket('wss://eth-mainnet.g.alchemy.com/v2/aMOPLBt_56L39th6b_kp58R2N65TxK9y');
    ws.onmessage = function (e) {
        try{
            if(JSON.parse(e.data.toString())["params"]["result"]["transaction"]["to"] === null){
                console.log(Date.now())
                console.log(JSON.parse(e.data.toString())["params"]["result"])
            }
        }catch{
        }
    };
    ws.onopen = function () {
        ws.send(JSON.stringify(msg));
    };
}

const transferEventSignature = web3Provider.utils.sha3('Transfer(address,address,uint256)');

async function checkERC20(txHash: string, fromAddr: string) {
    try {
        const receipt = await web3Provider.eth.getTransactionReceipt(txHash);
        const transferEvents = receipt.logs.filter(log => log.topics![0] === transferEventSignature);

        if(transferEvents.length === 0) return false;

        // Parse the Transfer events
        const parsedEvents = {
            from: '0x' + transferEvents[0].topics![1].slice(26),
            to: '0x' + transferEvents[0].topics![2].slice(26),
            value: web3.utils.fromWei(web3.utils.hexToNumberString(transferEvents[0].data as string), 'ether')
        }
        if(parsedEvents.from === '0x0000000000000000000000000000000000000000' && parsedEvents.to.toLowerCase() === fromAddr.toLowerCase()) return true;
        return false;
      }
    catch (error) {
      console.error('Error fetching events:', error);
      return false;
    }
  }

const test = async () => {
    const isERC20Tx = await checkERC20('0x8c986be0bdd16282dff5ee47da28a1f0195be5caaee7012669dbf42e91120784', '0x8B51eA76819fF4Ca97E1462e23FEb1Dc3f6958Ce');
    console.log(isERC20Tx);
}

test()


// listen()


function calculateContractAddress(deployerAddress: string, nonce: number) {
    const rlpEncoded = rlp.encode([deployerAddress, nonce]);
    const contractAddressLong = keccak256(rlpEncoded);
    const contractAddress = '0x' + contractAddressLong.slice(-40);
    console.log(contractAddress);
    return toChecksumAddress(contractAddress);
}

// calculateContractAddress('0x73CB79E20C85f0A62f427dDCB06255d3E2e22BD2', 0);
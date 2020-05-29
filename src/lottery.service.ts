import loadWeb3 from './web3';

const address = '0xA8e691598e4c927D78a83e1C24FA4B64fab1dfB8';
const abi: any = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
        inputs: [],
        name: 'enter',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getPlayers',
        outputs: [Array],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'manager',
        outputs: [Array],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'pickWinner',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [Array],
        name: 'players',
        outputs: [Array],
        stateMutability: 'view',
        type: 'function'
    }
];

const createContract = async () => {

    const web3 = await loadWeb3();
    return new web3.eth.Contract(abi, address);
}

export default createContract();

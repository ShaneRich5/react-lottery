import Web3 from 'web3';

const loadWeb3 = async () => {
    const { ethereum, web3: injectedWeb3 } = window;
    let web3;

    if (ethereum) {
        web3 = new Web3(ethereum);

        try {
            await ethereum.enable();
            return web3;
        } catch (error) {
            console.error(error)
            throw new Error('User denied account access');
        }
    } else if (injectedWeb3) {
        return new Web3(injectedWeb3.currentProvider);
    }

    throw new Error("non-dapp browser");
};

export default loadWeb3;

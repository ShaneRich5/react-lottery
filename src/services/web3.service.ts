import Web3 from 'web3';
import { UserDeniedAccessError } from '../errors/user-denied-access.error';
import { UnsupportedBrowserError } from '../errors/unsupported-browser.error';

const loadWeb3 = async () => {
    const { ethereum, web3: injectedWeb3 } = window;
    let web3;

    if (ethereum) {
        web3 = new Web3(ethereum);

        try {
            await ethereum.enable();
            return web3;
        } catch (error) {
            console.error(error);
            throw new UserDeniedAccessError('User denied account access');
        }
    } else if (injectedWeb3) {
        return new Web3(injectedWeb3.currentProvider);
    }

    throw new UnsupportedBrowserError("non-dapp browser");
};

export default loadWeb3;

import {InjectedConnector} from "@web3-react/injected-connector";
import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import {FC} from "react";
import {Button} from "../button/Button";

export const ConnectWallet: FC = () => {

    const injectedConnector = new InjectedConnector({});

    const {activate} = useWeb3React<Web3Provider>();

    return (
        <div>
            <Button type="button" onClick={() => activate(injectedConnector)}>
                Connect wallet
            </Button>
        </div>
    );
}

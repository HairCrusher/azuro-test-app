import type {NextPage} from 'next'
import {ContractForm, FormState} from "../components/contractForm/ContractForm";

import {ConnectWallet} from "../components/connectWallet/ConnectWallet";
import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import {useEffect, useState} from "react";
import {TestTaskContract, TestTaskContract__factory, USDT, USDT__factory} from "../contracts";
import {BigNum, getNumber} from "../utils";
import {TEST_TASK_ADDRESS, USDT_CONTRACT_ADDRESS} from "../constants/addresses";
import {BigNumber, ethers} from "ethers";

import styles from '../styles/App.module.scss';
import {TransactionsHistoryItemProps} from "../components/transactionsHistory/TransactionsHistoryItem";
import {TransactionsHistoryList} from "../components/transactionsHistory/TransactionsHistoryList";

let etherscanProvider = new ethers.providers.EtherscanProvider();

const App: NextPage = () => {

    const {active, account, library} = useWeb3React<Web3Provider>();

    const [USDTContract, setUSDTContract] = useState<USDT | null>(null);
    const [TestTaskC, setTestTaskContract] = useState<TestTaskContract | null>(null);

    const [USDTBalance, setUSDTBalance] = useState<BigNumber>();
    const [TestTaskCBalance, setTestTaskCBalance] = useState<BigNumber>();

    const [loading, setLoading] = useState<boolean>(false);

    const [transactions, setTransactions] = useState<TransactionsHistoryItemProps[]>([]);

    const updateBalances = async (_USDTContract?: USDT, _TestTaskC?: TestTaskContract, _account?: string | null) => {
        if (_USDTContract && _TestTaskC && _account) {
            _USDTContract.balanceOf(_account)
                .then(setUSDTBalance)
                .catch(e => {
                    console.error('USDTContract.balanceOf error', e);
                    setTestTaskCBalance(undefined);
                });
        }

        if (_USDTContract && _TestTaskC && _account) {
            _TestTaskC.balance(_account)
                .then(setTestTaskCBalance)
                .catch(e => {
                    console.error('TestTaskContract.balance error', e);
                    setTestTaskCBalance(undefined);
                });
        }
    }

    const pushToTransactionsList = (t: TransactionsHistoryItemProps) => {
        setTransactions(state => {
            const newState = [...state, t];

            return newState.slice(-10);
        });
    }

    useEffect(() => {
        if (library) {
            const USDT = USDT__factory.connect(USDT_CONTRACT_ADDRESS, library.getSigner());
            const TestTask = TestTaskContract__factory.connect(TEST_TASK_ADDRESS, library.getSigner());
            setUSDTContract(USDT);
            setTestTaskContract(TestTask);

            TestTask.on('Withdraw', (transaction, amount, options) => {
                pushToTransactionsList({
                    amount,
                    actionType: 'Withdraw',
                    address: transaction,
                    date: new Date(),
                    transactionHash: options.transactionHash,
                });
                updateBalances(USDT, TestTask, account).then();
            });

            TestTask.on('Provide', (transaction, amount, options) => {
                pushToTransactionsList({
                    amount,
                    actionType: 'Provide',
                    address: transaction,
                    date: new Date(),
                    transactionHash: options.transactionHash,
                });
                updateBalances(USDT, TestTask, account).then();
            });

        }
        return () => {
            TestTaskC?.removeAllListeners('Withdraw');
            TestTaskC?.removeAllListeners('Provide');
        }
    }, [library]);

    useEffect(() => {
        updateBalances(USDTContract!, TestTaskC!, account).then()
    }, [USDTContract, TestTaskC, account]);

    useEffect(() => {
        etherscanProvider.getHistory(TEST_TASK_ADDRESS).then(x => {
            console.log('getHistory', x);
        })
    }, []);

    const handleProvide = async ({value}: FormState) => {

        if (!USDTContract || !TestTaskC || !account) {
            return;
        }

        const sum = BigNumber.from(value).mul(BigNumber.from(BigNum));

        const approve = await USDTContract.approve(TestTaskC.address, sum);


        setLoading(true);
        await approve.wait();

        const transaction = await TestTaskC.provide(sum);
        await transaction.wait();
        setLoading(false);
    }

    const handleWithdraw = async ({value}: FormState) => {
        if (!TestTaskC || !USDTContract || !account) {
            return;
        }

        const sum = BigNumber.from(value).mul(BigNumber.from(BigNum));

        setLoading(true);
        const transaction = await TestTaskC.withdraw(sum);
        await transaction.wait();
        setLoading(false);
    }

    return (
        <main className={styles.main}>
            {
                !active ?
                    <ConnectWallet/> :
                    <div className={styles.wrapper}>
                        <p className={styles.loading} data-show={loading}>LOADING...</p>
                        <div className={styles.container}>
                            <ContractForm
                                title="Provide Tokens"
                                inputPlaceholder="Amount"
                                tip={USDTBalance && `Your balance: ${getNumber(USDTBalance)} USDT`}
                                submitBtnText="Provide"
                                onSubmit={handleProvide}
                                disabled={loading}
                            />
                            <ContractForm
                                title="Withdraw Tokens"
                                inputPlaceholder="Amount"
                                tip={TestTaskCBalance && `Available: ${getNumber(TestTaskCBalance)} USDT`}
                                submitBtnText="Withdraw"
                                onSubmit={handleWithdraw}
                                disabled={loading}
                            />
                        </div>
                        <TransactionsHistoryList list={transactions}/>
                    </div>
            }

        </main>
    )
}

export default App

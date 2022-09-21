import {FC} from "react";
import {BigNumber} from "ethers";
import {getNumber} from "../../utils";

export interface TransactionsHistoryItemProps {
    address: string;
    amount: BigNumber;
    actionType: string;
    date: Date;
    transactionHash: string;
}

export const TransactionsHistoryItem: FC<TransactionsHistoryItemProps> = (props) => {

    const {
        address,
        amount,
        actionType,
        date,
    } = props;

    return (
        <tr>
            <td>{address}</td>
            <td>{getNumber(amount)} USDT</td>
            <td>{actionType}</td>
            <td>{date.toString()}</td>
        </tr>
    );
}

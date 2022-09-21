import {FC} from "react";
import {TransactionsHistoryItem, TransactionsHistoryItemProps} from "./TransactionsHistoryItem";

export interface TransactionsHistoryListProps {
    list: TransactionsHistoryItemProps[];
}

export const TransactionsHistoryList: FC<TransactionsHistoryListProps> = ({list}) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>Sender address</th>
                    <th>Amount</th>
                    <th>Action</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {list.map(x => (<TransactionsHistoryItem {...x} key={x.transactionHash} />))}
            </tbody>
        </table>
    );
}

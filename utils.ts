import {BigNumber} from "ethers";

export const BigNum = 1000000000000000000n;

export const getNumber = (num: BigNumber) => parseInt(num.div(BigNumber.from(BigNum)).toString());

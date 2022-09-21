/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  TestTaskContract,
  TestTaskContractInterface,
} from "../TestTaskContract";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        name: "to",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        name: "from",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Provide",
    type: "event",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address",
      },
    ],
    name: "balance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "amount",
        type: "uint256",
      },
    ],
    name: "provide",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class TestTaskContract__factory {
  static readonly abi = _abi;
  static createInterface(): TestTaskContractInterface {
    return new utils.Interface(_abi) as TestTaskContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestTaskContract {
    return new Contract(address, _abi, signerOrProvider) as TestTaskContract;
  }
}
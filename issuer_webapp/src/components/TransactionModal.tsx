import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckCircleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionData: {
    gasFee: string;
    previousBalance: string;
    newBalance: string;
    transactionHash: string;
  } | null;
}

export function TransactionModal({ isOpen, onClose, transactionData }: TransactionModalProps) {
  if (!transactionData) return null;

  const explorerUrl = `https://testnet.snowtrace.io/tx/${transactionData.transactionHash}`;

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="text-center">
                <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mt-4"
                >
                  Transaction Successful
                </Dialog.Title>
              </div>

              <div className="mt-4 space-y-4">
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="text-green-700">
                    Certificate has been successfully issued on the blockchain
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    Gas fee of {transactionData.gasFee} AVAX has been deducted from your wallet for certificate issuance
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-md space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Previous Balance:</span>
                      <span className="text-sm font-medium">{transactionData.previousBalance} AVAX</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">New Balance:</span>
                      <span className="text-sm font-medium">{transactionData.newBalance} AVAX</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Transaction
                    <ArrowTopRightOnSquareIcon className="ml-2 -mr-1 h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
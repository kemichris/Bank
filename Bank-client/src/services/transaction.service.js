import api from "../utils/axios";

// get transaction history for user 
export const getTransactionHistory = async () => {
    const response = await api.get('/transaction/history');

    return response.data;
};

// Get transfer receipts
export const getTransferRecipient = async (accountNumber) => {
    const { data } = await api.get(
        `/transaction/recipient?accountNumber=${accountNumber}`,
    );

    return data;
};

// local transfer
export const transferFunds = async (transferData) => {
    const { data } = await api.post("/transaction/transfer", transferData);

    return data;
};

// international transfer
export const internationalTransfer = async (formData) => {
    const { data } = await api.post(
        "/transaction/international-transfer",
        formData,
    );

    return data
};


// Get all credit transactions 
export const allCreditTransaction = async ()=> {
    const {data} = await api.get('/admin/transactions/credit');

    return data 
}

// Reject Transaction
export const rejectTransaction = async (transactionId) => {
    const {data} = await api.patch(`/transaction/${transactionId}/reject`);

    return data
}

export const deleteTransaction = async (transactionId) => {
    const {data} = await api.delete(`/transaction/${transactionId}`);

    return data
}
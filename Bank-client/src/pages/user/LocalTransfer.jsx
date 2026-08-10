import { FaArrowLeft } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

import { UserPageHeader } from "../../components/ui/UserPageHeader";
import { TransferForm } from "../../components/transaction/TransferForm";


export function LocalTransfer() {
    return (
        <>
            <title>Columbia Merchant | Local Transfer</title>
            <UserPageHeader
                cardHeader='Local Transfer'
                headerDetail='Send money to any Columbia Merchant Bank securely and instantly'
                headerIcon={<IoIosSend />}
                to='/dashboard'
                linkIcon={<FaArrowLeft />}
                linkText="Back to Dashboard"
            />

            <TransferForm />

        </>
    )
}
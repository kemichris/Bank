import {AccountTypeCard} from "./AccountTypeCard";

import "../../styles/services/accountTypeSection.css";

export function AccountTypeSection({accountTypeName, accountTypeDescription, accountTypes}) {
    return (
        <div className="account-type-section">
            <h2>{accountTypeName}</h2>
            <p className="account-type-description">
                {accountTypeDescription}
            </p>
            <div className="account-type-cards">
                {accountTypes.map((accountType, index) => (
                    <AccountTypeCard
                        key={index}
                        icon={accountType.icon}
                        cardTypeName={accountType.cardTypeName}
                        description={accountType.description}
                        details={accountType.details}
                    />
                ))}
            </div>
        </div>
    );
}
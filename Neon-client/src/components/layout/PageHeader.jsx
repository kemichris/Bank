import "../../styles/layout/pageHeader.css";

export function PageHeader({ icon, header, title, description }) {
    return (
        <div className="page-header">
            <div className="page-icon">
                {icon}
                <h3>{header}</h3>
            </div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}
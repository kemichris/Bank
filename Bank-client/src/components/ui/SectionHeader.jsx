import "./SectionHeader.css"
export function SectionHeader({icon, title, style}) {
    return (
        <div className="section-header" style={style}>
            {icon}
            <h3>{title}</h3>
        </div>
    )
}
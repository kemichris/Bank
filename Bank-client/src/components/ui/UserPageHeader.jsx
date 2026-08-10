import { Link } from "react-router-dom"


export function UserPageHeader({cardHeader, headerDetail,headerIcon, linkIcon, linkText, to}) {
    return (
        <div className="mb-8 flex justify-between items-center">
            <div  className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-sky-500 w-fit text-text text-lg">
                    {headerIcon}
                </div>
                
                <div>
                    <h2 className='text-text text-left text-xl'>{cardHeader}</h2>
                    <p className="text-text-muted  text-sm">{headerDetail}</p>
                </div>
            </div>
            <Link to={to} className="hidden xl:flex lg:flex md:flex px-3 py-2 rounded-2xl bg-sky-500 items-center text-text gap-2 hover:scale-[.9] transition-transform">
                {linkIcon}
                {linkText}
            </Link>

        </div>
    )
}
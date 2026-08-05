import { ProgressBar } from './ProgressBar';


export function RegisterLayout({ children,step }) {
    return (
            <div className='register-container'>
                <div className='register-card'>

                    <ProgressBar step={step} />

                    {children}

                </div>
            </div>
    );
}
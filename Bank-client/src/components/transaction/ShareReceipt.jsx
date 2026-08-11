import {
    FaDownload,
    FaShareAlt,
} from 'react-icons/fa';

import { toPng } from 'html-to-image';

export function ShareReceipt({
    receiptRef,
    transaction,
}) {
    const generateReceipt = async () => {
    if (!receiptRef.current) {
        console.error('Receipt element not found.');
        return null;
    }

    try {
        return await toPng(receiptRef.current, {
            cacheBust: true,
            pixelRatio: 2,
            backgroundColor: '#ffffff',
        });
    } catch (error) {
        console.error(
            'Receipt generation failed:',
            error
        );

        return null;
    }
};


    const downloadReceipt = async () => {
        const dataUrl =
            await generateReceipt();

        if (!dataUrl) {
            return;
        }

        const link =
            document.createElement('a');

        link.href = dataUrl;

        link.download =
            `transaction-${transaction.reference}.png`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    };


    const shareReceipt = async () => {
        const dataUrl =
            await generateReceipt();

        if (!dataUrl) {
            return;
        }

        try {
            const response =
                await fetch(dataUrl);

            const blob =
                await response.blob();

            const file = new File(
                [blob],
                `transaction-${transaction.reference}.png`,
                {
                    type: 'image/png',
                }
            );

            if (
                navigator.share &&
                navigator.canShare &&
                navigator.canShare({
                    files: [file],
                })
            ) {
                await navigator.share({
                    title: 'Transaction Receipt',
                    text: 'Transaction Receipt',
                    files: [file],
                });

                return;
            }

            /*
             * If the browser does not support
             * sharing files, download instead.
             */

            await downloadReceipt();

        } catch (error) {
            if (
                error.name !== 'AbortError'
            ) {
                console.error(
                    'Share receipt failed:',
                    error
                );
            }
        }
    };


    return (
        <div
            className="
                flex
                gap-3
                border-t
                border-border
                bg-surface-2
                px-6
                py-4
            "
        >

            <button
                type="button"
                onClick={downloadReceipt}
                className="
                    flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-primary
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:opacity-90
                "
            >
                <FaDownload size={13} />

                Download Receipt
            </button>


            <button
                type="button"
                onClick={shareReceipt}
                className="
                    flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-surface-3
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-text
                    transition
                    hover:opacity-80
                "
            >
                <FaShareAlt size={13} />

                Share Receipt
            </button>

        </div>
    );
}
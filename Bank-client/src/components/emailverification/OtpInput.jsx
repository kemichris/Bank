import { useRef } from 'react';

export function OtpInput({ value, onChange }) {
    const inputRefs = useRef([]);

    const handleChange = (index, digit) => {
        if (!/^\d?$/.test(digit)) return;

        const newValue = [...value];
        newValue[index] = digit;

        onChange(newValue);

        if (digit && index < value.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (
            event.key === 'Backspace' &&
            !value[index] &&
            index > 0
        ) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex justify-center gap-3">
            {value.map((digit, index) => (
                <input
                    key={index}
                    ref={(element) => {
                        inputRefs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(event) =>
                        handleChange(index, event.target.value)
                    }
                    onKeyDown={(event) =>
                        handleKeyDown(index, event)
                    }
                    className="
                        h-12
                        w-11
                        rounded-lg
                        border
                        border-border
                        bg-surface-2
                        text-center
                        text-lg
                        font-semibold
                        text-text
                        outline-none
                        transition
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/20
                    "
                />
            ))}
        </div>
    );
}
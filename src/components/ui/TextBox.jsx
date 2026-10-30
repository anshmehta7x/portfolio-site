"use client";

// FireRed-style dialog box. Pass `onActivate` to make the whole box a
// tappable/clickable button (acts like pressing A).
export default function TextBox({ lines, onActivate, showMoreArrow = true, className = "" }) {
    const content = (
        <>
            {lines.map((line) => (
                <p key={line} className="leading-snug">
                    {line}
                </p>
            ))}
            {showMoreArrow && (
                <span aria-hidden="true" className="fr-more-arrow fr-nudge absolute right-3 bottom-2 text-sm">
                    ▼
                </span>
            )}
        </>
    );

    const boxClasses = `fr-box relative w-full px-4 py-3 pr-8 text-left text-lg sm:text-2xl ${className}`;

    if (onActivate) {
        return (
            <button type="button" onClick={onActivate} className={`${boxClasses} min-h-[44px] cursor-pointer`}>
                {content}
            </button>
        );
    }
    return <div className={boxClasses}>{content}</div>;
}

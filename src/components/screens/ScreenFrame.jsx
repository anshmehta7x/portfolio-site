"use client";

// Shared shell for every content screen: coloured FireRed header, a visible
// "B Back" button (44px), and a scrollable paper body. Desktop renders inside
// the console screen (isConstrained); phones get the full viewport.
export default function ScreenFrame({ title, accent, isConstrained, onClose, children, footer }) {
    const position = isConstrained ? "absolute inset-0" : "fixed inset-0";
    return (
        <section
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={`${position} z-50 flex flex-col bg-[#e8e4d8] font-pixeboy text-[var(--fr-ink)]`}
        >
            <header
                className="flex items-center justify-between gap-2 border-b-4 border-black/30 px-3 py-1 text-white sm:px-4"
                style={{ backgroundColor: accent }}
            >
                <h2 className="text-2xl tracking-wide [text-shadow:2px_2px_0_rgba(0,0,0,0.35)] sm:text-3xl">{title}</h2>
                <button
                    type="button"
                    onClick={onClose}
                    className="flex min-h-[44px] items-center gap-2 rounded-md px-2 text-lg hover:bg-black/15 sm:text-xl"
                >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-black/30 text-base">
                        B
                    </span>
                    BACK
                </button>
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto p-2 sm:p-4">{children}</div>
            {footer && <footer className="whitespace-pre-wrap border-t-2 border-black/10 px-3 py-2 text-sm opacity-80 sm:text-base">{footer}</footer>}
        </section>
    );
}

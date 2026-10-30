// FireRed's black ▶ selection cursor, drawn as SVG (the pixel font has no ▶).
export default function Cursor({ visible = true, className = "" }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 6 10"
            className={`h-3 w-2 shrink-0 fill-current ${visible ? "" : "invisible"} ${className}`}
        >
            <polygon points="0,0 6,5 0,10" />
        </svg>
    );
}

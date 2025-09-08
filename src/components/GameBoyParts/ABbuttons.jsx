export default function ABbuttons({handleMouseUp, handleMouseDown, handleTouchStart, handleTouchEnd, pressedButton}) {
    return (
        <div className="absolute right-[6%] bottom-[21%] w-28 h-16">
            <div
                className={`${
                    pressedButton === "b"
                        ? "bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-[inset_2px_4px_8px_0_rgba(0,0,0,0.8),inset_1px_2px_1px_0_rgba(255,255,255,0.05)]"
                        : "bg-gradient-to-br from-neutral-700 to-neutral-800 shadow-[inset_1px_2px_1px_0_rgba(255,255,255,0.15),2px_2px_1px_0_rgba(0,0,0,0.25)]"
                } rounded-full w-12 h-12 absolute bottom-0 border-4 border-solid border-black border-b-2 transition-all duration-75 cursor-pointer select-none`}
                onMouseDown={(e) => handleMouseDown("b", e)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={(e) => handleTouchStart("b", e)}
                onTouchEnd={handleTouchEnd}
            >
                        <span
                            className={`font-bold text-white absolute ${
                                pressedButton === "b" ? "bottom-0" : "bottom-1"
                            } left-1/2 transform -translate-x-1/2 text-xl transition-all duration-75`}
                        >
                            B
                        </span>
            </div>
            <div
                className={`${
                    pressedButton === "a"
                        ? "bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-[inset_2px_4px_8px_0_rgba(0,0,0,0.8),inset_1px_2px_1px_0_rgba(255,255,255,0.05)]"
                        : "bg-gradient-to-br from-neutral-700 to-neutral-800 shadow-[inset_1px_2px_1px_0_rgba(255,255,255,0.15),2px_2px_1px_0_rgba(0,0,0,0.25)]"
                } rounded-full h-12 w-12 absolute right-0 border-4 border-solid border-black border-b-2 transition-all duration-75 cursor-pointer select-none`}
                onMouseDown={(e) => handleMouseDown("a", e)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={(e) => handleTouchStart("a", e)}
                onTouchEnd={handleTouchEnd}
            >
                        <span
                            className={`font-bold text-white absolute ${
                                pressedButton === "a" ? "bottom-0" : "bottom-1"
                            } left-1/2 transform -translate-x-1/2 text-xl transition-all duration-75`}
                        >
                            A
                        </span>
            </div>
        </div>

    )
}
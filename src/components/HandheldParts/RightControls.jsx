
export default function RightControls({ pressedButton, handleMouseDown, handleMouseUp, handleTouchStart, handleTouchEnd }) {
    return (
        <div className="flex flex-col items-center justify-center space-y-16 w-36">
            <div className="flex flex-col items-center space-y-3">
                <div
                    className={`${pressedButton === "start"
                        ? "bg-gradient-to-b from-slate-900 to-violet-800 shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.8)]"
                        : "bg-gradient-to-b from-slate-800 to-violet-700 shadow-[0_2px_4px_0_rgba(0,0,0,0.3)]"}
                        w-20 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-100 border-2 border-black`}
                    onMouseDown={(e) => handleMouseDown("start", e)}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={(e) => handleTouchStart("start", e)}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        className={`bg-gradient-to-b from-neutral-700 via-neutral-600 to-neutral-900 ${
                            pressedButton === "start"
                                ? "shadow-[inset_-1px_-1px_6px_0_rgba(0,0,0,1)]"
                                : "shadow-[inset_-2px_-1px_10px_0_rgba(0,0,0,1)]"
                        } w-[90%] h-[70%] rounded-full transition-all duration-100`}
                    ></div>
                </div>
                <div className="text-violet-300 text-sm font-bold tracking-wider">
                    CONTACT
                </div>
            </div>
            <div className="relative w-40 h-20">
                <div
                    className={`${pressedButton === "b"
                        ? "bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-[inset_2px_4px_8px_0_rgba(0,0,0,0.8),inset_1px_2px_1px_0_rgba(255,255,255,0.05)]"
                        : "bg-gradient-to-br from-neutral-700 to-neutral-800 shadow-[inset_1px_2px_1px_0_rgba(255,255,255,0.15),2px_2px_1px_0_rgba(0,0,0,0.25)]"}
                        absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full cursor-pointer transition-all duration-100 border-4 border-black border-b-2 flex items-center justify-center select-none`}
                    onMouseDown={(e) => handleMouseDown("b", e)}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={(e) => handleTouchStart("b", e)}
                    onTouchEnd={handleTouchEnd}
                >
                    <span
                        className={`font-bold text-white absolute ${
                            pressedButton === "b" ? "bottom-0" : "bottom-1"
                        } left-1/2 transform -translate-x-1/2 text-2xl transition-all duration-75`}
                    >
                        B
                    </span>
                </div>
                <div
                    className={`${pressedButton === "a"
                        ? "bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-[inset_2px_4px_8px_0_rgba(0,0,0,0.8),inset_1px_2px_1px_0_rgba(255,255,255,0.05)]"
                        : "bg-gradient-to-br from-neutral-700 to-neutral-800 shadow-[inset_1px_2px_1px_0_rgba(255,255,255,0.15),2px_2px_1px_0_rgba(0,0,0,0.25)]"}
                        absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full cursor-pointer transition-all duration-100 border-4 border-black border-b-2 flex items-center justify-center select-none`}
                    onMouseDown={(e) => handleMouseDown("a", e)}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={(e) => handleTouchStart("a", e)}
                    onTouchEnd={handleTouchEnd}
                >
                    <span
                        className={`font-bold text-white absolute ${
                            pressedButton === "a" ? "bottom-0" : "bottom-1"
                        } left-1/2 transform -translate-x-1/2 text-2xl transition-all duration-75`}
                    >
                        A
                    </span>
                </div>
            </div>
        </div>
    );
}

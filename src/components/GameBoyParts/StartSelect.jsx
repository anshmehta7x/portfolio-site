export default function StartSelect({handleMouseUp, handleMouseDown, handleTouchStart, handleTouchEnd, pressedButton}) {
    return (
        <div className="absolute bottom-[4%] flex space-x-4">
            <div className="flex flex-col items-center">
                <div
                    className={`${
                        pressedButton === "help"
                            ? "bg-gradient-to-b from-slate-900 to-violet-800 shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.8)]"
                            : "bg-gradient-to-b from-slate-800 to-violet-700 shadow-[0_2px_4px_0_rgba(0,0,0,0.3)]"
                    } w-12 h-5 rounded-full flex items-center justify-center cursor-pointer transition-all duration-75`}
                    onMouseDown={(e) => handleMouseDown("help", e)}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={(e) => handleTouchStart("help", e)}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        className={`bg-gradient-to-b from-neutral-700 via-neutral-600 to-neutral-900 ${
                            pressedButton === "help"
                                ? "shadow-[inset_-1px_-1px_6px_0_rgba(0,0,0,1)]"
                                : "shadow-[inset_-2px_-1px_10px_0_rgba(0,0,0,1)]"
                        } w-[90%] h-[70%] rounded-full transition-all duration-75`}
                    ></div>
                </div>
                <div className="text-violet-700 text-sm">HELP</div>
            </div>
            <div className="flex flex-col items-center">
                <div
                    className={`${
                        pressedButton === "start"
                            ? "bg-gradient-to-b from-slate-900 to-violet-800 shadow-[inset_0_2px_8px_0_rgba(0,0,0,0.8)]"
                            : "bg-gradient-to-b from-slate-800 to-violet-700 shadow-[0_2px_4px_0_rgba(0,0,0,0.3)]"
                    } w-12 h-5 rounded-full flex items-center justify-center cursor-pointer transition-all duration-75`}
                    onMouseDown={(e) => handleMouseDown("start", e)}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={(e) => handleTouchStart("start", e)}
                    onTouchEnd={handleMouseUp}
                >
                    <div
                        className={`bg-gradient-to-b from-neutral-700 via-neutral-600 to-neutral-900 ${
                            pressedButton === "start"
                                ? "shadow-[inset_-1px_-1px_6px_0_rgba(0,0,0,1)]"
                                : "shadow-[inset_-2px_-1px_10px_0_rgba(0,0,0,1)]"
                        } w-[90%] h-[70%] rounded-full transition-all duration-75`}
                    ></div>
                </div>
                <div className="text-violet-700 text-sm">CONTACT</div>
            </div>
        </div>

    )
}
export default function Dpad({handleMouseUp, handleMouseDown, handleTouchStart, handleTouchEnd, pressedButton}) {
    return(
        <div className="absolute left-[7%] bottom-[18%] h-[8rem] w-[8rem]">
            <div className="bg-black rounded-md w-10 h-full absolute left-1/2 transform -translate-x-1/2"></div>
            <div className="bg-black rounded-md h-10 w-full absolute top-1/2 transform -translate-y-1/2"></div>
            <div className="bg-gradient-to-b from-neutral-800 to-neutral-700 rounded-sm w-7 h-full absolute left-1/2 transform -translate-x-1/2 border-t-4 border-b-4 border-solid border-black shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.3),inset_0_-2px_4px_0_rgba(0,0,0,0.8)]"></div>
            <div className="bg-gradient-to-r from-neutral-800 to-neutral-700 rounded-sm h-7 w-full absolute top-1/2 transform -translate-y-1/2 border-l-4 border-r-4 border-solid border-black shadow-[inset_2px_0_4px_0_rgba(255,255,255,0.3),inset_-2px_0_4px_0_rgba(0,0,0,0.8)]"></div>
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-full w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-[inset_2px_2px_4px_0_rgba(0,0,0,0.75),2px_2px_4px_0_rgba(255,255,255,.2)] z-10"></div>
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[calc(50%-10px)] cursor-pointer z-20 rounded-t-md"
                onMouseDown={(e) => handleMouseDown("up", e)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={(e) => handleTouchStart("up", e)}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className={`absolute top-[10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-solid border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[16px] ${
                        pressedButton === "up"
                            ? "border-b-neutral-600 shadow-none"
                            : "border-b-neutral-900 shadow-[0_1px_0_0_rgba(255,255,255,.2)]"
                    } transition-all duration-75 pointer-events-none`}
                ></div>
            </div>
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[calc(50%-10px)] cursor-pointer z-20 rounded-b-md"
                onMouseDown={(e) => handleMouseDown("down", e)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={(e) => handleTouchStart("down", e)}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className={`absolute bottom-[10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-solid border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[16px] ${
                        pressedButton === "down"
                            ? "border-t-neutral-600 shadow-none"
                            : "border-t-neutral-800 shadow-[0_-1px_0_0_rgba(255,255,255,.2)]"
                    } transition-all duration-75 pointer-events-none`}
                ></div>
            </div>
            <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-[calc(50%-10px)] cursor-pointer z-20 rounded-l-md"
                onMouseDown={(e) => handleMouseDown("left", e)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={(e) => handleTouchStart("left", e)}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className={`absolute left-[10px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-solid border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[16px] ${
                        pressedButton === "left"
                            ? "border-r-neutral-600 shadow-none"
                            : "border-r-neutral-900 shadow-[1px_0_0_0_rgba(255,255,255,.2)]"
                    } transition-all duration-75 pointer-events-none`}
                ></div>
            </div>
            <div
                className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-[calc(50%-10px)] cursor-pointer z-20 rounded-r-md"
                onMouseDown={(e) => handleMouseDown("right", e)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={(e) => handleTouchStart("right", e)}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className={`absolute right-[10px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-solid border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[16px] ${
                        pressedButton === "right"
                            ? "border-l-neutral-600 shadow-none"
                            : "border-l-neutral-800 shadow-[-1px_0_0_0_rgba(255,255,255,.2)]"
                    } transition-all duration-75 pointer-events-none`}
                ></div>
            </div>
        </div>

    )
}
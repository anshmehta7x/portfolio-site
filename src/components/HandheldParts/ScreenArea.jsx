import GameCanvas from "@/components/GameCanvas";
import ScreenHost from "@/components/screens/ScreenHost";

export default function ScreenArea({ screen, openScreen, closeScreen }) {
    return (
        <div className="flex-1 h-full min-w-0 flex flex-col items-center justify-center mx-6">
            <div className="w-full flex-1 min-h-0 bg-bezel rounded-2xl p-6 border-4 border-bezel-light shadow-[inset_0_2px_0_rgba(255,255,255,0.08)]">
                <div className="relative w-full h-full bg-black rounded-md overflow-hidden">
                    <GameCanvas openScreen={openScreen} />
                    <ScreenHost screen={screen} onClose={closeScreen} isConstrained />
                </div>
            </div>
            <div aria-hidden="true" className="flex gap-3 mt-5">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="w-1.5 h-8 bg-shell-dark rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)]"
                    />
                ))}
            </div>
        </div>
    );
}

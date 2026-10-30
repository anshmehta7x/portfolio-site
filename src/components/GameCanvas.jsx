import {Canvas} from "@react-three/fiber";
import {RoomModel} from "@/assets/RoomModel";
import {PlayerModel} from "@/assets/PlayerModel";
import {Suspense, useCallback, useRef, useState} from "react";
import {animated, useSpring} from "@react-spring/three";
import useSound from "use-sound";
import {RoomCamera} from "@/lib/cameraUtils";
import {cameraSpawn} from "@/lib/constants";
import {findPath, getFacingRotation, getInteraction, getInteractionAt, getShortestRotation} from "@/lib/grid";
import {useGameInput} from "@/hooks/useGameInput";
import usePlayerMovement, {STEP_MS} from "@/hooks/usePlayerMovement";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import {DIRECTIONS, INPUT_PRIORITY} from "@/lib/input";
import {INTERACTION_SCREENS} from "@/components/screens/ScreenHost";
import GridDebug from "@/components/GridDebug";
import FloorPicker from "@/components/FloorPicker";
import InteractionMarkers from "@/components/hints/InteractionMarkers";
import ControlsLegend from "@/components/hints/ControlsLegend";
import TextBox from "@/components/ui/TextBox";
import useCoarsePointer from "@/hooks/useCoarsePointer";
import {ROOM_OBJECT_HINTS} from "@/data/roomObjects";

const collisionsound = "/sounds/collisionsound.mp3";

const SCREEN_FOR_BUTTON = {
    start: "contact",
    select: "help",
};

export default function GameCanvas({ openScreen }) {
    const [interactionType, setInteractionType] = useState(null);
    const [collisionSoundPlay] = useSound(collisionsound);
    const reducedMotion = usePrefersReducedMotion();
    const coarsePointer = useCoarsePointer();
    const [showGrid] = useState(
        () => typeof window !== "undefined" && window.location.search.includes("debug=grid"),
    );

    const { tile, facing, isWalking, pressDirection, releaseDirection, walkPath, face, getTile } = usePlayerMovement({
        onBump: collisionSoundPlay,
        onStep: (next) => setInteractionType(getInteractionAt(next)),
    });

    // Keep turning the short way round (e.g. left -> up never spins 270deg).
    const rotationRef = useRef(getFacingRotation(facing));
    rotationRef.current = getShortestRotation(rotationRef.current, getFacingRotation(facing));

    const { pos, rot } = useSpring({
        pos: [tile.x, 0, tile.y],
        rot: [0, rotationRef.current, 0],
        immediate: reducedMotion,
        config: (key) => (key === "pos" ? { duration: STEP_MS } : { duration: 90 }),
    });

    const handleInteract = useCallback(() => {
        if (interactionType) {
            openScreen(INTERACTION_SCREENS[interactionType]);
        }
    }, [interactionType, openScreen]);

    useGameInput(
        (event) => {
            const { button, type } = event;
            if (DIRECTIONS.includes(button)) {
                if (type === "press") {
                    pressDirection(button);
                } else {
                    releaseDirection(button);
                }
                return true;
            }
            if (type !== "press") {
                return false;
            }
            if (button === "a") {
                handleInteract();
            } else if (SCREEN_FOR_BUTTON[button]) {
                openScreen(SCREEN_FOR_BUTTON[button]);
            }
            return true;
        },
        { priority: INPUT_PRIORITY.GAME },
    );

    // Click/tap an object: walk to the nearest tile it can be checked from,
    // turn to face it, then open its screen.
    const handleClickInteraction = useCallback(
        (type) => {
            const interaction = getInteraction(type);
            const goals = interaction.positions.map(([x, y]) => ({ x, y }));
            const path = findPath(getTile(), goals);
            if (!path) {
                collisionSoundPlay();
                return;
            }
            walkPath(path, () => {
                face(interaction.facing);
                openScreen(INTERACTION_SCREENS[type]);
            });
        },
        [getTile, walkPath, face, openScreen, collisionSoundPlay],
    );

    const handleFloorPick = useCallback(
        (target) => {
            const path = findPath(getTile(), [target]);
            if (path) {
                walkPath(path);
            } else {
                collisionSoundPlay();
            }
        },
        [getTile, walkPath, collisionSoundPlay],
    );

    return (
        <section className="relative h-full w-full">
            <div className="absolute inset-0">
                <Canvas camera={cameraSpawn}>
                    <Suspense fallback={null}>
                        <FloorPicker onPick={handleFloorPick} />
                        <RoomModel
                            interactionType={interactionType}
                            onInteraction={handleClickInteraction}
                        />
                        <animated.group position={pos} rotation={rot}>
                            <PlayerModel isMoving={isWalking} />
                        </animated.group>
                        <InteractionMarkers
                            activeType={isWalking ? null : interactionType}
                            onSelect={handleClickInteraction}
                        />
                        {showGrid && <GridDebug />}
                        <RoomCamera playerPosition={pos} reducedMotion={reducedMotion} />
                    </Suspense>
                </Canvas>
            </div>
            <ControlsLegend coarse={coarsePointer} hidden={!!interactionType && !isWalking} />
            {interactionType && !isWalking && (
                <div className="absolute inset-x-2 bottom-2 z-20 sm:inset-x-4 sm:bottom-4">
                    <TextBox
                        lines={[
                            ROOM_OBJECT_HINTS[interactionType],
                            `${coarsePointer ? "Tap" : "Press"} A to check it.`,
                        ]}
                        onActivate={handleInteract}
                    />
                </div>
            )}
        </section>
    );
}

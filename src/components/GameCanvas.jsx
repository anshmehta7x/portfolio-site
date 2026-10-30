import {OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {RoomModel} from "@/assets/RoomModel";
import {PlayerModel} from "@/assets/PlayerModel";
import {Suspense, useCallback, useState} from "react";
import {animated, useSpring} from "@react-spring/three";
import useSound from "use-sound";
import {FollowCamera, getOrientationFromDirection, getRelativeDirection, getShortestRotation} from "@/lib/cameraUtils";
import {cameraSpawn, collisions, defaultOrientation, interactions, limits, playerSpawn} from "@/lib/constants";
import {useGameInput} from "@/hooks/useGameInput";
import {INPUT_PRIORITY} from "@/lib/input";
import {INTERACTION_SCREENS} from "@/components/screens/ScreenHost";

const collisionsound = "/sounds/collisionsound.mp3";

const SCREEN_FOR_BUTTON = {
    start: "contact",
    select: "help",
};

const DIRECTION_TO_MOVE = { up: "front", down: "back", left: "left", right: "right" };

export default function GameCanvas({ openScreen }) {
    const [currX, setCurrX] = useState(playerSpawn[0]);
    const [currY, setCurrY] = useState(playerSpawn[1]);
    const [isMoving, setIsMoving] = useState(false);
    const [interactionType, setInteractionType] = useState(null);
    const [currentDirection, setCurrentDirection] = useState(2);
    const [orientation, setOrientation] = useState(defaultOrientation);

    const [collisionSoundPlay] = useSound(collisionsound);

    const checkInteractions = useCallback((x, y) => {
        const interaction = interactions.find((interaction) =>
            interaction.positions.some(
                (position) => position[0] === x && position[1] === y,
            ),
        );
        return interaction ? interaction.type : null;
    }, []);

    const { pos, rot } = useSpring({
        pos: [currX, 0, currY],
        rot: orientation,
        config: {
            tension: 120,
            friction: 25,
            duration: undefined,
        },
    });

    const handleInteract = useCallback(() => {
        if (interactionType) {
            openScreen(INTERACTION_SCREENS[interactionType]);
            setInteractionType(null);
        }
    }, [interactionType, openScreen]);


    const handleMove = useCallback(
        (inputDirection) => {
            if (isMoving) return;

            if (inputDirection === "front") {
                const actualDirection = getRelativeDirection(
                    inputDirection,
                    currentDirection,
                );

                let newX = currX;
                let newY = currY;

                switch (actualDirection) {
                    case 1:
                        newY = currY + 1;
                        break;
                    case 2:
                        newY = currY - 1;
                        break;
                    case 3:
                        newX = currX - 1;
                        break;
                    case 4:
                        newX = currX + 1;
                        break;
                    default:
                        break;
                }

                if (
                    newX < limits.x[0] ||
                    newX > limits.x[1] ||
                    newY < limits.y[0] ||
                    newY > limits.y[1]
                ) {
                    collisionSoundPlay();
                    return;
                }

                const isCollision = collisions.some(
                    ([x, y]) => x === newX && y === newY,
                );

                if (!isCollision) {
                    setIsMoving(true);

                    setCurrX(newX);
                    setCurrY(newY);

                    const interaction = checkInteractions(newX, newY);
                    if (interaction) {
                        setInteractionType(interaction);
                    } else {
                        setInteractionType(null);
                    }

                    setTimeout(() => {
                        setIsMoving(false);
                    }, 400);
                } else {
                    collisionSoundPlay();
                }
            } else {
                const actualDirection = getRelativeDirection(
                    inputDirection,
                    currentDirection,
                );

                if (actualDirection !== currentDirection) {
                    const newOrientation =
                        getOrientationFromDirection(actualDirection);

                    const shortestY = getShortestRotation(
                        rot.get()[1],
                        newOrientation[1],
                    );

                    setOrientation([0, shortestY, 0]);
                    setCurrentDirection(actualDirection);
                }
            }
        },
        [
            currX,
            currY,
            currentDirection,
            isMoving,
            collisionSoundPlay,
            checkInteractions,
            rot,
        ],
    );

    useGameInput(
        (event) => {
            if (event.type !== "press") {
                return false;
            }
            const { button } = event;
            if (DIRECTION_TO_MOVE[button]) {
                handleMove(DIRECTION_TO_MOVE[button]);
            } else if (button === "a") {
                handleInteract();
            } else if (SCREEN_FOR_BUTTON[button]) {
                openScreen(SCREEN_FOR_BUTTON[button]);
            }
            return true;
        },
        { priority: INPUT_PRIORITY.GAME },
    );

    const handleClickInteraction = useCallback(
        (type) => {
            openScreen(INTERACTION_SCREENS[type]);
            setInteractionType(null);
        },
        [openScreen],
    );

    return (
        <section className="relative h-full w-full">
            <div className="absolute inset-0">
                <Canvas camera={cameraSpawn}>
                    <OrbitControls enabled={false} />
                    <Suspense fallback={null}>
                        <RoomModel
                            interactions={interactions}
                            interactionType={interactionType}
                            onInteraction={handleClickInteraction}
                        />
                        <animated.group position={pos} rotation={rot}>
                            <PlayerModel isMoving={isMoving} />
                        </animated.group>
                        <FollowCamera
                            playerPosition={pos.get()}
                            playerRotation={rot.get()}
                            isMoving={isMoving}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
}

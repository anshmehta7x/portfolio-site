import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { RoomModel } from "@/assets/RoomModel";
import { PlayerModel } from "@/assets/PlayerModel";
import { Suspense, useEffect, useState, useCallback } from "react";
import { useSpring, animated } from "@react-spring/three";
import useSound from "use-sound";
import {FollowCamera, getShortestRotation, getRelativeDirection, getOrientationFromDirection} from "@/lib/cameraUtils";
import {collisions, limits, interactions, cameraSpawn, playerSpawn, defaultOrientation} from "@/lib/constants";

const collisionsound = "/sounds/collisionsound.mp3";

export default function GameCanvas({
    setAchievementsVisibility,
    setResumeVisibility,
    setSkillsVisibility,
    gbaPress,
    setGbaPress,
    setProjectsVisibility,
    setContactVisibility,
}) {
    const [currX, setCurrX] = useState(playerSpawn[0]);
    const [currY, setCurrY] = useState(playerSpawn[1]);
    const [isMoving, setIsMoving] = useState(false);
    const [computerTint, setComputerTint] = useState(false);
    const [interactionType, setInteractionType] = useState(null);
    const [currentDirection, setCurrentDirection] = useState(2);
    const [orientation, setOrientation] = useState(defaultOrientation);

    const [collisionSoundPlay] = useSound(collisionsound);

    const checkInteractions = (x, y) => {
        const interaction = interactions.find((interaction) =>
            interaction.positions.some(
                (position) => position[0] === x && position[1] === y,
            ),
        );
        return interaction ? interaction.type : null;
    };


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
            if (interactionType === "certificate") {
                setAchievementsVisibility((prevVisibility) => !prevVisibility);
            } else if (interactionType === "computer") {
                setResumeVisibility((prevVisibility) => !prevVisibility);
            } else if (interactionType === "bookshelf") {
                setSkillsVisibility((prevVisibility) => !prevVisibility);
            } else if (interactionType === "television") {
                setProjectsVisibility((prevVisibility) => !prevVisibility);
            }
            setInteractionType(null);
        }
    }, [
        interactionType,
        setAchievementsVisibility,
        setResumeVisibility,
        setSkillsVisibility,
        setProjectsVisibility,
    ]);


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

                    setAchievementsVisibility(false);
                    setResumeVisibility(false);
                    setSkillsVisibility(false);

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
            limits.x,
            limits.y,
            collisions,
            setAchievementsVisibility,
            setResumeVisibility,
            setSkillsVisibility,
            collisionSoundPlay,
            checkInteractions,
            rot,
        ],
    );

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isMoving) return;
            switch (event.key) {
                case "ArrowUp":
                case "w":
                    handleMove("front");
                    break;
                case "ArrowDown":
                case "s":
                    handleMove("back");
                    break;
                case "ArrowLeft":
                case "a":
                    handleMove("left");
                    break;
                case "ArrowRight":
                case "d":
                    handleMove("right");
                    break;
                case "Enter":
                case "e":
                    handleInteract();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleMove, handleInteract, isMoving]);

    useEffect(() => {
        if (!gbaPress || isMoving) return;

        switch (gbaPress) {
            case "up":
                handleMove("front");
                break;
            case "down":
                handleMove("back");
                break;
            case "left":
                handleMove("left");
                break;
            case "right":
                handleMove("right");
                break;
            case "a":
                handleInteract();
                break;
            case "start":
                setContactVisibility((prevVisibility) => !prevVisibility);
            default:
                break;
        }
        setGbaPress("");
    }, [gbaPress, handleMove, handleInteract, setGbaPress, isMoving]);

    function handleClickInteraction(type) {
        if (type === "certificate") {
            setAchievementsVisibility((prevVisibility) => !prevVisibility);
        } else if (type === "computer") {
            setResumeVisibility((prevVisibility) => !prevVisibility);
        } else if (type === "bookshelf") {
            setSkillsVisibility((prevVisibility) => !prevVisibility);
        } else if (type === "television") {
            setProjectsVisibility((prevVisibility) => !prevVisibility);
        }
        setInteractionType(null);
    }

    return (
        <section className="flex h-full w-full">
            <div className="p-2 w-full md:h-[80vh] border-red-500">
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

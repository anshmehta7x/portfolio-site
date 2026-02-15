import { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";
import { 
    getOrientationFromDirection, 
    getRelativeDirection, 
    getShortestRotation 
} from "@/lib/cameraUtils";
import { 
    cameraSpawn, 
    collisions, 
    defaultOrientation, 
    interactions, 
    limits, 
    playerSpawn
} from "@/lib/constants";

const COLLISION_SOUND = "/sounds/collisionsound.mp3";

export function useGameState({
    setAchievementsVisibility,
    setResumeVisibility,
    setSkillsVisibility,
    setProjectsVisibility,
    setContactVisibility,
}) {
    const [currX, setCurrX] = useState(playerSpawn[0]);
    const [currY, setCurrY] = useState(playerSpawn[1]);
    const [isMoving, setIsMoving] = useState(false);
    const [interactionType, setInteractionType] = useState(null);
    const [currentDirection, setCurrentDirection] = useState(2);
    const [orientation, setOrientation] = useState(defaultOrientation);

    const [collisionSoundPlay] = useSound(COLLISION_SOUND);

    const checkInteractions = useCallback((x, y) => {
        const interaction = interactions.find((interaction) =>
            interaction.positions.some(
                (position) => position[0] === x && position[1] === y,
            ),
        );
        return interaction ? interaction.type : null;
    }, []);

    const handleInteract = useCallback(() => {
        if (interactionType) {
            if (interactionType === "certificate") {
                setAchievementsVisibility((prev) => !prev);
            } else if (interactionType === "computer") {
                setResumeVisibility((prev) => !prev);
            } else if (interactionType === "bookshelf") {
                setSkillsVisibility((prev) => !prev);
            } else if (interactionType === "television") {
                setProjectsVisibility((prev) => !prev);
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
        (inputDirection, rotY = 0) => {
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

                // Boundary check
                if (
                    newX < limits.x[0] ||
                    newX > limits.x[1] ||
                    newY < limits.y[0] ||
                    newY > limits.y[1]
                ) {
                    collisionSoundPlay();
                    return;
                }

                // Collision check
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
                // Rotation
                const actualDirection = getRelativeDirection(
                    inputDirection,
                    currentDirection,
                );

                if (actualDirection !== currentDirection) {
                    const newOrientation =
                        getOrientationFromDirection(actualDirection);

                    const shortestY = getShortestRotation(
                        rotY,
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
            setAchievementsVisibility,
            setResumeVisibility,
            setSkillsVisibility,
            collisionSoundPlay,
            checkInteractions,
        ],
    );

    return {
        // Position state
        currX,
        currY,
        isMoving,
        interactionType,
        currentDirection,
        orientation,
        setOrientation,
        setInteractionType,
        // Actions
        handleInteract,
        handleMove,
        checkInteractions,
    };
}

export function useKeyboardControls({ handleMove, handleInteract, isMoving }) {
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
}

export function useGBAControls({
    gbaPress,
    handleMove,
    handleInteract,
    setGbaPress,
    isMoving,
    setContactVisibility,
}) {
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
                setContactVisibility((prev) => !prev);
            default:
                break;
        }
        setGbaPress("");
    }, [gbaPress, handleMove, handleInteract, setGbaPress, isMoving, setContactVisibility]);
}

export function useClickInteraction({
    interactionType,
    setAchievementsVisibility,
    setResumeVisibility,
    setSkillsVisibility,
    setProjectsVisibility,
    setInteractionType,
}) {
    return useCallback(
        (type) => {
            if (type === "certificate") {
                setAchievementsVisibility((prev) => !prev);
            } else if (type === "computer") {
                setResumeVisibility((prev) => !prev);
            } else if (type === "bookshelf") {
                setSkillsVisibility((prev) => !prev);
            } else if (type === "television") {
                setProjectsVisibility((prev) => !prev);
            }
            setInteractionType(null);
        },
        [
            setAchievementsVisibility,
            setResumeVisibility,
            setSkillsVisibility,
            setProjectsVisibility,
            setInteractionType,
        ],
    );
}

export { cameraSpawn };

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { RoomModel } from "@/assets/RoomModel";
import { PlayerModel } from "@/assets/PlayerModel";
import { Suspense } from "react";
import { animated, useSpring } from "@react-spring/three";
import { 
    FollowCamera,
    getOrientationFromDirection 
} from "@/lib/cameraUtils";
import { 
    useGameState, 
    useKeyboardControls, 
    useGBAControls, 
    useClickInteraction,
    cameraSpawn 
} from "@/lib/gameHooks";

export default function GameCanvas({
    setAchievementsVisibility,
    setResumeVisibility,
    setSkillsVisibility,
    gbaPress,
    setGbaPress,
    setProjectsVisibility,
    setContactVisibility,
}) {
    const {
        currX,
        currY,
        isMoving,
        interactionType,
        orientation,
        setOrientation,
        setInteractionType,
        handleInteract,
        handleMove,
    } = useGameState({
        setAchievementsVisibility,
        setResumeVisibility,
        setSkillsVisibility,
        setProjectsVisibility,
        setContactVisibility,
    });

    // Setup keyboard controls
    useKeyboardControls({ handleMove, handleInteract, isMoving });

    // Setup GBA controls
    useGBAControls({
        gbaPress,
        handleMove,
        handleInteract,
        setGbaPress,
        isMoving,
        setContactVisibility,
    });

    const handleClickInteraction = useClickInteraction({
        interactionType,
        setAchievementsVisibility,
        setResumeVisibility,
        setSkillsVisibility,
        setProjectsVisibility,
        setInteractionType,
    });

    const { pos, rot } = useSpring({
        pos: [currX, 0, currY],
        rot: orientation,
        config: {
            tension: 120,
            friction: 25,
            duration: undefined,
        },
    });

    // Get current rotation for camera
    const currentRotY = orientation[1];

    return (
        <section className="flex h-full w-full">
            <div className="p-2 w-full md:h-[80vh] border-red-500">
                <Canvas camera={cameraSpawn}>
                    <OrbitControls enabled={false} />
                    <Suspense fallback={null}>
                        <RoomModel
                            interactions={[]}
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

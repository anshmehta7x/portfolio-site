const collisions = [
    [-4.5, -2.5],
    [-3.5, -2.5],
    [-2.5, -2.5],
    [-1.5, -2.5],
    [-0.5, -2.5],
    [-4.5, 2.5],
    [-3.5, 2.5],
    [-4.5, 1.5],
    [-3.5, 1.5],
    [-3.5, 0.5],
    [-4.5, 0.5],
    [0.5, -0.5],
    [3.5, -2.5],
    [3.5, -1.5],
    [2.5, -1.5],
    [2.5, -2.5],
];

// positions: tiles Red stands on to check the object; facing: which way he
// turns to look at it when he arrives there by click/tap.
const interactions = [
    {
        type: "computer",
        positions: [[-4.5, -1.5]],
        facing: "up",
    },
    {
        type: "bookshelf",
        positions: [
            [-0.5, -1.5],
            [-1.5, -1.5],
        ],
        facing: "up",
    },
    {
        type: "television",
        positions: [
            [0.5, 1.5],
            [0.5, 0.5],
        ],
        facing: "up",
    },
    {
        type: "certificate",
        positions: [
            [5.5, -1.5],
            [5.5, -2.5],
        ],
        facing: "up",
    },
];

const limits = {
    x: [-4.5, 5.5],
    y: [-2.5, 3.5],
};

const cameraSpawn = { position: [0.5, 9, 8], fov: 40 }

const playerSpawn = [2.5,1.5] // x,y value to spawn player

const defaultOrientation = [0, Math.PI, 0]

export {collisions, interactions, limits, cameraSpawn, playerSpawn, defaultOrientation}
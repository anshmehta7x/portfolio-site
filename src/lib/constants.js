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

const interactions = [
    {
        type: "computer",
        positions: [[-4.5, -1.5]],
    },
    {
        type: "bookshelf",
        positions: [
            [-0.5, -1.5],
            [-1.5, -1.5],
        ],
    },
    {
        type: "television",
        positions: [
            [0.5, 1.5],
            [0.5, 0.5],
        ],
    },
    {
        type: "certificate",
        positions: [
            [5.5, -1.5],
            [5.5, -2.5],
        ],
    },
];

const limits = {
    x: [-4.5, 5.5],
    y: [-2.5, 3.5],
};

const cameraSpawn = { position: [5, 5, 8], fov: 60 }

const playerSpawn = [2.5,1.5] // x,y value to spawn player

const defaultOrientation = [0, Math.PI, 0]

export {collisions, interactions, limits, cameraSpawn, playerSpawn, defaultOrientation}
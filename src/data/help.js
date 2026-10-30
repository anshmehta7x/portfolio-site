// OPTIONS screen: controls reference and where each section lives in the room.
export const KEYBOARD_CONTROLS = [
    { key: "ARROWS / WASD", action: "Walk (tap to turn)" },
    { key: "CLICK", action: "Walk to a tile or object" },
    { key: "ENTER / E / Z", action: "Check (A)" },
    { key: "ESC / X / B", action: "Back (B)" },
    { key: "M", action: "Menu (START)" },
    { key: "H", action: "Options (SELECT)" },
];

export const TOUCH_CONTROLS = [
    { key: "D-PAD", action: "Walk (hold to keep walking)" },
    { key: "TAP", action: "Walk to a tile or object" },
    { key: "A", action: "Check" },
    { key: "B", action: "Back" },
    { key: "START / MENU", action: "Menu" },
];

export const ROOM_GUIDE = [
    { object: "PC", section: "Trainer Card: resume" },
    { object: "TV", section: "Pokedex: projects" },
    { object: "Bookshelf", section: "Moves: skills" },
    { object: "Certificate", section: "Badges: achievements" },
];

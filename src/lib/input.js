// Every on-screen button and keyboard key resolves to one of these GBA buttons.
export const BUTTONS = ["up", "down", "left", "right", "a", "b", "start", "select"];

export const DIRECTIONS = ["up", "down", "left", "right"];

const KEY_MAP = {
    ArrowUp: "up",
    w: "up",
    ArrowDown: "down",
    s: "down",
    ArrowLeft: "left",
    a: "left",
    ArrowRight: "right",
    d: "right",
    Enter: "a",
    " ": "a",
    e: "a",
    z: "a",
    Escape: "b",
    Backspace: "b",
    x: "b",
    b: "b",
    m: "start",
    h: "select",
};

// Keys that a focused button/link already handles natively; don't double-fire them.
const NATIVE_ACTIVATION_KEYS = new Set(["Enter", " "]);

export function getButtonForKey(event) {
    if (event.ctrlKey || event.metaKey || event.altKey) {
        return null;
    }
    const target = event.target;
    const tag = target?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) {
        return null;
    }
    if (NATIVE_ACTIVATION_KEYS.has(event.key) && (tag === "BUTTON" || tag === "A")) {
        return null;
    }
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    return KEY_MAP[key] || null;
}

// Higher priority layers receive input first. A blocking layer swallows
// everything, so the room never reacts while a menu or screen is on top.
export const INPUT_PRIORITY = {
    GAME: 0,
    DIALOG: 10,
    MENU: 20,
    SCREEN: 30,
    SCREEN_CONTENT: 31,
    INTRO: 40,
};

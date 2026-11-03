// START menu entries, in FireRed order. `screen` is a ScreenHost key; null closes the menu.
export const MENU_ENTRIES = [
    { id: "pokedex", label: "POKEDEX", accent: 3, screen: "projects", description: "Projects ANSH has built." },
    { id: "moves", label: "MOVES", screen: "skills", description: "Languages, frameworks and tools." },
    { id: "badges", label: "BADGES", screen: "achievements", description: "Wins, internships and education." },
    { id: "trainer", label: "TRAINER CARD", screen: "trainer", description: "Resume and how to reach ANSH." },
    { id: "options", label: "OPTIONS", screen: "help", description: "Controls and settings." },
    { id: "exit", label: "EXIT", screen: null, description: "Close this menu." },
];

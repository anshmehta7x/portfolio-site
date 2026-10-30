// START menu entries, in FireRed order. `screen` is a ScreenHost key, `href`
// navigates away; neither means the entry just closes the menu.
export const MENU_ENTRIES = [
    { id: "pokedex", label: "POKEDEX", accent: 3, screen: "projects", description: "Projects ANSH has built." },
    { id: "moves", label: "MOVES", screen: "skills", description: "Languages, frameworks and tools." },
    { id: "badges", label: "BADGES", screen: "achievements", description: "Wins, internships and education." },
    { id: "trainer", label: "TRAINER CARD", screen: "trainer", description: "Resume and how to reach ANSH." },
    { id: "options", label: "OPTIONS", screen: "help", description: "Controls and settings." },
    { id: "text", label: "TEXT VERSION", href: "/text", description: "Everything on one plain page." },
    { id: "exit", label: "EXIT", description: "Close this menu." },
];

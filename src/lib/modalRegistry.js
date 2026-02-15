const modals = {
    AchievementsModal: () => import("@/components/modals/AchievementsModal"),
    ResumeModal: () => import("@/components/modals/ResumeModal"),
    SkillsModal: () => import("@/components/modals/SkillsModal"),
    ProjectsModal: () => import("@/components/modals/ProjectsModal"),
    ContactModal: () => import("@/components/modals/ContactModal"),
    HelpModal: () => import("@/components/modals/HelpModal"),
};

export const MODAL_COMPONENTS = modals;

export const MODAL_ROUTES = {
    achievements: "AchievementsModal",
    resume: "ResumeModal",
    skills: "SkillsModal",
    projects: "ProjectsModal",
    contact: "ContactModal",
    help: "HelpModal",
};

export const INTERACTION_MODAL_MAP = {
    certificate: "AchievementsModal",
    computer: "ResumeModal",
    bookshelf: "SkillsModal",
    television: "ProjectsModal",
};

export default modals;

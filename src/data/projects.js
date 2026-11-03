// Newest first. `media` paths are under /public.
export const projectsData = [
    {
        title: "animatrix - AniMe Matrix control for Linux",
        description:
            "Control the ASUS ROG AniMe Matrix LED lid display on Linux: images, GIFs, video, text, clocks, a music visualiser and generative effects. An open-source alternative to Armoury Crate / G-Helper with a systemd daemon (D-Bus API), Electron tray app with live LED preview, CLI and TypeScript library.",
        media: "/demo-images/animatrix.png",
        mediaType: "image",
        mediaFit: "contain",
        liveUrl: "https://anshmehta7x.github.io/animatrix/",
        liveUrlText: "Website",
        githubUrl: "https://github.com/anshmehta7x/animatrix",
        techStack: ["TypeScript", "Electron", "Node.js", "D-Bus", "systemd", "ffmpeg", "PipeWire"],
    },
    {
        title: "ScriptSync - 1st Place @ VIT Hack",
        description:
            "Real-time, multithreaded video translation using GPU-accelerated OCR and intelligent caching.",
        media: "/demo-videos/scriptsync.mp4",
        mediaType: "video",
        liveUrl:
            "https://drive.google.com/file/d/1DiPiyneFtrvlLd5R-TVA0FxvNkwjTB2F/view",
        liveUrlText: "Watch Demo",
        githubUrl: "https://github.com/anshmehta7x/scriptsync",
        techStack: ["Python", "OpenCV", "EasyOCR", "Threading", "FFmpeg"],
    },
    {
        title: "Yantra Hackathon Portal - VIT's Biggest Hackathon",
        description:
            "A stunning hackathon management system with information, team management, and project submissions",
        media: "/demo-videos/yantrahack.mp4",
        liveUrl: "https://yantra-main-hack-frontend.vercel.app/",
        githubUrl: "https://github.com/anshmehta7x/yantra-main-hack-frontend",
        techStack: ["Next.js", "TailwindCSS", "Vercel", "Firebase"],
        mediaType: "video",
    },
    {
        title: "LocalBlockchain",
        description:
            "A blockchain implementation featuring Proof-of-Work mining, cryptographic hashing, and Merkle Trees. Includes a C++ backend for transaction processing/mining and an Electron.js/React.js interface for visualization.",
        media: "/demo-videos/simpleblockchain.mp4",
        mediaType: "video",
        githubUrl: "https://github.com/anshmehta7x/LocalBlockchain",
        techStack: [
            "C++17",
            "Proof-Of-Work",
            "OpenSSL",
            "Electron.js",
            "React.js",
            "TailwindCSS",
        ],
    },
    {
        title: "ForReal AI - 2nd Place @ Code4Change",
        description:
            "An AI-powered deepfake detector for both audio and image inputs.",
        media: "/demo-images/forreal.png",
        mediaType: "image",
        githubUrl:
            "https://www.kaggle.com/code/anshmehta7x/forreal-ai-deepfaked-audio-detection",
        techStack: ["Python", "TensorFlow", "FastAPI", "React.js", "AI/ML"],
    },
    {
        title: "StoryScape - 3rd Place @ DevJams",
        description:
            "A Generative AI tool that converts stories into rich, audio-visual scenes.",
        media: "/demo-images/storyscape.png",
        mediaType: "image",
        liveUrl: "https://devfolio.co/projects/storyscape-34dd",
        githubUrl: "https://github.com/anshmehta7x/StoryScape",
        techStack: ["Hugging Face", "ElevenLabs API", "Next.js", "GenAI"],
    },
];

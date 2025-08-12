"use client";

export default function ResumeModal({
    visibility,
    onClose,
    isConstrained = false,
}) {
    const handleDownload = () => {
        window.open(
            "https://github.com/anshmehta7x/resume/blob/main/ansh-mehta-resume.pdf",
            "_blank",
        );
    };

    const sectionClasses = isConstrained
        ? "absolute inset-0 w-full h-full flex justify-center items-center bg-black/60 z-50"
        : "fixed h-screen w-screen justify-center items-center top-0 bg-black/60 z-10";

    const contentContainerClasses = isConstrained
        ? "bg-gray-800 border-4 border-gray-600 rounded-lg shadow-2xl w-full h-full flex flex-col"
        : "bg-gray-800 border-4 border-gray-600 rounded-lg shadow-2xl w-96 h-64";

    return (
        <section
            className={`${visibility ? "flex" : "hidden"} ${sectionClasses} z-50`}
        >
            <div className={contentContainerClasses}>
                <div className="bg-blue-600 border-b-2 border-gray-600 p-2 flex justify-between items-center">
                    <span className="text-white font-arcade text-sm">
                        COMPUTER
                    </span>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-300 font-arcade text-lg"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-center items-center space-y-6">
                    <div className="text-center space-y-4">
                        <p className="text-green-400 font-pixeboy text-lg">
                            ANSH_MEHTA.RESUME
                        </p>
                        <p className="text-white font-arcade text-sm">
                            FILE READY FOR DOWNLOAD
                        </p>
                    </div>

                    <button
                        onClick={handleDownload}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-arcade text-sm px-6 py-3 border-2 border-blue-400 transition-colors duration-200"
                    >
                        DOWNLOAD
                    </button>
                </div>
            </div>
        </section>
    );
}

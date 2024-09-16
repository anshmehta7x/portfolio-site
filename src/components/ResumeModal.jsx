import Image from "next/image";

export default function ResumeModal({ visibility, onClose }) {
  const handleDownload = () => {
    window.open(
      "https://github.com/anshmehta7x/resume/raw/main/my%20cv.docx",
      "_blank"
    );
  };

  return (
    <section
      className={`${
        visibility ? "flex" : "hidden"
      } h-screen w-screen justify-center fixed items-center`}
    >
      <div className="bg-slate-500 h-[25vh] w-[25vw] fixed z-20 pixel-border overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-300 focus:outline-none"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h1
          className="text-white text-4xl font-arcade text-center mt-8 cursor-pointer hover:underline glow-text"
          onClick={handleDownload}
        >
          Download Resume
        </h1>
        <Image
          src="download-symbol.svg"
          alt="Download symbol"
          width={100}
          height={100}
          className="mx-auto mt-2 cursor-pointer"
          onClick={handleDownload}
        />
      </div>
    </section>
  );
}

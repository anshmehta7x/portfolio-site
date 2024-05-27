import Typewriter from "typewriter-effect";

export default function AnimatedHeading({ text }) {
  return (
    <div className="flex flex-col items-center justify-center h-[20vh] m-2">
      <h1 className="text-4xl font-arcade text-center">
        <Typewriter
          options={{
            strings: [
              "Hi I'm Ansh, and this is my portfolio",
              "I'm a Full Stack Developer",
              "I'm a Game Developer",
              "I'm a Competitive Programmer",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>
    </div>
  );
}

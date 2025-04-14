"use client";
import GameCanvas from "@/components/GameCanvas";

export default function GameBoy({
  setAchievementsVisibility,
  setResumeVisibility,
  setSkillsVisibility,
  setGbaPress,
  gbaPress,
}) {
  function buttonHandler(pressed) {
    setGbaPress(pressed);
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-t from-slate-800 to-slate-900">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* GameBoy Shell - now responsive */}
        <div className="bg-gradient-to-r from-violet-700 to-indigo-900 w-full max-w-[800px] h-[calc(100%-4rem)] max-h-[1200px] aspect-[11/17] rounded-t-xl flex flex-col items-center relative border-4 border-solid border-b-0 border-slate-900">
          {/* Screen border - responsive */}
          <div className="bg-gradient-to-r from-black to-neutral-800 w-[90%] h-[50%] rounded-t-lg mt-4 flex items-center justify-center relative border-4 border-solid border-b-0 border-slate-800 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.15),inset_-1px_0_0_0_rgba(255,255,255,0.15)]">
            {/* Screen - responsive */}
            <div className="bg-[#8BAC0F] w-[80%] h-[80%] rounded-sm border-solid border-8 border-t-4 border-black border-opacity-90 flex items-center justify-center overflow-hidden">
              <GameCanvas
                setAchievementsVisibility={setAchievementsVisibility}
                setResumeVisibility={setResumeVisibility}
                setSkillsVisibility={setSkillsVisibility}
                gbaPress={gbaPress}
                setGbaPress={setGbaPress}
              />
            </div>

            {/* Power Button */}
            {/* <div className="absolute top-20 left-[8px]">
              <div className="flex -space-x-1">
                <div className="bg-red-600 w-3 h-3 rounded-full relative z-40"></div>
                <div className="bg-gray-900 w-3 h-3 rounded-full border-solid border-r-4 border-gray-600 relative z-30"></div>
                <div className="bg-gray-900 w-3 h-3 rounded-full border-solid border-r-4 border-gray-600 relative z-20"></div>
                <div className="bg-gray-900 w-3 h-3 rounded-full border-solid border-r-4 border-gray-600 relative z-10"></div>
              </div>
              <div className="text-gray-500 text-[10px] semibold">POWER</div>
            </div> */}
          </div>

          {/* Screen Bottom */}
          <div className="bg-gradient-to-r from-black to-neutral-800 w-[90%] h-[2rem] rounded-b-[100%] relative z-10 border-4 border-solid border-t-0 border-slate-800 flex items-center justify-center shadow-[inset_1px_-1px_0_0_rgba(255,255,255,0.15),inset_-1px_0_0_0_rgba(255,255,255,0.15)]">
            <svg
              className="-mt-10"
              width="161"
              height="19"
              viewBox="0 0 161 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Nintendo Game Boy logo SVG */}
              <path
                d="M121.164 12.6744C121.164 12.6744 120.157 14.4303 117.948 14.2229C115.353 13.9569 115.048 11.6782 115.048 11.6782C115.048 11.6782 114.693 10.0014 116.29 8.54132C117.908 7.17993 119.595 7.387 119.595 7.387C119.595 7.387 120.729 7.4956 121.312 9.36985C122.061 11.7572 121.164 12.6744 121.164 12.6744ZM125.08 7.94936C124.754 6.96314 123.896 6.02591 123.896 6.02591C123.896 6.02591 122.604 4.3487 120.069 3.77702C117.898 3.32296 116.192 4.27996 116.192 4.27996C116.192 4.27996 114.643 4.90131 113.479 6.18372C111.625 7.96897 111.092 10.5733 111.092 10.5733C111.092 10.5733 110.382 12.8421 111.506 14.6376L112.729 16.1171C114.456 17.5576 116.301 17.7053 116.301 17.7053C116.301 17.7053 117.79 18.0408 119.526 17.5871C121.045 17.2813 122.15 16.5313 122.15 16.5313C122.15 16.5313 124.666 15.1408 125.356 12.2998L125.08 7.94936Z"
                fill="#4E4BA8"
              />
              <path
                d="M142.618 13.1877C139.827 14.8646 138.071 13.0296 138.071 13.0296C138.071 13.0296 137.292 12.5168 137.124 10.9582C137.006 9.15295 138.801 8.21599 138.801 8.21599C138.801 8.21599 139.748 7.63386 140.932 7.72259C142.116 7.81132 142.49 7.73237 143.447 8.44277C144.354 9.26161 144.296 9.86309 144.296 9.86309C144.296 9.86309 144.621 11.8955 142.618 13.1877ZM147.343 7.42685C145.618 4.60578 142.579 4.18152 142.579 4.18152C142.579 4.18152 141.612 3.85581 139.541 4.13185C135.654 4.87175 134.303 7.86074 134.303 7.86074C134.303 7.86074 132.912 10.0507 133.464 12.7041L135.161 16.058C136.414 17.2317 136.926 17.2317 137.006 17.3013C138.663 18.0508 140.586 17.6166 140.586 17.6166C140.586 17.6166 143.013 17.38 145.233 15.6536C147.008 14.3516 147.778 12.438 147.778 12.438L147.343 7.42685Z"
                fill="#DAAC06"
              />
              <path
                d="M151.527 8.05789L151.339 5.48334C151.339 5.48334 153.144 5.44376 153.894 5.57207C155.374 5.79895 155.295 6.21339 155.295 6.21339C155.295 6.21339 155.246 6.73597 154.121 7.24929C152.898 7.84084 151.527 8.05789 151.527 8.05789ZM147.778 12.438C147.778 12.438 147.837 14.0159 147.591 14.4008C147.255 15.1207 147.304 15.8213 147.304 15.8213C147.304 15.8213 147.078 17.952 149.544 18.3072C151.241 18.2971 151.448 16.8864 151.477 16.2849C151.576 15.8115 151.536 13.6115 151.536 13.6115L153.736 15.407C153.736 15.407 155.335 16.7485 156.271 17.528C157.249 18.2971 157.494 18.4353 157.494 18.4353C157.494 18.4353 157.702 18.6818 158.451 18.593C159.054 18.6034 159.606 18.0604 159.606 18.0604C159.606 18.0604 160.306 17.5477 160.483 16.6499C160.7 15.5846 159.872 15.0618 159.872 15.0618C159.872 15.0618 156.814 12.5956 154.743 10.8987C156.133 10.1395 156.804 9.61636 156.804 9.61636C156.804 9.61636 158.738 8.33423 159.152 6.3712C159.725 4.21074 158.097 3.3625 158.097 3.3625C158.097 3.3625 157.08 2.6324 156.222 2.24748C154.062 1.19221 152.05 1.40904 152.05 1.40904C152.05 1.40904 149.189 1.21194 147.324 3.51045C146.466 4.62493 146.999 6.08508 146.999 6.08508C146.999 6.08508 147.105 6.3192 147.344 7.42666C147.824 9.65414 147.778 12.438 147.778 12.438Z"
                fill="#00938A"
              />
              <path
                d="M133.465 12.7042C132.634 12.5215 131.304 12.8618 131.304 12.8618C131.304 12.8618 129.45 13.5424 129.164 13.5325C129.056 13.3751 128.819 10.3463 128.888 9.13303C128.928 6.99252 128.75 5.24639 128.75 5.24639C128.75 5.24639 128.661 3.18471 127.556 1.96162C126.254 0.649776 125.346 1.21192 124.824 1.52743C123.57 2.65211 124.153 4.02289 124.153 4.02289L124.804 5.868C124.804 5.868 125.12 6.65704 125.08 7.94926L125.356 12.2997C125.356 12.8817 125.83 16.7977 125.83 16.7977C125.83 16.7977 125.879 18.0705 127.102 18.2971C128.355 18.504 129.588 17.8829 130.111 17.6367C130.634 17.3898 131.325 17.1728 131.325 17.1728C131.325 17.1728 131.896 17.0447 132.468 16.995C133.81 16.8667 134.294 16.6303 134.294 16.6303C134.294 16.6303 134.813 16.5522 135.162 16.0578C135.51 15.5636 135.933 13.2465 133.465 12.7042Z"
                fill="#6EB122"
              />
              <path
                d="M111.506 14.637C110.625 14.3736 109.613 14.5482 109.613 14.5482C109.613 14.5482 106.752 14.8243 105.262 14.5088C102.954 14.1044 103.032 11.6187 103.032 11.6187C103.032 11.6187 102.954 9.97121 104.345 7.74196C106.061 4.98967 107.955 4.4964 107.955 4.4964C107.955 4.4964 108.429 4.31918 108.873 4.55561C109.149 6.15358 110.697 6.14375 110.697 6.14375C110.697 6.14375 112.927 6.292 112.818 3.58935C112.562 1.36939 110.421 1.06355 109.523 0.856651C106.831 0.373188 105.085 1.81338 105.085 1.81338C105.085 1.81338 103.279 2.79024 101.119 6.19317C99.6489 8.30413 99.4717 9.96138 99.4717 9.96138C99.4717 9.96138 99.2942 10.3563 99.363 12.1122C99.324 13.4832 99.8367 14.4792 99.8367 14.4792C99.8367 14.4792 100.616 16.8374 103.082 17.8039C104.581 18.4255 106.772 18.4155 106.772 18.4155C106.772 18.4155 108.892 18.3861 110.52 18.2971C111.408 18.3661 111.832 17.9025 111.832 17.9025C111.832 17.9025 112.828 17.2516 112.73 16.117C112.73 16.117 112.537 14.9453 111.506 14.637Z"
                fill="#B80A41"
              />
              <path
                d="M21.8924 9.72868L21.2563 6.44564L19.7884 9.72868H21.8924ZM44.9401 18.074H41.4638L40.9993 7.60394L36.4794 18.074H34.161L32.2298 8.60825L29.216 18.074H23.305L22.4158 13.0135H18.398L16.1184 18.074H12.4863L19.9433 1.15221H24.2315L26.5111 14.8292L30.9544 1.15221H34.3921L36.0921 10.4246L40.0339 1.15221H44.2066L44.9401 18.074Z"
                fill="#65696F"
              />
              <path
                d="M54.9085 18.074L55.4883 14.4426H49.4221L49.9032 11.4286H55.1786L55.7588 7.79723H50.4264L50.8905 4.78359H56.955L57.5352 1.15221H47.9154L45.2104 18.074H54.9085Z"
                fill="#65696F"
              />
              <path
                d="M100.074 1.15221H96.0163L92.5778 6.67645L90.4148 1.15221H86.4351L90.5306 10.0763L89.2685 18.074H92.7463L93.814 11.0042L100.074 1.15221Z"
                fill="#65696F"
              />
              <path
                d="M79.4268 14.8518C81.2662 15.6745 83.5187 14.0602 84.4569 11.2462C85.3939 8.43119 84.6643 5.48163 82.8252 4.65892C80.9855 3.83551 78.7347 5.45012 77.7959 8.26552C76.8577 11.0809 77.5884 14.0284 79.4268 14.8518ZM74.1644 8.15754C75.2445 3.47867 79.243 0.408035 83.0957 1.29871C86.9494 2.18938 89.1981 6.70294 88.1187 11.3815C87.0393 16.0596 83.0401 19.1303 79.1878 18.2399C75.3337 17.3493 73.0851 12.835 74.1644 8.15754Z"
                fill="#65696F"
              />
              <path
                d="M5.06884 2.6596C1.75555 4.70964 0.161842 7.83549 0.586367 12.0857C1.07936 17.0155 7.46392 20.1219 12.8729 16.9925C13.3459 16.7189 13.1612 16.7624 13.3369 16.606L14.4189 9.72871H7.9659L7.47153 12.8967H10.1681L9.85832 14.5973C8.31368 15.2151 5.6863 14.9832 4.56619 12.9742C3.85679 11.7019 3.19926 8.86211 6.18963 6.25132C8.62205 4.12659 12.8342 3.74072 15.2687 4.86115C15.2687 4.86115 15.5778 3.08404 15.8087 1.42199C11.134 -0.200055 7.50197 1.15224 5.06884 2.6596Z"
                fill="#65696F"
              />
              <path
                d="M62.8274 1.24645L60.144 18.0408C60.144 18.0408 65.7037 18.0408 67.9651 18.0408C71.1859 18.0408 75.896 13.2936 71.6082 9.41404C76.017 4.85127 71.6457 1.28574 69.3072 1.24645C67.4288 1.21529 62.7899 1.24645 62.7899 1.24645H62.8274ZM64.7447 11.4074C64.7447 11.4074 65.4733 11.4074 67.6582 11.4074C70.4198 11.4074 70.343 14.7815 67.2752 14.7815C65.3593 14.7815 64.208 14.7815 64.208 14.7815L64.7447 11.4074ZM65.8177 4.81269C65.8177 4.81269 65.8945 4.81269 68.0809 4.81269C70.5345 4.81269 70.0368 7.9566 67.6986 7.9566C65.7805 7.9566 65.2818 7.9566 65.2818 7.9566L65.8177 4.81269Z"
                fill="#65696F"
              />
            </svg>
          </div>

          {/* D-Pad */}
          <div className="absolute left-[7%] bottom-[18%] h-[8rem] w-[8rem]">
            <div className="bg-black rounded-md w-10 h-full absolute left-1/2 transform -translate-x-1/2"></div>
            <div className="bg-black rounded-md h-10 w-full absolute top-1/2 transform -translate-y-1/2"></div>

            <div className="bg-gradient-to-b from-neutral-800 to-neutral-700 rounded-sm w-7 h-full absolute left-1/2 transform -translate-x-1/2 border-t-4 border-b-4 border-solid border-black shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.3),inset_0_-2px_4px_0_rgba(0,0,0,0.8)]"></div>
            <div className="bg-gradient-to-r from-neutral-800 to-neutral-700 rounded-sm h-7 w-full absolute top-1/2 transform -translate-y-1/2 border-l-4 border-r-4 border-solid border-black shadow-[inset_2px_0_4px_0_rgba(255,255,255,0.3),inset_-2px_0_4px_0_rgba(0,0,0,0.8)]"></div>

            {/* Middle Circle */}
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-full w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-[inset_2px_2px_4px_0_rgba(0,0,0,0.75),2px_2px_4px_0_rgba(255,255,255,.2)]"></div>

            {/* Triangles */}
            <div
              className="absolute top-[10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-solid border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[16px] border-b-neutral-900 shadow-[0_1px_0_0_rgba(255,255,255,.2)] z-50"
              onClick={() => buttonHandler("up")}
            ></div>
            <div
              className="absolute bottom-[10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-solid border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[16px] border-t-neutral-800 z-50"
              onClick={() => buttonHandler("down")}
            ></div>

            <div
              className="absolute left-[10px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-solid border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[16px] border-r-neutral-900 shadow-[1px_0_0_0_rgba(255,255,255,.2)] z-50"
              onClick={() => buttonHandler("left")}
            ></div>

            <div
              className="absolute right-[10px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-solid border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[16px] border-l-neutral-800 z-50"
              onClick={() => buttonHandler("right")}
            ></div>
          </div>

          {/* A and B buttons */}
          <div className="absolute right-[6%] bottom-[21%] w-28 h-16">
            <div
              className="bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-full w-12 h-12 absolute bottom-0 border-4 border-solid border-black border-b-2 shadow-[inset_1px_2px_1px_0_rgba(255,255,255,0.15),2px_2px_1px_0_rgba(0,0,0,0.25)]"
              onClick={() => buttonHandler("b")}
            >
              <span className="font-bold text-white absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xl">
                B
              </span>
            </div>
            <div
              className="bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-full h-12 w-12 absolute right-0 border-4 border-solid border-black border-b-2 shadow-[inset_1px_2px_1px_0_rgba(255,255,255,0.15),2px_2px_1px_0_rgba(0,0,0,0.25)]"
              onClick={() => buttonHandler("a")}
            >
              <span className="font-bold text-white absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xl">
                A
              </span>
            </div>
          </div>

          {/* Start Select */}
          <div className="absolute bottom-[4%] flex space-x-4">
            <div className="flex flex-col items-center">
              <div
                className="bg-gradient-to-b from-slate-800 to-violet-700 w-12 h-5 rounded-full flex items-center justify-center"
                onClick={() => buttonHandler("select")}
              >
                <div className="bg-gradient-to-b from-neutral-700 via-neutral-600 to-neutral-900 shadow-[inset_-2px_-1px_10px_0_rgba(0,0,0,1)] w-[90%] h-[70%] rounded-full"></div>
              </div>
              <div className="text-violet-700 text-sm">SELECT</div>
            </div>

            <div className="flex flex-col items-center">
              <div
                className="bg-gradient-to-b from-slate-800 to-violet-700 w-12 h-5 rounded-full flex items-center justify-center"
                onClick={() => buttonHandler("start")}
              >
                <div className="bg-gradient-to-b from-neutral-700 via-neutral-600 to-neutral-900 shadow-[inset_-2px_-1px_10px_0_rgba(0,0,0,1)] w-[90%] h-[70%] rounded-full"></div>
              </div>
              <div className="text-violet-700 text-sm">START</div>
            </div>
          </div>

          {/* Speaker */}
          {/* <div className="absolute right-3 -bottom-8 transform -skew-y-12 flex flex-col items-center space-y-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex space-x-1">
                {[...Array(8)].map((_, j) => (
                  <div
                    key={j}
                    className={`h-[6px] w-[6px] rounded-full ${
                      j % 2 === 0 ? "bg-slate-900" : "bg-indigo-900"
                    } shadow-[inset_0_1px_3px_0_rgba(0,0,0,.5),0_1px_0_0_rgba(255,255,255,.2)] skew-x-6`}
                  ></div>
                ))}
              </div>
            ))}
          </div> */}
        </div>

        {/* Shell Bottom */}
        <div className="absolute bottom-0 bg-gradient-to-r from-violet-700 to-indigo-900 w-full max-w-[800px] h-[4rem] max-h-[10%] rounded-b-[100%] border-4 border-solid border-t-0 border-slate-900"></div>
      </div>
    </div>
  );
}

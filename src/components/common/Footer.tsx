import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <div className="pb-3">
          <div className="flex border-b border-[#cedbe8] px-4 justify-between">
            <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#49739c] gap-1 pb-[7px] pt-2.5 flex-1" href="#">
              <div className="text-[#49739c]" data-icon="House" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"
                  ></path>
                </svg>
              </div>
              <p className="text-[#49739c] text-sm font-bold leading-normal tracking-[0.015em]">Home</p>
            </a>
            <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#49739c] gap-1 pb-[7px] pt-2.5 flex-1" href="#">
              <div className="text-[#49739c]" data-icon="ChartLine" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"
                  ></path>
                </svg>
              </div>
              <p className="text-[#49739c] text-sm font-bold leading-normal tracking-[0.015em]">Portfolio</p>
            </a>
            <a className="flex flex-col items-center justify-center border-b-[3px] border-b-[#0d80f2] text-[#0d141c] gap-1 pb-[7px] pt-2.5 flex-1" href="#">
              <div className="text-[#0d141c]" data-icon="MagnifyingGlass" data-size="24px" data-weight="fill">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M168,112a56,56,0,1,1-56-56A56,56,0,0,1,168,112Zm61.66,117.66a8,8,0,0,1-11.32,0l-50.06-50.07a88,88,0,1,1,11.32-11.31l50.06,50.06A8,8,0,0,1,229.66,229.66ZM112,184a72,72,0,1,0-72-72A72.08,72.08,0,0,0,112,184Z"
                  ></path>
                </svg>
              </div>
              <p className="text-[#0d141c] text-sm font-bold leading-normal tracking-[0.015em]">Research</p>
            </a>
            <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#49739c] gap-1 pb-[7px] pt-2.5 flex-1" href="#">
              <div className="text-[#49739c]" data-icon="Users" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"
                  ></path>
                </svg>
              </div>
              <p className="text-[#49739c] text-sm font-bold leading-normal tracking-[0.015em]">Community</p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

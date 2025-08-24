import React from 'react';

const Tasks: React.FC = () => {
  return (
    <div>
      <h2 className="text-light-text dark:text-dark-text text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Tasks</h2>
      <div className="flex items-center gap-4 bg-light-bg dark:bg-dark-bg px-4 min-h-[72px] py-2">
        <div className="text-light-text dark:text-dark-text flex items-center justify-center rounded-lg bg-secondary dark:bg-dark-secondary shrink-0 size-12" data-icon="CircleNotch" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path
              d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"
            ></path>
          </svg>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-light-text dark:text-dark-text text-base font-medium leading-normal line-clamp-1">Analyze Stock Performance</p>
          <p className="text-light-accent dark:text-dark-accent text-sm font-normal leading-normal line-clamp-2">Due Today</p>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-light-bg dark:bg-dark-bg px-4 min-h-[72px] py-2">
        <div className="text-light-text dark:text-dark-text flex items-center justify-center rounded-lg bg-secondary dark:bg-dark-secondary shrink-0 size-12" data-icon="CircleNotch" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path
              d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"
            ></path>
          </svg>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-light-text dark:text-dark-text text-base font-medium leading-normal line-clamp-1">Research Market Trends</p>
          <p className="text-light-accent dark:text-dark-accent text-sm font-normal leading-normal line-clamp-2">Due Tomorrow</p>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-light-bg dark:bg-dark-bg px-4 min-h-[72px] py-2">
        <div className="text-light-text dark:text-dark-text flex items-center justify-center rounded-lg bg-secondary dark:bg-dark-secondary shrink-0 size-12" data-icon="CircleNotch" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path
              d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"
            ></path>
          </svg>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-light-text dark:text-dark-text text-base font-medium leading-normal line-clamp-1">Set Up Stock Alerts</p>
          <p className="text-light-accent dark:text-dark-accent text-sm font-normal leading-normal line-clamp-2">Due in 2 Days</p>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
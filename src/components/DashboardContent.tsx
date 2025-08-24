import React from 'react';

const DashboardContent: React.FC = () => {
  return (
    <>
      <h2 className="text-light-text dark:text-dark-text tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">Good morning, User</h2>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <input
            placeholder="What's on your mind?"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-light-text dark:text-dark-text focus:outline-0 focus:ring-0 border border-secondary dark:border-dark-secondary bg-light-bg dark:bg-dark-bg focus:border-secondary dark:focus:border-dark-secondary h-14 placeholder:text-light-accent dark:placeholder:text-dark-accent p-[15px] text-base font-normal leading-normal"
          />
        </label>
      </div>
      <div className="flex justify-stretch">
        <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-dark-text text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Analyze Stock</span>
          </button>
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Research News</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
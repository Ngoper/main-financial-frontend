import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Dashboard: React.FC = () => {
  return (
    <IonPage>
      <Header title="Dashboard" />
      <IonContent fullscreen>
        <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h2 className="text-[#0d141c] dark:text-white tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">Good morning, User</h2>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <input
                  placeholder="What's on your mind?"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d141c] dark:text-white focus:outline-0 focus:ring-0 border border-[#cedbe8] dark:border-[#314d68] bg-slate-50 dark:bg-[#182634] focus:border-[#cedbe8] dark:focus:border-[#314d68] h-14 placeholder:text-[#49739c] dark:placeholder:text-[#90adcb] p-[15px] text-base font-normal leading-normal"
                  value=""
                />
              </label>
            </div>
            <div className="flex justify-stretch">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#0d80f2] text-slate-50 dark:text-white text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Analyze Stock</span>
                </button>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#e7edf4] dark:bg-[#223649] text-[#0d141c] dark:text-white text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Research News</span>
                </button>
              </div>
            </div>
            <h2 className="text-[#0d141c] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Quick Actions</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-1 gap-3 rounded-lg border border-[#cedbe8] dark:border-[#314d68] bg-slate-50 dark:bg-[#182634] p-4 items-center">
                <div className="text-[#0d141c] dark:text-white" data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-[#0d141c] dark:text-white text-base font-bold leading-tight">Search</h2>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#cedbe8] dark:border-[#314d68] bg-slate-50 dark:bg-[#182634] p-4 items-center">
                <div className="text-[#0d141c] dark:text-white" data-icon="ChartLine" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-[#0d141c] dark:text-white text-base font-bold leading-tight">Analyze</h2>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#cedbe8] dark:border-[#314d68] bg-slate-50 dark:bg-[#182634] p-4 items-center">
                <div className="text-[#0d141c] dark:text-white" data-icon="Newspaper" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M88,112a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H96A8,8,0,0,1,88,112Zm8,40h80a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16ZM232,64V184a24,24,0,0,1-24,24H32A24,24,0,0,1,8,184.11V88a8,8,0,0,1,16,0v96a8,8,0,0,0,16,0V64A16,16,0,0,1,56,48H216A16,16,0,0,1,232,64Zm-16,0H56V184a23.84,23.84,0,0,1-1.37,8H208a8,8,0,0,0,8-8Z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-[#0d141c] dark:text-white text-base font-bold leading-tight">News</h2>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#cedbe8] dark:border-[#314d68] bg-slate-50 dark:bg-[#182634] p-4 items-center">
                <div className="text-[#0d141c] dark:text-white" data-icon="Bell" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-[#0d141c] dark:text-white text-base font-bold leading-tight">Alerts</h2>
              </div>
            </div>
            <h2 className="text-[#0d141c] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Tasks</h2>
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-[#101a23] px-4 min-h-[72px] py-2">
              <div className="text-[#0d141c] dark:text-white flex items-center justify-center rounded-lg bg-[#e7edf4] dark:bg-[#223649] shrink-0 size-12" data-icon="CircleNotch" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[#0d141c] dark:text-white text-base font-medium leading-normal line-clamp-1">Analyze Stock Performance</p>
                <p className="text-[#49739c] dark:text-[#90adcb] text-sm font-normal leading-normal line-clamp-2">Due Today</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-[#101a23] px-4 min-h-[72px] py-2">
              <div className="text-[#0d141c] dark:text-white flex items-center justify-center rounded-lg bg-[#e7edf4] dark:bg-[#223649] shrink-0 size-12" data-icon="CircleNotch" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[#0d141c] dark:text-white text-base font-medium leading-normal line-clamp-1">Research Market Trends</p>
                <p className="text-[#49739c] dark:text-[#90adcb] text-sm font-normal leading-normal line-clamp-2">Due Tomorrow</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-[#101a23] px-4 min-h-[72px] py-2">
              <div className="text-[#0d141c] dark:text-white flex items-center justify-center rounded-lg bg-[#e7edf4] dark:bg-[#223649] shrink-0 size-12" data-icon="CircleNotch" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[#0d141c] dark:text-white text-base font-medium leading-normal line-clamp-1">Set Up Stock Alerts</p>
                <p className="text-[#49739c] dark:text-[#90adcb] text-sm font-normal leading-normal line-clamp-2">Due in 2 Days</p>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Dashboard;
import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { useHistory } from 'react-router-dom';

const TopicSelection: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <Header title="Topic Selection" />
      <IonContent fullscreen>
        <div className="relative flex size-full min-h-screen flex-col bg-slate-50 dark:bg-[#101e23] justify-between group/design-root overflow-x-hidden">
          <div>
            <div className="flex items-center bg-slate-50 dark:bg-[#101e23] p-4 pb-2 justify-between">
              <div 
                className="text-[#0d141c] dark:text-white flex size-12 shrink-0 items-center cursor-pointer" 
                data-icon="ArrowLeft" 
                data-size="24px" 
                data-weight="regular"
                onClick={() => history.goBack()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                </svg>
              </div>
              <h2 className="text-[#0d141c] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Select a Topic</h2>
            </div>
            <div 
              className="flex items-center gap-4 bg-slate-50 dark:bg-[#101e23] px-4 min-h-[72px] py-2 cursor-pointer"
              onClick={() => history.push('/chat')}
            >
              <div className="text-[#0d141c] dark:text-white flex items-center justify-center rounded-lg bg-[#e7edf4] dark:bg-[#223f49] shrink-0 size-12" data-icon="Upload" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M240,136v64a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V136a16,16,0,0,1,16-16H80a8,8,0,0,1,0,16H32v64H224V136H176a8,8,0,0,1,0-16h48A16,16,0,0,1,240,136ZM85.66,77.66,120,43.31V128a8,8,0,0,0,16,0V43.31l34.34,34.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,77.66ZM200,168a12,12,0,1,0-12,12A12,12,0,0,0,200,168Z"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[#0d141c] dark:text-white text-base font-medium leading-normal line-clamp-1">Upload Report</p>
                <p className="text-[#49739c] dark:text-[#90bccb] text-sm font-normal leading-normal line-clamp-2">Upload company financial reports for in-depth analysis.</p>
              </div>
            </div>
            <div 
              className="flex items-center gap-4 bg-slate-50 dark:bg-[#101e23] px-4 min-h-[72px] py-2 cursor-pointer"
              onClick={() => history.push('/chat')}
            >
              <div className="text-[#0d141c] dark:text-white flex items-center justify-center rounded-lg bg-[#e7edf4] dark:bg-[#223f49] shrink-0 size-12" data-icon="ChartLine" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[#0d141c] dark:text-white text-base font-medium leading-normal line-clamp-1">Stock Analysis</p>
                <p className="text-[#49739c] dark:text-[#90bccb] text-sm font-normal leading-normal line-clamp-2">Get comprehensive stock analysis based on current data.</p>
              </div>
            </div>
            <div 
              className="flex items-center gap-4 bg-slate-50 dark:bg-[#101e23] px-4 min-h-[72px] py-2 cursor-pointer"
              onClick={() => history.push('/chat')}
            >
              <div className="text-[#0d141c] dark:text-white flex items-center justify-center rounded-lg bg-[#e7edf4] dark:bg-[#223f49] shrink-0 size-12" data-icon="Star" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34,80,80,0,0,1,134.14,0,16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[#0d141c] dark:text-white text-base font-medium leading-normal line-clamp-1">Stock Recommendations</p>
                <p className="text-[#49739c] dark:text-[#90bccb] text-sm font-normal leading-normal line-clamp-2">Receive personalized stock recommendations based on your investment profile.</p>
              </div>
            </div>
          </div>
          <div><div className="h-5 bg-slate-50 dark:bg-[#101e23]"></div></div>
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default TopicSelection;
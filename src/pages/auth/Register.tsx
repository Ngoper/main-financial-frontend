import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Register: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="relative flex size-full min-h-screen flex-col bg-slate-50 dark:bg-[#101e23] justify-between group/design-root overflow-x-hidden" style={{fontFamily: 'Inter, "Noto Sans", sans-serif'}}>
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
              <h2 className="text-[#0d141c] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Sign Up</h2>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0d141c] dark:text-white text-base font-medium leading-normal pb-2">Full Name</p>
                <input
                  placeholder="Enter your full name"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141c] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e7edf4] dark:bg-[#223f49] focus:border-none h-14 placeholder:text-[#49739c] dark:placeholder:text-[#90bccb] p-4 text-base font-normal leading-normal"
                  value=""
                />
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0d141c] dark:text-white text-base font-medium leading-normal pb-2">Email</p>
                <input
                  placeholder="Enter your email"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141c] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e7edf4] dark:bg-[#223f49] focus:border-none h-14 placeholder:text-[#49739c] dark:placeholder:text-[#90bccb] p-4 text-base font-normal leading-normal"
                  value=""
                />
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0d141c] dark:text-white text-base font-medium leading-normal pb-2">Password</p>
                <input
                  placeholder="Enter your password"
                  type="password"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141c] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e7edf4] dark:bg-[#223f49] focus:border-none h-14 placeholder:text-[#49739c] dark:placeholder:text-[#90bccb] p-4 text-base font-normal leading-normal"
                  value=""
                />
              </label>
            </div>
            <div className="flex px-4 py-3">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#0d80f2] text-slate-50 dark:text-[#101e23] text-base font-bold leading-normal tracking-[0.015em]"
                onClick={() => history.push('/dashboard')}
              >
                <span className="truncate">Sign Up</span>
              </button>
            </div>
            <p className="text-[#49739c] dark:text-[#90bccb] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">Already have an account?</p>
            <p 
              className="text-[#49739c] dark:text-[#90bccb] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline cursor-pointer"
              onClick={() => history.push('/auth/login')}
            >
              Log In
            </p>
          </div>
          <div>
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-none hidden dark:block"
              style={{aspectRatio: '390 / 320'}}
            ></div>
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-none block dark:hidden"
              style={{aspectRatio: '390 / 320'}}
            ></div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;

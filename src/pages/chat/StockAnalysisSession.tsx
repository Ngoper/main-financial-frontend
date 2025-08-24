import React, { useState, useEffect } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation, IndonesianCompany, indonesianCompanies } from '../../components/localization/LanguageProvider';
import IndonesianChatInterface from '../../components/chat/IndonesianChatInterface';
import CompanySelector from '../../components/chat/CompanySelector';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

interface StockAnalysisParams {
  kodePerusahaan?: string;
}

/**
 * StockAnalysisSession Component
 * 
 * Enhanced Indonesian stock analysis chat session with:
 * - Company selection with Indonesian stock companies
 * - Two-level AI analysis (Level 1: Facts, Level 2: Analysis & Implications)
 * - Progressive disclosure of AI capabilities
 * - Native Indonesian language interface
 * - Real-time Indonesian stock data integration
 */
const StockAnalysisSession: React.FC = () => {
  const history = useHistory();
  const { kodePerusahaan } = useParams<StockAnalysisParams>();
  const { t } = useTranslation();
  
  const [selectedCompany, setSelectedCompany] = useState<IndonesianCompany | null>(null);
  const [analysisLevel, setAnalysisLevel] = useState<1 | 2>(1);
  const [showCompanySelector, setShowCompanySelector] = useState(true);

  // Initialize with company from URL params if available
  useEffect(() => {
    if (kodePerusahaan) {
      const company = indonesianCompanies.find(c => 
        c.kode.toLowerCase() === kodePerusahaan.toLowerCase()
      );
      if (company) {
        setSelectedCompany(company);
        setShowCompanySelector(false);
      }
    }
  }, [kodePerusahaan]);

  const handleCompanySelect = (company: IndonesianCompany) => {
    setSelectedCompany(company);
    setShowCompanySelector(false);
    
    // Update URL to reflect selected company
    history.replace(`/chat/analisa-saham/${company.kode.toLowerCase()}`);
  };

  const handleLevelUpgrade = () => {
    if (analysisLevel === 1) {
      setAnalysisLevel(2);
    }
  };

  const handleChangeCompany = () => {
    setShowCompanySelector(true);
    setSelectedCompany(null);
    history.replace('/chat/analisa-saham');
  };

  if (showCompanySelector || !selectedCompany) {
    return (
      <IonPage>
        <Header title={t.topicSelection.stockAnalysis.title} />
        <IonContent fullscreen>
          <div className="min-h-screen bg-slate-50 dark:bg-[#101e23] p-4">
            {/* Back Button */}
            <div className="flex items-center mb-6">
              <div 
                className="text-[#0d141c] dark:text-white flex size-10 shrink-0 items-center cursor-pointer mr-3" 
                onClick={() => history.goBack()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                </svg>
              </div>
              <h1 className="text-[#0d141c] dark:text-white text-xl font-bold">
                {t.topicSelection.stockAnalysis.title}
              </h1>
            </div>

            {/* Instructions */}
            <div className="bg-white dark:bg-[#182634] rounded-xl p-6 mb-6">
              <h2 className="text-[#0d141c] dark:text-white text-lg font-semibold mb-3">
                Pilih Perusahaan untuk Analisis
              </h2>
              <p className="text-[#49739c] dark:text-[#90bccb] text-sm mb-4">
                Pilih salah satu perusahaan di bawah ini atau cari perusahaan lain untuk memulai analisis saham mendalam dengan AI.
              </p>
              
              {/* AI Levels Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-[#223649] rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-[#0d80f2] text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">
                      1
                    </div>
                    <span className="text-[#0d141c] dark:text-white font-medium text-sm">
                      {t.ai.level1.name}
                    </span>
                  </div>
                  <p className="text-[#49739c] dark:text-[#90bccb] text-xs">
                    {t.ai.level1.description}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-[#223649] rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-[#0db9f2] text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">
                      2
                    </div>
                    <span className="text-[#0d141c] dark:text-white font-medium text-sm">
                      {t.ai.level2.name}
                    </span>
                  </div>
                  <p className="text-[#49739c] dark:text-[#90bccb] text-xs">
                    {t.ai.level2.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Company Selector */}
            <CompanySelector 
              onCompanySelect={handleCompanySelect}
              showPopular={true}
            />
          </div>
        </IonContent>
        <Footer />
      </IonPage>
    );
  }

  return (
    <IonPage>
      <div className="relative h-full">
        {/* Company Info Header */}
        <div className="bg-white dark:bg-[#182634] border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="text-[#0d141c] dark:text-white flex size-8 shrink-0 items-center cursor-pointer mr-3" 
                onClick={() => history.goBack()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-[#0d141c] dark:text-white font-bold text-lg">
                  {selectedCompany.kode}
                </h3>
                <p className="text-[#49739c] dark:text-[#90bccb] text-sm">
                  {selectedCompany.nama}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Level Indicator */}
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  analysisLevel === 1 ? 'bg-[#0d80f2]' : 'bg-gray-400'
                }`}>
                  1
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  analysisLevel === 2 ? 'bg-[#0db9f2]' : 'bg-gray-400'
                }`}>
                  2
                </div>
              </div>
              
              {/* Change Company Button */}
              <button
                onClick={handleChangeCompany}
                className="text-[#0d80f2] text-sm font-medium"
              >
                Ganti
              </button>
            </div>
          </div>
          
          {/* Level Upgrade Prompt */}
          {analysisLevel === 1 && (
            <div className="mt-4 bg-blue-50 dark:bg-[#1a3b5c] border border-blue-200 dark:border-blue-700 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">
                    Upgrade ke Level 2
                  </p>
                  <p className="text-blue-600 dark:text-blue-300 text-xs">
                    Dapatkan analisis mendalam dan implikasi investasi
                  </p>
                </div>
                <button
                  onClick={handleLevelUpgrade}
                  className="bg-[#0db9f2] text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-[#0a9dd4] transition-colors"
                >
                  Upgrade
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Chat Interface */}
        <div className="h-full">
          <IndonesianChatInterface
            selectedTopic="analisa-saham"
            selectedCompany={selectedCompany}
            analysisLevel={analysisLevel}
            onCompanySelect={handleCompanySelect}
            onTopicChange={() => {}}
          />
        </div>
      </div>
    </IonPage>
  );
};

export default StockAnalysisSession;
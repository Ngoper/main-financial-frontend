import React, { createContext, useContext, useState, ReactNode } from 'react';

// Indonesian localization strings
export const indonesianTranslations = {
  // Dashboard
  dashboard: {
    goodMorning: 'Selamat pagi! 👋',
    goodAfternoon: 'Selamat siang! 👋', 
    goodEvening: 'Selamat malam! 👋',
    searchPlaceholder: 'Cari saham atau perusahaan...',
    analyzeStock: 'Analisa Saham',
    uploadReport: 'Upload Laporan',
    aiChat: 'Chat AI',
    whatToAnalyze: 'Apa yang ingin Anda analisis hari ini?',
    marketOverview: 'Ringkasan Pasar',
    recentActivities: 'Aktivitas Terbaru'
  },
  
  // Topic Selection
  topicSelection: {
    title: 'Pilih Topik',
    uploadReport: {
      title: 'Upload Laporan',
      description: 'Unggah laporan keuangan perusahaan untuk analisis mendalam.'
    },
    stockAnalysis: {
      title: 'Analisa Saham',
      description: 'Dapatkan analisis saham yang komprehensif berdasarkan data terkini.'
    },
    stockRecommendations: {
      title: 'Rekomendasi Saham',
      description: 'Terima rekomendasi saham yang dipersonalisasi sesuai profil investasi Anda.'
    }
  },

  // Create with AI Onboarding
  onboarding: {
    createWithAI: {
      title: 'Bagaimana Anda ingin memulai?',
      stockAnalysis: {
        title: 'Analisis Saham',
        description: 'Analisis mendalam perusahaan pilihan Anda',
        badge: 'Disarankan'
      },
      uploadReport: {
        title: 'Upload Laporan',
        description: 'Upload laporan keuangan untuk analisis AI'
      },
      stockRecommendations: {
        title: 'Rekomendasi Saham',
        description: 'Rekomendasi personal berdasarkan profil Anda'
      }
    }
  },

  // Chat Interface
  chat: {
    placeholder: 'Ketik pesan Anda...',
    send: 'Kirim',
    typing: 'AI sedang mengetik...',
    selectCompany: 'Pilih Perusahaan',
    searchCompany: 'Cari perusahaan (contoh: Bank BCA, Telkom)',
    popularCompanies: 'Perusahaan Populer'
  },

  // AI Intelligence Levels
  ai: {
    level1: {
      name: 'Fakta Dokumen',
      description: 'Informasi langsung dari dokumen keuangan'
    },
    level2: {
      name: 'Analisis & Implikasi', 
      description: 'Analisis mendalam dengan implikasi investasi'
    },
    level3: {
      name: 'Panduan Portofolio',
      description: 'Rekomendasi portofolio personal'
    }
  },

  // Indonesian Stock Companies
  companies: {
    BBCA: {
      name: 'PT Bank Central Asia Tbk',
      sector: 'Perbankan'
    },
    TLKM: {
      name: 'PT Telkom Indonesia Tbk',
      sector: 'Telekomunikasi'
    },
    UNVR: {
      name: 'PT Unilever Indonesia Tbk',
      sector: 'Barang Konsumsi'
    },
    ASII: {
      name: 'PT Astra International Tbk',
      sector: 'Otomotif'
    },
    BMRI: {
      name: 'PT Bank Mandiri Tbk',
      sector: 'Perbankan'
    },
    BBRI: {
      name: 'PT Bank Rakyat Indonesia Tbk',
      sector: 'Perbankan'
    },
    INDF: {
      name: 'PT Indofood Sukses Makmur Tbk',
      sector: 'Makanan & Minuman'
    },
    ICBP: {
      name: 'PT Indofood CBP Sukses Makmur Tbk',
      sector: 'Makanan & Minuman'
    }
  },

  // Common UI Elements
  common: {
    back: 'Kembali',
    next: 'Lanjut',
    cancel: 'Batal',
    save: 'Simpan',
    loading: 'Memuat...',
    error: 'Terjadi kesalahan',
    tryAgain: 'Coba Lagi',
    home: 'Beranda',
    profile: 'Profil',
    settings: 'Pengaturan'
  }
};

// English translations (for reference/fallback)
export const englishTranslations = {
  dashboard: {
    goodMorning: 'Good morning! 👋',
    goodAfternoon: 'Good afternoon! 👋',
    goodEvening: 'Good evening! 👋',
    searchPlaceholder: 'Search stocks or companies...',
    analyzeStock: 'Analyze Stock',
    uploadReport: 'Upload Report',
    aiChat: 'AI Chat',
    whatToAnalyze: 'What would you like to analyze today?',
    marketOverview: 'Market Overview',
    recentActivities: 'Recent Activities'
  },
  
  // Topic Selection
  topicSelection: {
    title: 'Select Topic',
    uploadReport: {
      title: 'Upload Report',
      description: 'Upload company financial reports for in-depth analysis.'
    },
    stockAnalysis: {
      title: 'Stock Analysis',
      description: 'Get comprehensive stock analysis based on current data.'
    },
    stockRecommendations: {
      title: 'Stock Recommendations',
      description: 'Receive personalized stock recommendations based on your investment profile.'
    }
  },

  // Create with AI Onboarding
  onboarding: {
    createWithAI: {
      title: 'How would you like to get started?',
      stockAnalysis: {
        title: 'Stock Analysis',
        description: 'In-depth analysis of your chosen companies',
        badge: 'Recommended'
      },
      uploadReport: {
        title: 'Upload Report',
        description: 'Upload financial reports for AI analysis'
      },
      stockRecommendations: {
        title: 'Stock Recommendations',
        description: 'Personal recommendations based on your profile'
      }
    }
  },

  // Chat Interface
  chat: {
    placeholder: 'Type your message...',
    send: 'Send',
    typing: 'AI is typing...',
    selectCompany: 'Select Company',
    searchCompany: 'Search company (e.g., Bank BCA, Telkom)',
    popularCompanies: 'Popular Companies'
  },

  // AI Intelligence Levels
  ai: {
    level1: {
      name: 'Document Facts',
      description: 'Direct information from financial documents'
    },
    level2: {
      name: 'Analysis & Implications',
      description: 'In-depth analysis with investment implications'
    },
    level3: {
      name: 'Portfolio Guidance',
      description: 'Personal portfolio recommendations'
    }
  },

  // Indonesian Stock Companies
  companies: {
    BBCA: {
      name: 'PT Bank Central Asia Tbk',
      sector: 'Banking'
    },
    TLKM: {
      name: 'PT Telkom Indonesia Tbk',
      sector: 'Telecommunications'
    },
    UNVR: {
      name: 'PT Unilever Indonesia Tbk',
      sector: 'Consumer Goods'
    },
    ASII: {
      name: 'PT Astra International Tbk',
      sector: 'Automotive'
    },
    BMRI: {
      name: 'PT Bank Mandiri Tbk',
      sector: 'Banking'
    },
    BBRI: {
      name: 'PT Bank Rakyat Indonesia Tbk',
      sector: 'Banking'
    },
    INDF: {
      name: 'PT Indofood Sukses Makmur Tbk',
      sector: 'Food & Beverage'
    },
    ICBP: {
      name: 'PT Indofood CBP Sukses Makmur Tbk',
      sector: 'Food & Beverage'
    }
  },

  // Common UI Elements
  common: {
    back: 'Back',
    next: 'Next',
    cancel: 'Cancel',
    save: 'Save',
    loading: 'Loading...',
    error: 'An error occurred',
    tryAgain: 'Try Again',
    home: 'Home',
    profile: 'Profile',
    settings: 'Settings'
  }
};

// Language context types
export type Language = 'id' | 'en';
export type Translations = typeof indonesianTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isIndonesian: boolean;
}

// Create language context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language provider component
interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  defaultLanguage = 'id' // Default to Indonesian
}) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  
  const translations = language === 'id' ? indonesianTranslations : englishTranslations;
  
  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations,
    isIndonesian: language === 'id'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Utility hook for translations
export const useTranslation = () => {
  const { t, isIndonesian } = useLanguage();
  return { t, isIndonesian };
};

// Indonesian company data
export interface IndonesianCompany {
  kode: string;
  nama: string;
  sektor: string;
  deskripsi?: string;
}

export const indonesianCompanies: IndonesianCompany[] = [
  {
    kode: 'BBCA',
    nama: 'PT Bank Central Asia Tbk',
    sektor: 'Perbankan',
    deskripsi: 'Bank swasta terbesar di Indonesia'
  },
  {
    kode: 'TLKM', 
    nama: 'PT Telkom Indonesia Tbk',
    sektor: 'Telekomunikasi',
    deskripsi: 'Perusahaan telekomunikasi BUMN terbesar'
  },
  {
    kode: 'UNVR',
    nama: 'PT Unilever Indonesia Tbk', 
    sektor: 'Barang Konsumsi',
    deskripsi: 'Produsen barang konsumsi multinasional'
  },
  {
    kode: 'ASII',
    nama: 'PT Astra International Tbk',
    sektor: 'Otomotif',
    deskripsi: 'Konglomerat otomotif dan heavy equipment'
  },
  {
    kode: 'BMRI',
    nama: 'PT Bank Mandiri Tbk',
    sektor: 'Perbankan',
    deskripsi: 'Bank BUMN terbesar di Indonesia'
  },
  {
    kode: 'BBRI',
    nama: 'PT Bank Rakyat Indonesia Tbk',
    sektor: 'Perbankan', 
    deskripsi: 'Bank dengan jaringan mikro terluas'
  },
  {
    kode: 'INDF',
    nama: 'PT Indofood Sukses Makmur Tbk',
    sektor: 'Makanan & Minuman',
    deskripsi: 'Produsen makanan dan minuman terbesar'
  },
  {
    kode: 'ICBP',
    nama: 'PT Indofood CBP Sukses Makmur Tbk',
    sektor: 'Makanan & Minuman',
    deskripsi: 'Anak perusahaan Indofood untuk consumer goods'
  }
];
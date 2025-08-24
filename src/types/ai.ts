// AI Intelligence Levels for Indonesian Financial Analysis
// Based on StockSavvy design specifications

export type AILevel = 1 | 2 | 3;

export interface AICapability {
  level: AILevel;
  name: string;
  description: string;
  features: string[];
  indonesianName: string;
  indonesianDescription: string;
}

// AI Level Definitions
export const AI_LEVELS: Record<AILevel, AICapability> = {
  1: {
    level: 1,
    name: 'Document-Based Facts',
    description: 'Direct answers based on financial document data',
    features: [
      'Revenue and profit data extraction',
      'Financial ratios calculation',
      'Historical performance metrics',
      'Basic company information'
    ],
    indonesianName: 'Fakta Berdasarkan Dokumen',
    indonesianDescription: 'Jawaban langsung berdasarkan data dokumen keuangan'
  },
  2: {
    level: 2,
    name: 'Analysis & Implications',
    description: 'Comprehensive analysis with investment implications',
    features: [
      'Financial trend analysis',
      'Investment implications',
      'Risk assessment',
      'Comparative analysis',
      'Buy/Hold/Sell recommendations',
      'Market outlook projections'
    ],
    indonesianName: 'Analisis & Implikasi',
    indonesianDescription: 'Analisis komprehensif dengan implikasi investasi'
  },
  3: {
    level: 3,
    name: 'Portfolio Guidance',
    description: 'Comprehensive portfolio management and guidance',
    features: [
      'Portfolio allocation recommendations',
      'Diversification strategies',
      'Risk management guidance',
      'Personalized investment planning',
      'Market timing suggestions',
      'Long-term wealth building strategies'
    ],
    indonesianName: 'Panduan Portofolio',
    indonesianDescription: 'Panduan manajemen portofolio komprehensif'
  }
};

// AI Response Types for Different Analysis Levels
export interface Level1Response {
  level: 1;
  jawaban: string; // Indonesian answer
  sumber: string; // Source document
  confidence: number; // 0-100%
  dataPoint: {
    metrik: string; // "Pendapatan", "Laba", "ROE", etc.
    nilai: number | string;
    periode: string; // "Q1 2024", "2023", etc.
    satuan?: string; // "Rp triliun", "%", etc.
  };
  perusahaan: {
    nama: string; // "PT Telkom Indonesia"
    kode: string; // "TLKM"
    sektor: string;
  };
  timestamp: Date;
}

export interface Level2Response {
  level: 2;
  analisis: string; // Comprehensive analysis in Indonesian
  implikasi: string[]; // List of implications
  rekomendasi: 'beli' | 'tahan' | 'jual' | 'akumulasi'; // Indonesian recommendation
  alasan: string; // Reasoning behind recommendation
  faktorRisiko: string[]; // Risk factors
  faktorPositif: string[]; // Positive factors
  outlook: {
    jangkaPendek: string; // Short-term outlook (1-3 months)
    jangkaMenengah: string; // Medium-term outlook (3-12 months)
    jangkaPanjang?: string; // Long-term outlook (1+ years)
  };
  skorKesehatan: {
    fundamental: number; // 1-10 scale
    teknikal: number; // 1-10 scale
    sentimen: number; // 1-10 scale
    overall: number; // 1-10 scale
  };
  targetHarga: {
    rendah: number;
    menengah: number;
    tinggi: number;
    horizon: string; // "12 bulan", "6 bulan"
  };
  perusahaan: {
    nama: string;
    kode: string;
    sektor: string;
  };
  confidence: number;
  timestamp: Date;
}

export interface Level3Response {
  level: 3;
  rekomendasiPortofolio: {
    alokasi: {
      saham: number; // percentage
      obligasi: number;
      kas: number;
      komoditas?: number;
    };
    diversifikasi: {
      sektor: Record<string, number>; // sector allocation percentages
      kapitalisasi: {
        large: number;
        mid: number;
        small: number;
      };
      geografis?: {
        domestik: number;
        regional: number;
        global: number;
      };
    };
    risikoProfile: 'konservatif' | 'moderat' | 'agresif';
    horizonInvestasi: string; // "5 tahun", "10 tahun"
    targetReturn: {
      tahunan: number; // percentage
      total: number; // percentage over horizon
    };
  };
  saranRebalancing: {
    frekuensi: string; // "Bulanan", "Kuartalan"
    pemicu: string[]; // triggers for rebalancing
  };
  perusahaan?: {
    nama: string;
    kode: string;
    kontribusiPortofolio: number; // percentage
  };
  confidence: number;
  timestamp: Date;
}

export type AIResponse = Level1Response | Level2Response | Level3Response;

// AI Analysis Context
export interface AnalysisContext {
  topic: 'analisa-saham' | 'upload-laporan' | 'rekomendasi-saham';
  company?: {
    kode: string;
    nama: string;
    sektor: string;
  };
  userProfile?: {
    risikoToleransi: 'rendah' | 'menengah' | 'tinggi';
    horizonInvestasi: string;
    pengalamanInvestasi: 'pemula' | 'menengah' | 'berpengalaman';
    tujuanInvestasi: string[];
  };
  previousContext?: AIResponse[];
}

// AI Service Interface
export interface AIService {
  analyzeStock(
    company: string,
    level: AILevel,
    context?: AnalysisContext
  ): Promise<AIResponse>;
  
  upgradeAnalysis(
    previousResponse: AIResponse,
    newLevel: AILevel
  ): Promise<AIResponse>;
  
  validateResponse(response: AIResponse): boolean;
  
  getCapabilities(level: AILevel): AICapability;
}

// Mock AI Response Generator (for development)
export class MockIndonesianAI implements AIService {
  async analyzeStock(
    company: string,
    level: AILevel,
    context?: AnalysisContext
  ): Promise<AIResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const baseCompany = {
      nama: `PT ${company}`,
      kode: company.toUpperCase(),
      sektor: this.getRandomSector()
    };

    switch (level) {
      case 1:
        return this.generateLevel1Response(baseCompany);
      case 2:
        return this.generateLevel2Response(baseCompany);
      case 3:
        return this.generateLevel3Response(baseCompany);
      default:
        throw new Error(`Unsupported AI level: ${level}`);
    }
  }

  async upgradeAnalysis(
    previousResponse: AIResponse,
    newLevel: AILevel
  ): Promise<AIResponse> {
    if (newLevel <= previousResponse.level) {
      throw new Error('Cannot downgrade analysis level');
    }
    
    return this.analyzeStock(
      previousResponse.perusahaan?.kode || 'UNKNOWN',
      newLevel
    );
  }

  validateResponse(response: AIResponse): boolean {
    return response.confidence >= 70 && response.timestamp instanceof Date;
  }

  getCapabilities(level: AILevel): AICapability {
    return AI_LEVELS[level];
  }

  private generateLevel1Response(company: any): Level1Response {
    const metrics = ['Pendapatan', 'Laba Bersih', 'ROE', 'ROA', 'Debt-to-Equity'];
    const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
    
    return {
      level: 1,
      jawaban: `Berdasarkan laporan keuangan terbaru, ${company.nama} mencatat ${randomMetric} sebesar ${this.getRandomValue(randomMetric)}.`,
      sumber: 'Laporan Keuangan Q3 2024',
      confidence: Math.floor(Math.random() * 20) + 80,
      dataPoint: {
        metrik: randomMetric,
        nilai: this.getRandomValue(randomMetric),
        periode: 'Q3 2024',
        satuan: this.getSatuan(randomMetric)
      },
      perusahaan: company,
      timestamp: new Date()
    };
  }

  private generateLevel2Response(company: any): Level2Response {
    return {
      level: 2,
      analisis: `Analisis komprehensif ${company.nama} menunjukkan kinerja yang solid dengan pertumbuhan fundamental yang stabil. Perusahaan memiliki posisi kompetitif yang kuat di sektor ${company.sektor}.`,
      implikasi: [
        'Pertumbuhan pendapatan yang konsisten',
        'Margin laba yang membaik',
        'Posisi kas yang kuat untuk ekspansi'
      ],
      rekomendasi: ['beli', 'tahan', 'akumulasi'][Math.floor(Math.random() * 3)] as any,
      alasan: 'Fundamentals kuat dengan outlook positif jangka menengah',
      faktorRisiko: ['Volatilitas pasar', 'Persaingan industri', 'Regulasi pemerintah'],
      faktorPositif: ['Brand recognition tinggi', 'Market share dominan', 'Efisiensi operasional'],
      outlook: {
        jangkaPendek: 'Positif dengan potensi kenaikan moderat',
        jangkaMenengah: 'Sangat positif dengan growth catalyst yang jelas',
        jangkaPanjang: 'Outlook stabil dengan dividen yang berkelanjutan'
      },
      skorKesehatan: {
        fundamental: Math.floor(Math.random() * 3) + 7,
        teknikal: Math.floor(Math.random() * 3) + 7,
        sentimen: Math.floor(Math.random() * 3) + 6,
        overall: Math.floor(Math.random() * 2) + 8
      },
      targetHarga: {
        rendah: 4200,
        menengah: 4800,
        tinggi: 5400,
        horizon: '12 bulan'
      },
      perusahaan: company,
      confidence: Math.floor(Math.random() * 15) + 85,
      timestamp: new Date()
    };
  }

  private generateLevel3Response(company: any): Level3Response {
    return {
      level: 3,
      rekomendasiPortofolio: {
        alokasi: {
          saham: 70,
          obligasi: 25,
          kas: 5
        },
        diversifikasi: {
          sektor: {
            'Perbankan': 30,
            'Telekomunikasi': 20,
            'Barang Konsumsi': 25,
            'Energi': 15,
            'Teknologi': 10
          },
          kapitalisasi: {
            large: 60,
            mid: 30,
            small: 10
          }
        },
        risikoProfile: 'moderat',
        horizonInvestasi: '5 tahun',
        targetReturn: {
          tahunan: 12,
          total: 75
        }
      },
      saranRebalancing: {
        frekuensi: 'Kuartalan',
        pemicu: ['Deviasi alokasi > 5%', 'Perubahan fundamental signifikan', 'Siklus pasar']
      },
      perusahaan: {
        ...company,
        kontribusiPortofolio: 8
      },
      confidence: 90,
      timestamp: new Date()
    };
  }

  private getRandomSector(): string {
    const sectors = ['Perbankan', 'Telekomunikasi', 'Barang Konsumsi', 'Otomotif', 'Makanan & Minuman'];
    return sectors[Math.floor(Math.random() * sectors.length)];
  }

  private getRandomValue(metric: string): number | string {
    switch (metric) {
      case 'Pendapatan':
        return `Rp ${(Math.random() * 50 + 10).toFixed(1)} triliun`;
      case 'Laba Bersih':
        return `Rp ${(Math.random() * 10 + 2).toFixed(1)} triliun`;
      case 'ROE':
      case 'ROA':
        return `${(Math.random() * 15 + 5).toFixed(1)}%`;
      case 'Debt-to-Equity':
        return (Math.random() * 0.8 + 0.2).toFixed(2);
      default:
        return 'N/A';
    }
  }

  private getSatuan(metric: string): string {
    switch (metric) {
      case 'Pendapatan':
      case 'Laba Bersih':
        return 'Rp triliun';
      case 'ROE':
      case 'ROA':
        return '%';
      case 'Debt-to-Equity':
        return 'ratio';
      default:
        return '';
    }
  }
}

// Export singleton instance
export const indonesianAI = new MockIndonesianAI();
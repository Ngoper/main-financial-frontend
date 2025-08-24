import React, { useState, useEffect } from 'react';
import { IndonesianCompany, indonesianCompanies, useTranslation } from '../localization/LanguageProvider';

interface CompanySelectorProps {
  onCompanySelect: (company: IndonesianCompany) => void;
  placeholder?: string;
  popularCompanies?: IndonesianCompany[];
  className?: string;
  showPopular?: boolean;
}

const CompanySelector: React.FC<CompanySelectorProps> = ({
  onCompanySelect,
  placeholder,
  popularCompanies = indonesianCompanies.slice(0, 6), // Top 6 companies
  className = '',
  showPopular = true
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState<IndonesianCompany[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<IndonesianCompany | null>(null);

  const defaultPlaceholder = placeholder || t.chat.searchCompany;

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const filtered = indonesianCompanies.filter(company =>
        company.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.kode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.sektor.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCompanies(filtered);
      setIsOpen(true);
    } else {
      setFilteredCompanies([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

  const handleCompanySelect = (company: IndonesianCompany) => {
    setSelectedCompany(company);
    setSearchQuery(company.nama);
    setIsOpen(false);
    onCompanySelect(company);
  };

  const handlePopularCompanySelect = (company: IndonesianCompany) => {
    handleCompanySelect(company);
  };

  const getSectorIcon = (sektor: string) => {
    switch (sektor.toLowerCase()) {
      case 'perbankan':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="#0d80f2" viewBox="0 0 256 256">
            <path d="M248,208a8,8,0,0,1-8,8H16a8,8,0,0,1,0-16H32V72a8,8,0,0,1,16,0V200H64V104a8,8,0,0,1,16,0v96H96V136a8,8,0,0,1,16,0v64h16V104a8,8,0,0,1,16,0v96h16V72a8,8,0,0,1,16,0V200h16V40a8,8,0,0,1,16,0V200h16V104a8,8,0,0,1,16,0v96h48A8,8,0,0,1,248,208Z"></path>
          </svg>
        );
      case 'telekomunikasi':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="#0d80f2" viewBox="0 0 256 256">
            <path d="M144,18.43a8,8,0,0,1,16,0V40a72.08,72.08,0,0,1,72,72v8a8,8,0,0,1-16,0v-8a56.06,56.06,0,0,0-56-56V80a8,8,0,0,1-16,0ZM112,56v96a8,8,0,0,1-16,0V56a8,8,0,0,1,16,0Zm-32,8v88a8,8,0,0,1-16,0V64a8,8,0,0,1,16,0ZM48,72v80a8,8,0,0,1-16,0V72a8,8,0,0,1,16,0Zm176,40v40a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM160,120v32a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Z"></path>
          </svg>
        );
      case 'barang konsumsi':
      case 'makanan & minuman':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="#0d80f2" viewBox="0 0 256 256">
            <path d="M224,48H208V32a16,16,0,0,0-16-16H64A16,16,0,0,0,48,32V48H32a8,8,0,0,0,0,16H48V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h16a8,8,0,0,0,0-16ZM192,208H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
          </svg>
        );
      case 'otomotif':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="#0d80f2" viewBox="0 0 256 256">
            <path d="M240,104H228.64L201.25,56.06A16,16,0,0,0,187.36,48H68.64a16,16,0,0,0-13.89,8.06L27.36,104H16a8,8,0,0,0,0,16h8v80a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V184h96v16a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16V120h8a8,8,0,0,0,0-16ZM68.64,64H187.36l24,40H44.64ZM64,200H40V184H64Zm128,0V184h24v16Zm24-32H40V120H216ZM56,144a8,8,0,0,1,8-8H80a8,8,0,0,1,0,16H64A8,8,0,0,1,56,144Zm120,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H184A8,8,0,0,1,176,144Z"></path>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="#0d80f2" viewBox="0 0 256 256">
            <path d="M224,80V192a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V80A16,16,0,0,1,48,64H208A16,16,0,0,1,224,80ZM48,80V192H208V80Z"></path>
          </svg>
        );
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={defaultPlaceholder}
          className="w-full p-4 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#182634] text-[#0d141c] dark:text-white placeholder-[#49739c] dark:placeholder-[#90bccb] focus:outline-none focus:ring-2 focus:ring-[#0d80f2] focus:border-transparent text-base"
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#49739c] dark:text-[#90bccb]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && filteredCompanies.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#182634] border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
          {filteredCompanies.map((company) => (
            <div
              key={company.kode}
              onClick={() => handleCompanySelect(company)}
              className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-[#223649] cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <div className="flex-shrink-0">
                {getSectorIcon(company.sektor)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#0d141c] dark:text-white text-sm">
                    {company.kode}
                  </span>
                  <span className="text-xs bg-gray-100 dark:bg-[#2a3f52] text-[#49739c] dark:text-[#90bccb] px-2 py-1 rounded">
                    {company.sektor}
                  </span>
                </div>
                <p className="text-sm text-[#0d141c] dark:text-white font-medium truncate">
                  {company.nama}
                </p>
                {company.deskripsi && (
                  <p className="text-xs text-[#49739c] dark:text-[#90bccb] truncate">
                    {company.deskripsi}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Popular Companies Section */}
      {showPopular && !searchQuery && (
        <div className="mt-6">
          <h3 className="text-[#0d141c] dark:text-white font-semibold text-base mb-4">
            {t.chat.popularCompanies}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {popularCompanies.map((company) => (
              <div
                key={company.kode}
                onClick={() => handlePopularCompanySelect(company)}
                className="flex items-center gap-3 p-4 bg-white dark:bg-[#182634] rounded-xl border border-gray-200 dark:border-gray-600 hover:border-[#0d80f2] hover:shadow-md cursor-pointer transition-all duration-200"
              >
                <div className="flex-shrink-0">
                  {getSectorIcon(company.sektor)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-[#0d80f2] text-sm">
                      {company.kode}
                    </span>
                    <span className="text-xs bg-gray-100 dark:bg-[#2a3f52] text-[#49739c] dark:text-[#90bccb] px-2 py-1 rounded">
                      {company.sektor}
                    </span>
                  </div>
                  <p className="text-sm text-[#0d141c] dark:text-white font-medium truncate">
                    {company.nama}
                  </p>
                </div>
                <div className="text-[#49739c] dark:text-[#90bccb]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="m221.66,133.66-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchQuery.length >= 2 && filteredCompanies.length === 0 && (
        <div className="mt-4 p-4 text-center text-[#49739c] dark:text-[#90bccb] bg-gray-50 dark:bg-[#182634] rounded-xl">
          <p className="text-sm">Tidak ada perusahaan yang ditemukan</p>
          <p className="text-xs mt-1">Coba kata kunci lain atau pilih dari perusahaan populer</p>
        </div>
      )}
    </div>
  );
};

export default CompanySelector;
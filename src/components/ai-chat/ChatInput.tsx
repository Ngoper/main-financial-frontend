import React, { useRef } from 'react';
import { IonButton, IonIcon, IonTextarea, IonChip, IonLabel } from '@ionic/react';
import { add, send } from 'ionicons/icons';
import { useTranslation } from '../../i18n/TranslationContext';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  showUpload?: boolean;
  onFileSelect?: (files: File[]) => void;
  selectedLevel?: 'newbie' | 'novice' | 'expert';
  onLevelChange?: (level: 'newbie' | 'novice' | 'expert') => void;
  selectedFiles?: File[];
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  showUpload = false,
  onFileSelect,
  selectedLevel = 'newbie',
  onLevelChange,
  selectedFiles = [],
  isLoading = false
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && onFileSelect) {
      const filesArray = Array.from(e.target.files);
      onFileSelect(filesArray);
    }
  };

  return (
    <div className="chat-input-area">
      <div className="contextual-options">
        <IonChip 
          className={selectedLevel === 'newbie' ? 'active' : ''}
          onClick={() => onLevelChange?.('newbie')}
        >
          <IonLabel>{t('chat.level.newbie')}</IonLabel>
        </IonChip>
        <IonChip 
          className={selectedLevel === 'novice' ? 'active' : ''}
          onClick={() => onLevelChange?.('novice')}
        >
          <IonLabel>{t('chat.level.novice')}</IonLabel>
        </IonChip>
        <IonChip 
          className={selectedLevel === 'expert' ? 'active' : ''}
          onClick={() => onLevelChange?.('expert')}
        >
          <IonLabel>{t('chat.level.expert')}</IonLabel>
        </IonChip>
      </div>
      <div className="input-wrapper">
        {showUpload && (
          <>
            <IonButton fill="clear" onClick={handleFileClick} className="upload-btn">
              <IonIcon icon={add} />
            </IonButton>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.docx,.pptx,.txt,.html,.csv,.xlsx"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </>
        )}
        {selectedFiles && selectedFiles.length > 0 && (
          <div className="selected-files">
            {selectedFiles.map((file, index) => (
              <div key={index} className="selected-file">
                <span>📎 {file.name}</span>
              </div>
            ))}
          </div>
        )}
        <IonTextarea
          value={value}
          onIonInput={(e) => onChange(e.detail.value || '')}
          placeholder={t('chat.inputPlaceholder')}
          autoGrow
          rows={1}
          className="chat-input"
          disabled={isLoading}
        />
        <IonButton onClick={onSend} className="send-btn" disabled={isLoading || !value.trim()}>
          <IonIcon icon={send} />
        </IonButton>
      </div>
    </div>
  );
};

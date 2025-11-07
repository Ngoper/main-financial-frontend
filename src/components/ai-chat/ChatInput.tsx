import React, { useRef } from 'react';
import { IonButton, IonIcon, IonTextarea, IonChip, IonLabel } from '@ionic/react';
import { add, send } from 'ionicons/icons';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  showUpload?: boolean;
  onFileSelect?: (file: File) => void;
  selectedLevel?: 'newbie' | 'novice' | 'expert';
  onLevelChange?: (level: 'newbie' | 'novice' | 'expert') => void;
  selectedFile?: File | null;
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
  selectedFile,
  isLoading = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && onFileSelect) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="chat-input-area">
      <div className="contextual-options">
        <IonChip 
          className={selectedLevel === 'newbie' ? 'active' : ''}
          onClick={() => onLevelChange?.('newbie')}
        >
          <IonLabel>Pemula</IonLabel>
        </IonChip>
        <IonChip 
          className={selectedLevel === 'novice' ? 'active' : ''}
          onClick={() => onLevelChange?.('novice')}
        >
          <IonLabel>Intermediate</IonLabel>
        </IonChip>
        <IonChip 
          className={selectedLevel === 'expert' ? 'active' : ''}
          onClick={() => onLevelChange?.('expert')}
        >
          <IonLabel>Advanced</IonLabel>
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
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </>
        )}
        {selectedFile && (
          <div className="selected-file">
            <span>📎 {selectedFile.name}</span>
          </div>
        )}
        <IonTextarea
          value={value}
          onIonInput={(e) => onChange(e.detail.value || '')}
          placeholder="Tanyakan apa saja tentang investasi..."
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

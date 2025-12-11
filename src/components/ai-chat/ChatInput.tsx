import React, { useRef } from 'react';
import { IonButton, IonIcon, IonTextarea, IonChip, IonLabel } from '@ionic/react';
import { add, send } from 'ionicons/icons';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  showUpload?: boolean;
  onFileSelect?: (files: File[]) => void;
  selectedLevel?: 1 | 2 | 3;
  onLevelChange?: (level: 1 | 2 | 3) => void;
  selectedFiles?: File[];
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  showUpload = false,
  onFileSelect,
  selectedLevel = 1,
  onLevelChange,
  selectedFiles = [],
  isLoading = false
}) => {
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
          className={selectedLevel === 1 ? 'active' : ''}
          onClick={() => onLevelChange?.(1)}
        >
          <IonLabel>Pemula</IonLabel>
        </IonChip>
        <IonChip 
          className={selectedLevel === 2 ? 'active' : ''}
          onClick={() => onLevelChange?.(2)}
        >
          <IonLabel>Intermediate</IonLabel>
        </IonChip>
        <IonChip 
          className={selectedLevel === 3 ? 'active' : ''}
          onClick={() => onLevelChange?.(3)}
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

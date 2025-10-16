import React, { useRef } from 'react';
import { IonButton, IonIcon, IonTextarea } from '@ionic/react';
import { add, send } from 'ionicons/icons';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  showUpload?: boolean;
  onFileSelect?: (file: File) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  showUpload = false,
  onFileSelect
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
        <IonTextarea
          value={value}
          onIonInput={(e) => onChange(e.detail.value || '')}
          placeholder="Tanyakan apa saja tentang investasi..."
          autoGrow
          rows={1}
          className="chat-input"
        />
        <IonButton onClick={onSend} className="send-btn">
          <IonIcon icon={send} />
        </IonButton>
      </div>
    </div>
  );
};

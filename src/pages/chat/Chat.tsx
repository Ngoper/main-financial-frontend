import { IonContent, IonPage } from '@ionic/react';
import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! How can I help you with your stock analysis today?",
      sender: "AI Assistant",
      isUser: false,
      timestamp: "10:00 AM"
    },
    {
      id: 2,
      text: "I'm interested in getting some recommendations for tech stocks.",
      sender: "You",
      isUser: true,
      timestamp: "10:02 AM"
    },
    {
      id: 3,
      text: "Sure, I can help with that. Based on current market trends, I recommend looking into companies like TechCorp, Innovate Solutions, and FutureTech.",
      sender: "AI Assistant",
      isUser: false,
      timestamp: "10:03 AM"
    },
    {
      id: 4,
      text: "Thanks! Can you provide some analysis on TechCorp?",
      sender: "You",
      isUser: true,
      timestamp: "10:05 AM"
    }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "You",
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: "TechCorp has shown strong quarterly growth with a 15% increase in revenue this year. Their debt-to-equity ratio is healthy at 0.4, and their ROE stands at 18%. Overall, it's a solid investment opportunity.",
        sender: "AI Assistant",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <IonPage>
      <Header title="Chat" />
      <IonContent fullscreen>
        <div
          className="relative flex size-full min-h-screen flex-col bg-slate-50 dark:bg-[#101e23] justify-between group/design-root overflow-x-hidden"
        >
          <div>
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex items-end gap-3 p-4 ${message.isUser ? 'justify-end' : ''}`}
              >
                {!message.isUser && (
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                    style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCKheyW4GLIC_Z7uNZzHV7iauEthNG3RCrjXzRBFyCTRnY8u8sS_2rRRnc6xIrMZomBIdGXs4szLRXnraWB87Aoy7tnwnxFSYthopSLnzZkiqMAmI6tq6pTx2Yj64gDi9fW_eL3AsfqfcUnXcBKY3pWjKN_fYnZZwPswcdfINUuovzWNmyFlWfet9kqwCD2UUQoAv626UM2DnqT0VsRH9fGZEkPpj_4wAq05Jg3Rw4hrRJCRI2OL1HuVjtok8JX2x-aEZ583BBl1X9i")'}}
                  ></div>
                )}
                <div className={`flex flex-1 flex-col gap-1 ${message.isUser ? 'items-end' : 'items-start'}`}>
                  <p className={`text-[13px] font-normal leading-normal max-w-[360px] ${message.isUser ? 'text-[#49739c] dark:text-[#90bccb]' : 'text-[#49739c] dark:text-[#90bccb]'}`}>
                    {message.sender}
                  </p>
                  <p className={`text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 ${message.isUser ? 'bg-[#0d80f2] text-slate-50 dark:text-[#101e23]' : 'bg-[#e7edf4] dark:bg-[#223f49] text-[#0d141c] dark:text-white'}`}>
                    {message.text}
                  </p>
                </div>
                {message.isUser && (
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                    style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCOoa6KqDVxHwZtZ5M5tsaZGeyP-01CLiAL4L7YrsJkYN1K7fwRRTO3dk9ELWvzxe-RLdgM9hcdaLsv-_dZYqyM7u1Ctd8IbzuEiY-yto8cH6xTGHl9BzFGEvJcjcF2bb9NG9TJ0YOCW26nkrfl2ZvjEcUyQD_nZ_kum_W5lti8xIjjSjJSray1PY7ZcuToS4ZrhivgkWpigUwvAyfEWWDiJKl0GmYhJFEyk1pNNfLDHhDKGgV5bJ-UCxbAAe4Ee5qTvwpvRBzpK2Sk")'}}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center px-4 py-3 gap-3 @container">
              <label className="flex flex-col min-w-40 h-12 flex-1">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <input
                    placeholder="Type a message"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d141c] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#e7edf4] dark:bg-[#223f49] focus:border-none h-full placeholder:text-[#49739c] dark:placeholder:text-[#90bccb] px-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <div className="flex border-none bg-[#e7edf4] dark:bg-[#223f49] items-center justify-center pr-4 rounded-r-xl border-l-0 !pr-2">
                    <div className="flex items-center gap-4 justify-end">
                      <div className="flex items-center gap-1">
                        <button className="flex items-center justify-center p-1.5">
                          <div className="text-[#49739c] dark:text-[#90bccb]" data-icon="Image" data-size="20px" data-weight="regular">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                              <path
                                d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"
                              ></path>
                            </svg>
                          </div>
                        </button>
                      </div>
                      <button
                        className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#0d80f2] text-slate-50 dark:text-[#101e23] text-sm font-medium leading-normal hidden @[480px]:block"
                        onClick={handleSendMessage}
                      >
                        <span className="truncate">Send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Chat;
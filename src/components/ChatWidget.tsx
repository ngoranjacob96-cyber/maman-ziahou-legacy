import React, { useState } from 'react';
import { MessageCircle, Send, X, User, Bot, Image, Video, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  title: string;
  description?: string;
  duration?: string;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  media?: {
    type: 'image' | 'video' | 'gallery';
    items: MediaItem[];
  };
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Salut ! Moi c\'est Joël, votre assistant E.E.R.E.B 😊 Je peux vous aider avec les horaires, infos sur Maman ZIAHOU, ou vous montrer nos vidéos et photos ! Que puis-je faire pour vous ?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: inputMessage }
      });

      if (error) {
        throw error;
      }

      // Try to parse the response as JSON first (for media content)
      let responseText;
      let mediaData = null;
      
      try {
        const parsedResponse = JSON.parse(data.response);
        if (parsedResponse.response && parsedResponse.media) {
          responseText = parsedResponse.response;
          mediaData = parsedResponse.media;
        } else {
          responseText = data.response;
        }
      } catch {
        // If it's not JSON, use as regular text
        responseText = data.response;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
        ...(mediaData && { media: mediaData })
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le message. Veuillez réessayer.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickMediaMessage = (type: 'images' | 'videos') => {
    const message = type === 'images' ? 'Montre-moi des photos de l\'église' : 'Montre-moi les vidéos de prédication';
    setInputMessage(message);
  };

  const renderMediaContent = (media: MediaItem[]) => {
    return (
      <div className="mt-2 space-y-2">
        {media.map((item, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            {item.type === 'image' ? (
              <div>
                <img 
                  src={item.url} 
                  alt={item.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-2">
                  <p className="text-xs font-semibold">{item.title}</p>
                  {item.description && (
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="relative">
                  <div className="w-full h-32 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <Video className="h-8 w-8 text-primary" />
                  </div>
                  {item.duration && (
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">
                      {item.duration}
                    </span>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs font-semibold">{item.title}</p>
                  {item.description && (
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  )}
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline"
                  >
                    Voir la vidéo →
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary-glow text-primary-foreground"
        size="icon"
        aria-label="Ouvrir le chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-background border border-border rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <div>
                <span className="font-semibold">Joël • E.E.R.E.B</span>
                <p className="text-xs opacity-90">Assistant intelligent</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              size="icon"
              variant="ghost"
              className="h-6 w-6 text-primary-foreground hover:bg-primary-glow"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="p-3 bg-secondary/20 border-b border-border">
            <div className="flex space-x-2">
              <Button
                size="sm" 
                variant="outline"
                onClick={() => quickMediaMessage('images')}
                className="text-xs h-7"
              >
                <Image className="h-3 w-3 mr-1" />
                Photos
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => quickMediaMessage('videos')}
                className="text-xs h-7"
              >
                <Video className="h-3 w-3 mr-1" />
                Vidéos
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInputMessage('Horaires des cultes')}
                className="text-xs h-7"
              >
                <Camera className="h-3 w-3 mr-1" />
                Horaires
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-muted text-muted-foreground rounded-bl-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {!message.isUser && <Bot className="h-4 w-4 mt-1 flex-shrink-0" />}
                      <div className="flex-1">
                        <span className="text-sm leading-relaxed">{message.text}</span>
                        {message.media && renderMediaContent(message.media.items)}
                      </div>
                      {message.isUser && <User className="h-4 w-4 mt-1 flex-shrink-0" />}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-lg flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Posez votre question à Joël..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                size="icon"
                className="bg-primary hover:bg-primary-glow text-primary-foreground"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
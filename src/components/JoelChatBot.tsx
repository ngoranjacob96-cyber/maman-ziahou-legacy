import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, User, Bot, Image, Video, Sparkles, Volume2, Settings, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MediaItem {
  type: 'image' | 'video' | 'audio';
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
    type: 'image' | 'video' | 'audio' | 'gallery';
    items: MediaItem[];
  };
}

const JoelChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Salut ! Moi c\'est Joël 👋 Votre assistant intelligent E.E.R.E.B ! Je peux vous aider avec les horaires, infos sur Maman ZIAHOU, ou vous montrer nos photos et vidéos. Que puis-je faire pour vous ?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const quickAction = (message: string) => {
    setInputMessage(message);
  };

  const renderMediaContent = (media: MediaItem[]) => {
    return (
      <div className="mt-3 space-y-2">
        {media.map((item, index) => (
          <div key={index} className="border border-border rounded-xl overflow-hidden bg-background/50 backdrop-blur-sm">
            {item.type === 'image' ? (
              <div>
                <img 
                  src={item.url} 
                  alt={item.title}
                  className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-3">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                  )}
                </div>
              </div>
            ) : item.type === 'video' ? (
              <div>
                <div className="relative">
                  <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Video className="h-12 w-12 text-primary" />
                  </div>
                  {item.duration && (
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md">
                      {item.duration}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                  )}
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-primary hover:text-primary/80 transition-colors mt-2"
                  >
                    <Video className="h-3 w-3 mr-1" />
                    Voir la vidéo →
                  </a>
                </div>
              </div>
            ) : (
              // Audio content
              <div className="p-3">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                    <Volume2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                </div>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  <Volume2 className="h-3 w-3 mr-1" />
                  Écouter l'audio →
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Chat Button - Sans nom d'affichage */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 shadow-2xl bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:shadow-3xl hover:scale-110 transition-all duration-300 group"
        size="icon"
        aria-label="Ouvrir le chat"
      >
        <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
      </Button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="h-6 w-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="font-bold text-lg">Joël</span>
                <p className="text-xs opacity-90">Assistant E.E.R.E.B • En ligne</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-primary-foreground hover:bg-white/20 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="p-3 bg-secondary/10 border-b border-border/50">
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm" 
                variant="outline"
                onClick={() => quickAction('Montre-moi des photos de l\'église')}
                className="text-xs h-8 rounded-full hover:bg-primary/10"
              >
                <Image className="h-3 w-3 mr-1" />
                Photos
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => quickAction('Montre-moi les vidéos de prédication')}
                className="text-xs h-8 rounded-full hover:bg-primary/10"
              >
                <Video className="h-3 w-3 mr-1" />
                Vidéos
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => quickAction('Montre-moi des audios de prédication')}
                className="text-xs h-8 rounded-full hover:bg-primary/10"
              >
                <Volume2 className="h-3 w-3 mr-1" />
                Audios
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => quickAction('Quels sont les horaires des cultes ?')}
                className="text-xs h-8 rounded-full hover:bg-primary/10"
              >
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
                    className={`max-w-[85%] ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-md'
                        : 'bg-muted/50 text-foreground rounded-2xl rounded-bl-md'
                    } backdrop-blur-sm shadow-sm`}
                  >
                    <div className="p-3">
                      <div className="flex items-start space-x-2">
                        {!message.isUser && <Bot className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />}
                        <div className="flex-1">
                          <span className="text-sm leading-relaxed">{message.text}</span>
                          {message.media && renderMediaContent(message.media.items)}
                        </div>
                        {message.isUser && <User className="h-4 w-4 mt-1 flex-shrink-0" />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted/50 backdrop-blur-sm rounded-2xl rounded-bl-md p-3 flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm">
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
                placeholder="Écrivez votre message à Joël..."
                disabled={isLoading}
                className="flex-1 rounded-full border-2 focus:border-primary/50 bg-background/80"
              />
              <Button
                onClick={() => quickAction('J\'aimerais actualiser ma clé API OpenAI')}
                size="icon"
                variant="outline"
                className="rounded-full border-primary/30 hover:bg-primary/10"
                title="Actualiser la clé API OpenAI"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                size="icon"
                className="rounded-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-300"
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

export default JoelChatBot;
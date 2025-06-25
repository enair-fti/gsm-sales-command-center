
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from 'lucide-react';

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hi! I\'m your AI Sales Assistant. Ask me about your sales data, performance metrics, or specific advertisers.', timestamp: '09:00' },
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    "How is Providence pacing against Q3 goals?",
    "Show top 5 advertisers for this week",
    "List open orders with spot issues",
    "What's the YoY growth for automotive?",
    "Which accounts declined this month?",
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { type: 'user', content: input, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      let response = '';
      
      if (input.toLowerCase().includes('providence')) {
        response = 'Providence is currently pacing at 78% of Q4 goal with $1.2M in revenue. This is 12% ahead of last year\'s Q3 performance at this time.';
      } else if (input.toLowerCase().includes('top') && input.toLowerCase().includes('advertiser')) {
        response = 'Top 5 advertisers this week:\n1. AutoNation - $8,400\n2. Regional Medical - $6,200\n3. Premier Real Estate - $5,800\n4. Restaurant Group - $4,900\n5. Tech Solutions - $4,100';
      } else if (input.toLowerCase().includes('open orders')) {
        response = 'There are 4 open orders with issues:\n• Coffee Chain - Pending approval (high priority)\n• Restaurant - Spot conflict (high priority)\n• Gym Franchise - Awaiting creative\n• Law Firm - In production';
      } else if (input.toLowerCase().includes('automotive')) {
        response = 'Automotive category shows +18.5% YoY growth, contributing $542K this quarter. AutoNation leads with $45.2K spend.';
      } else if (input.toLowerCase().includes('declined')) {
        response = 'This month, 3 accounts declined: Tech Startup (-$1,400), Furniture Store (-$700), and Insurance Agency (-$700). Total impact: -$2,800.';
      } else {
        response = 'I understand you\'re asking about sales data. Could you be more specific? I can help with revenue metrics, advertiser performance, pacing analysis, or order status.';
      }

      const botMessage = { 
        type: 'bot', 
        content: response, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Search className="w-5 h-5" />
          <span>AI Sales Assistant</span>
        </CardTitle>
        <CardDescription>Ask questions about your sales performance</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Chat Messages */}
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="text-sm whitespace-pre-line">{message.content}</div>
                  <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Quick Questions */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Quick Questions</div>
          <div className="space-y-1">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="w-full text-left text-xs p-2 bg-gray-50 hover:bg-gray-100 rounded text-gray-700 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about sales data..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm">
            Send
          </Button>
        </div>
      </CardContent>
    </div>
  );
};

export default AIChatbot;

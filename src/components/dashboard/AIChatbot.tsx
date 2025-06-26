
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Mic, TrendingUp, AlertCircle } from 'lucide-react';

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      content: 'Hi! I\'m your AI Sales Assistant for broadcast media analytics. Ask me about pacing, advertiser performance, spot issues, or market trends.', 
      timestamp: '09:00' 
    },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const quickQuestions = [
    "Show pacing for healthcare advertisers in Boston",
    "Who are the top 5 advertisers by growth this month?",
    "Which advertisers have open orders with missing spots?",
    "Compare Q4 billing projections to actuals for Providence",
    "Show makegoods summary for automotive category",
    "What's the YoY growth for January vs last year?",
    "List advertisers with spot issues in the last 7 days",
    "Show Darwin system projections vs actual billing"
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { 
      type: 'user', 
      content: input, 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    setMessages(prev => [...prev, newMessage]);

    // Enhanced AI responses for broadcast media scenarios
    setTimeout(() => {
      let response = '';
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('pacing') && lowerInput.includes('healthcare')) {
        response = 'Healthcare Advertisers - Boston Market Pacing:\n\n• Regional Medical Center: 92.4% pacing ($38.7K actual vs $41.9K target)\n• Boston General Hospital: 78.2% pacing ($22.1K vs $28.3K)\n• Urgent Care Network: 115.6% pacing ($31.2K vs $27.0K)\n\nOverall Healthcare Category: 88.7% pacing with $91.9K total billing.';
      } else if (lowerInput.includes('top') && lowerInput.includes('growth')) {
        response = 'Top 5 Advertisers by Growth (Month-over-Month):\n\n1. Fitness First Gyms: +22.8% ($21.8K)\n2. Home Improvement Co: +18.0% ($18.2K)\n3. Premier Real Estate: +15.2% ($32.5K)\n4. AutoNation: +12.5% ($45.2K)\n5. Regional Medical: +8.3% ($38.7K)\n\nTotal portfolio growth: +14.2% vs last month.';
      } else if (lowerInput.includes('spot issues') || lowerInput.includes('missing spots')) {
        response = 'Advertisers with Open Spot Issues:\n\n🔴 High Priority:\n• Tech Solutions Inc: 4 missed spots, 3 makegoods pending\n• Premier Real Estate: 3 missed spots, 2 makegoods\n\n🟡 Medium Priority:\n• AutoNation: 2 missed spots, 1 makegood\n• Local Restaurant: 1 missed spot\n\nTotal: 10 missed spots requiring immediate attention.';
      } else if (lowerInput.includes('providence') && lowerInput.includes('projection')) {
        response = 'Providence Market - Q4 Projections vs Actuals:\n\n📊 Billing Performance:\n• Projected: $410K | Actual: $387K (94.4% attainment)\n• Variance: -$23K behind projection\n\n📈 YoY Comparison:\n• Q4 2023: $387K (+28.1% vs Q4 2022)\n• Strong growth despite missing projection\n\nTop Contributors: AutoNation ($45.2K), Regional Medical ($38.7K)';
      } else if (lowerInput.includes('makegood') && lowerInput.includes('automotive')) {
        response = 'Automotive Category - Makegoods Summary:\n\n🚗 AutoNation:\n• 1 makegood pending (missed prime spot)\n• Estimated value: $240\n• Target completion: Tomorrow\n\n🚗 Other Auto Dealers:\n• Premier Auto: 2 makegoods completed\n• City Motors: No outstanding issues\n\nTotal automotive makegoods value: $240 pending';
      } else if (lowerInput.includes('yoy') || lowerInput.includes('january')) {
        response = 'January 2024 vs January 2023 Performance:\n\n📈 Revenue Growth:\n• January 2024: $267K\n• January 2023: $245K\n• Growth: +$22K (+8.9% YoY)\n\n🎯 Key Drivers:\n• Healthcare: +15.2% growth\n• Automotive: +12.5% growth\n• Technology: -3.1% decline\n\nMarket share: Maintained 15.8% position';
      } else if (lowerInput.includes('darwin') && lowerInput.includes('projection')) {
        response = 'Darwin System - Projections vs Actual Billing:\n\n📊 Current Month Performance:\n• Total Projected: $241K\n• Total Actual: $193K\n• Attainment: 80.1%\n\n🔍 Top Performers:\n• Mike Sullivan (AutoNation): 87.0% attainment\n• Lisa Rodriguez (Medical): 94.4% attainment\n• James Wilson (Real Estate): 92.9% attainment\n\nProjected close rate: 85.2% by month-end';
      } else if (lowerInput.includes('spot issues') && lowerInput.includes('7 days')) {
        response = 'Spot Issues - Last 7 Days Summary:\n\n📅 Recent Issues:\n• Monday: 2 missed spots (AutoNation, Tech Solutions)\n• Wednesday: 1 missed spot (Premier Real Estate)\n• Friday: 3 missed spots (various advertisers)\n\n⚠️ Resolution Status:\n• 4 issues resolved with makegoods\n• 2 pending advertiser approval\n• Total impact: $1,240 in missed revenue';
      } else {
        response = 'I can help with broadcast media sales analytics including:\n\n• Pacing analysis by advertiser/category\n• Billing projections vs actuals\n• Spot issues and makegood tracking\n• YoY performance comparisons\n• Market share analysis\n• Darwin system integration\n\nWhat specific metrics would you like to explore?';
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

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input simulation - in real app would use Speech Recognition API
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInput("Show me the healthcare advertisers pacing in Boston");
      }, 2000);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Search className="w-5 h-5" />
          <span>AI Sales Assistant</span>
        </CardTitle>
        <CardDescription>Ask about pacing, billing, spots, and market performance</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Performance Indicators */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-green-50 p-2 rounded flex items-center space-x-2">
            <TrendingUp className="w-3 h-3 text-green-600" />
            <div>
              <div className="font-medium text-green-800">94.7% Pacing</div>
              <div className="text-green-600">vs Target</div>
            </div>
          </div>
          <div className="bg-orange-50 p-2 rounded flex items-center space-x-2">
            <AlertCircle className="w-3 h-3 text-orange-600" />
            <div>
              <div className="font-medium text-orange-800">10 Spot Issues</div>
              <div className="text-orange-600">Need Attention</div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg ${
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
          <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Broadcast Media Queries</div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
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
            placeholder="Ask about sales data, pacing, or spot issues..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button
            onClick={toggleVoiceInput}
            size="sm"
            variant={isListening ? "destructive" : "outline"}
            className="px-3"
          >
            <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
          </Button>
          <Button onClick={handleSendMessage} size="sm">
            Send
          </Button>
        </div>
        
        {isListening && (
          <div className="text-xs text-center text-blue-600 animate-pulse">
            🎤 Listening... speak your query
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default AIChatbot;

const API_KEY = 'AIzaSyD1UOAhvEdDmIyXce2EIbaFcpreboXcHXM';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function chatWithAI(message: string, context?: string): Promise<string> {
  try {
    const systemPrompt = `You are an AI assistant (powered by Google Gemini) for Denny's portfolio website. 
    You help visitors learn about Denny's experience, skills, and projects.
    You specialize in GIS, web development, and technical discussions.
    Keep responses concise, friendly, and informative.
    
    Here's information about Denny:
    - Experienced in GIS Development, Web Development, and API Development
    - Strong skills in PostgreSQL/PostGIS, Python, TypeScript, and React/Next.js
    - Currently working as a GIS Developer at Koltiva
    - Previous experience includes API Engineer at Yummy Corp and Senior Backend Engineer at Sicepat
    - Specializes in spatial data analysis, web mapping, and full-stack development
    
    ${context || ''}`;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nUser: ${message}\n\nAssistant:`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
          topP: 1,
          topK: 40
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('AI API Error:', errorData);
      throw new Error(errorData.error?.message || 'Failed to get AI response');
    }

    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;
    return aiResponse;
  } catch (error) {
    console.error('AI Chat Error:', error);
    return "I apologize, but I'm having trouble connecting to the AI service at the moment. You can try these commands instead:\n• 'experience' - View my work history\n• 'projects' - See my portfolio\n• 'skills' - Check my technical skills";
  }
}

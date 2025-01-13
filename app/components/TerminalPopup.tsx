import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoTerminal } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import type { ReactNode } from 'react';
import { TriviaGame } from './TriviaGame';

interface Command {
  command: string;
  output: string | ReactNode;
}

const TerminalPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triviaGame = useRef(new TriviaGame());

  const availableCommands = {
    help: () => (
      <div className="text-green-400">
        Available commands:
        <br />• help - Show this help message
        <br />• about - About me
        <br />• skills - My technical skills
        <br />• experience - View my work experience
        <br />• projects - View my projects
        <br />• contact - Contact information
        <br />• links - Social media & useful links
        <br />• trivia - Play a fun trivia game
        <br />• ask [question] - Ask AI about my experience
        <br />• clear - Clear the terminal
        <br />• exit - Close the terminal
        <br />
        <br />Tips:
        <br />• Use Tab for autocomplete
        <br />• Use ↑↓ arrows for command history
        <br />• Type 'experience [company]' for specific role details
        <br />• Type 'projects [category]' to filter by category
        <br />• Type 'trivia start' to begin the game
        <br />• Type 'ask [your question]' to chat with AI
      </div>
    ),
    about: () => (
      <div className="text-blue-400">
        Hi! I'm Denny, a passionate software engineer with expertise in
        full-stack development and GIS. I love building innovative solutions
        and exploring new technologies.
      </div>
    ),
    skills: (category?: string) => {
      if (category) {
        if (category.toLowerCase().startsWith('search ')) {
          const query = category.slice(7);
          return searchSkills(query);
        }
        const skills = {
          frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Material-UI'],
          backend: ['Node.js', 'Express', 'PostgreSQL', 'Python', 'FastAPI'],
          gis: ['PostGIS', 'QGIS', 'GeoServer', 'Leaflet', 'Mapbox', 'OpenLayers'],
          database: ['PostgreSQL', 'PostGIS', 'MongoDB', 'Redis'],
          cloud: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes']
        };

        const matchedSkills = skills[category.toLowerCase()];
        if (!matchedSkills) {
          return (
            <div className="text-yellow-400">
              No skills found matching '{category}'. Try:
              <br />• Frontend skills: react, typescript, nextjs
              <br />• Backend skills: python, node, postgres
              <br />• GIS skills: postgis, qgis, geoserver
            </div>
          );
        }

        return (
          <div className="text-yellow-400">
            <div className="font-bold">{category}</div>
            {matchedSkills.map((skill, i) => (
              <div key={i} className="ml-2">• {skill}</div>
            ))}
          </div>
        );
      }

      return (
        <div className="text-yellow-400">
          Technical Skills:
          <br />• Frontend: TypeScript, React, Vue.js, Angular
          <br />• Backend: Python, Laravel, Node.js
          <br />• Database: PostgreSQL
          <br />• DevOps: Docker
          <br />• Specialties: GIS, Mapping Solutions
        </div>
      );
    },
    projects: (category?: string) => {
      if (category) {
        if (category.toLowerCase().startsWith('search ')) {
          const tech = category.slice(7);
          return searchProjects(tech);
        }
        const projects = [
          {
            title: 'Official Travel Information System',
            description: 'Comprehensive travel management system for Wijaya Karya Industri dan Konstruksi with real-time updates.',
            tech: ['Angular 12', 'PostgreSQL', 'Node.js WebSocket', 'Laravel 9'],
            category: 'Enterprise System',
          },
          {
            title: 'BKSDA Palembang Monitoring System',
            description: 'A comprehensive monitoring system for Natural Resources Conservation Agency.',
            tech: ['Angular 5', 'Node.js', 'Express', 'PostgreSQL', 'GeoServer', 'LeafletJS'],
            category: 'GIS Application',
          },
          {
            title: 'Environmental Impact Analysis System',
            description: 'Advanced system for the Ministry of Environment and Forestry to analyze environmental impacts.',
            tech: ['Vue', 'Laravel 10', 'PostgreSQL', 'ArcGIS Server', 'ArcGIS JS API'],
            category: 'Government System',
          },
          {
            title: 'Spatial Planning Information System',
            description: 'Comprehensive spatial planning system implemented for multiple regencies including Banyuasin and Belitung.',
            tech: ['Vue', 'Laravel 10', 'PostgreSQL', 'Python', 'OpenLayers'],
            category: 'GIS Application',
          },
          {
            title: 'KKPR Information System',
            description: 'Land Use Permit system for Banyuasin Regency with advanced spatial features.',
            tech: ['Vue', 'Laravel 10', 'PostgreSQL', 'Python', 'OpenLayers'],
            category: 'Government System',
          },
          {
            title: 'HRIS for PT Pesonna Optima Jasa',
            description: 'Complete Human Resource Information System with modern features.',
            tech: ['Vue', 'Laravel 10', 'PostgreSQL', 'Python', 'Minio'],
            category: 'Enterprise System',
          },
          {
            title: 'Heartful Tower Apartment Website',
            description: 'Modern and responsive website for luxury apartment complex.',
            tech: ['Next.js', 'React', 'Tailwind CSS'],
            category: 'Web Development',
          },
          {
            title: 'Galaksi Mineral Indonesia',
            description: 'Corporate website with modern design and optimal performance.',
            tech: ['Next.js', 'React', 'Tailwind CSS'],
            category: 'Web Development',
          }
        ];

        const categories = [...new Set(projects.map(p => p.category))];

        if (!category || category.trim() === '') {
          return (
            <div className="text-yellow-400">
              <div className="mb-2">Available Categories:</div>
              {categories.map((category, i) => (
                <div key={i} className="ml-2">• {category}</div>
              ))}
              <div className="mt-4 text-green-400/80">
                Type 'projects list' to see all projects
                <br />Type 'projects [category]' to filter by category
                <br />Type 'projects info [project]' for project details
              </div>
            </div>
          );
        }

        const [command, ...rest] = category.toLowerCase().trim().split(' ');
        const searchTerm = rest.join(' ');

        if (command === 'list') {
          return (
            <div className="text-yellow-400">
              <div className="mb-2">All Projects:</div>
              {projects.map((project, i) => (
                <div key={i} className="mb-3">
                  <div className="font-bold">{project.title}</div>
                  <div className="text-green-400/80 text-sm">{project.category}</div>
                  <div className="text-yellow-400/80 text-sm">{project.description}</div>
                </div>
              ))}
            </div>
          );
        }

        if (command === 'info') {
          const project = projects.find(p => 
            p.title.toLowerCase().includes(searchTerm) || 
            searchTerm.split(' ').every(term => p.title.toLowerCase().includes(term))
          );

          if (project) {
            return (
              <div className="text-yellow-400">
                <div className="font-bold text-lg">{project.title}</div>
                <div className="text-green-400 mt-1">{project.category}</div>
                <div className="mt-2">{project.description}</div>
                <div className="mt-2">
                  <span className="text-green-400">Technologies:</span>
                  <div className="ml-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="inline-block mr-2 mb-1 px-2 py-0.5 text-xs bg-green-500/10 text-green-400 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          }
          return `Project "${searchTerm}" not found. Type 'projects list' to see all projects.`;
        }

        // Filter by category
        const searchTermLower = category.toLowerCase().trim();
        const categoryProjects = projects.filter(p => 
          p.category.toLowerCase().includes(searchTermLower)
        );

        if (categoryProjects.length > 0) {
          return (
            <div className="text-yellow-400">
              <div className="mb-2">Projects in category containing "{category.trim()}":</div>
              {categoryProjects.map((project, i) => (
                <div key={i} className="mb-3">
                  <div className="font-bold">{project.title}</div>
                  <div className="text-green-400/80 text-sm">{project.category}</div>
                  <div className="text-yellow-400/80 text-sm">{project.description}</div>
                  <div className="text-green-400/70 text-xs">Type 'projects info {project.title.split(' ')[0]}' for details</div>
                </div>
              ))}
            </div>
          );
        }

        return (
          <div className="text-yellow-400">
            <div>Category "{category.trim()}" not found.</div>
            <div className="mt-2">Available categories:</div>
            {categories.map((category, i) => (
              <div key={i} className="ml-2">• {category}</div>
            ))}
            <div className="mt-4 text-green-400/80">
              Type 'projects list' to see all projects
              <br />Type 'projects [category]' to filter by category
              <br />Type 'projects info [project]' for project details
            </div>
          </div>
        );
      }

      return (
        <div className="text-yellow-400">
          <div className="mb-2">Available Categories:</div>
          {categories.map((category, i) => (
            <div key={i} className="ml-2">• {category}</div>
          ))}
          <div className="mt-4 text-green-400/80">
            Type 'projects list' to see all projects
            <br />Type 'projects [category]' to filter by category
            <br />Type 'projects info [project]' for project details
          </div>
        </div>
      );
    },
    experience: (args?: string) => {
      const experiences = [
        {
          period: '09/2023 - Present',
          role: 'Geographic Information System Developer',
          company: 'Koltiva',
          location: 'South Jakarta',
          description: 'Develop and maintain GIS maps for agricultural projects using Geoserver and GeoPandas.',
          achievements: [
            'Develop and maintain GIS maps for agricultural projects using Geoserver and GeoPandas, ensuring accurate spatial data representation',
            'Analyze spatial data to support decision-making processes, improving project efficiency by 20%',
            'Collaborate with cross-functional teams to integrate diverse data sources into web GIS applications',
            'Design and implement GIS solutions that enhance data visualization and usability for stakeholders'
          ],
          tech: ['Geoserver', 'GeoPandas', 'Python', 'PostgreSQL', 'PostGIS']
        },
        {
          period: '01/2023 - 09/2023',
          role: 'API Engineer',
          company: 'Yummy Corp',
          location: 'South Tangerang',
          description: 'Designed and developed REST APIs for ordering platform systems.',
          achievements: [
            'Designed and developed REST APIs for ordering platform systems using NestJS, improving system performance by 15%',
            'Implemented microservice integration using Google Pub/Sub, enabling seamless communication between services',
            'Managed production releases and resolved critical issues in staging and production environments, ensuring 99.9% uptime'
          ],
          tech: ['NestJS', 'TypeScript', 'Google Cloud', 'Pub/Sub', 'Docker']
        },
        {
          period: '09/2020 - 11/2022',
          role: 'Senior Backend Engineer',
          company: 'Sicepat Express Indonesia',
          location: 'Jakarta',
          description: 'Led backend development for various internal systems and integrations.',
          achievements: [
            'Architected and implemented REST API for a petty cash program using NestJS, reducing processing time by 30%',
            'Integrated third-party services (Sunfish & Odoo) and Krakend API Gateway, streamlining data flow',
            'Developed a data reporting service using Go, enhancing data accessibility and reporting efficiency'
          ],
          tech: ['NestJS', 'Go', 'Krakend', 'Redis', 'PostgreSQL']
        },
        {
          period: '09/2017 - 09/2020',
          role: 'Full Stack Developer',
          company: 'Imani Prima',
          location: 'Jakarta',
          description: 'Led full-stack development of web applications and IoT systems.',
          achievements: [
            'Led full-stack development of web applications, including IoT monitoring systems and e-commerce platforms',
            'Utilized GraphQL, Node.js, Angular, Laravel, and Vue.js to deliver scalable and user-friendly solutions',
            'Implemented new technologies to enhance product offerings'
          ],
          tech: ['Node.js', 'Angular', 'Laravel', 'Vue.js', 'GraphQL']
        },
        {
          period: '04/2017 - 09/2017',
          role: 'GIS Programmer',
          company: 'eKomoditi Solutions Indonesia',
          location: 'Jakarta',
          description: 'Developed GIS web applications and ERP systems.',
          achievements: [
            'Developed GIS web applications using LeafletJS, Bootstrap, and PHP CodeIgniter, improving data visualization for clients',
            'Built an ERP system using PHP, streamlining internal processes and reducing manual workload by 40%'
          ],
          tech: ['PHP', 'CodeIgniter', 'LeafletJS', 'MySQL', 'Bootstrap']
        }
      ];

      if (args) {
        const company = args.toLowerCase();
        const exp = experiences.find(e => e.company.toLowerCase().includes(company));
        if (exp) {
          return (
            <div className="text-yellow-400">
              <div className="font-bold">{exp.role} at {exp.company}</div>
              <div className="text-green-400">{exp.period} | {exp.location}</div>
              <div className="mt-2">{exp.description}</div>
              <div className="mt-2">
                Key Achievements:
                {exp.achievements.map((achievement, i) => (
                  <div key={i} className="ml-2">• {achievement}</div>
                ))}
              </div>
              <div className="mt-2">
                Technologies: {exp.tech.join(', ')}
              </div>
            </div>
          );
        }
        return `Company "${args}" not found in experience. Type 'experience' to see all experiences.`;
      }

      return (
        <div className="text-yellow-400">
          <div className="mb-2">Work Experience:</div>
          {experiences.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="font-bold">{exp.role} at {exp.company}</div>
              <div className="text-green-400">{exp.period} | {exp.location}</div>
              <div className="text-yellow-400/80">{exp.description}</div>
              <div className="text-yellow-400/70 text-sm">Type 'experience {exp.company.split(' ')[0]}' for details</div>
            </div>
          ))}
        </div>
      );
    },
    trivia: (args?: string) => {
      if (!args) {
        return triviaGame.current.status();
      }

      const [command, ...rest] = args.toLowerCase().trim().split(' ');
      
      if (command === 'start') {
        return triviaGame.current.start();
      }
      
      if (command === 'answer') {
        const answerNum = parseInt(rest[0]);
        if (isNaN(answerNum) || answerNum < 1 || answerNum > 4) {
          return "Please provide a valid answer number (1-4)";
        }
        return triviaGame.current.answer(answerNum);
      }

      return (
        <div className="text-yellow-400">
          Available trivia commands:
          <br />• trivia start - Start a new game
          <br />• trivia answer [number] - Submit your answer
          <br />• trivia - Check current game status
        </div>
      );
    },
    ask: async (question?: string) => {
      if (!question) {
        return (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span>Powered by</span>
                <span className="font-semibold">Google Gemini</span>
                <span className="ml-1">🧠</span>
              </div>
              <div className="text-red-400/70 text-xs animate-pulse">
                💸 Ka-ching! AI tokens aren't free!
              </div>
            </div>
            <div className="text-yellow-400/70 text-sm mb-3 italic">
              "I'm running on a tight AI budget here - let's keep our chats focused and wallet-friendly! 😅"
            </div>
            <div className="space-y-3">
              <div className="text-green-400/90">Try these cost-effective questions:</div>
              <div className="space-y-1">
                <div className="text-cyan-400 flex items-center gap-2">
                  <span>→</span>
                  ask What are your GIS skills?
                </div>
                <div className="text-cyan-400 flex items-center gap-2">
                  <span>→</span>
                  ask Tell me about your latest project
                </div>
                <div className="text-cyan-400 flex items-center gap-2">
                  <span>→</span>
                  ask What technologies do you use?
                </div>
              </div>
              <div className="text-yellow-400/50 text-sm mt-2 italic">
                P.S. Each AI token costs more than my morning coffee! ☕
              </div>
            </div>
          </div>
        );
      }

      try {
        const response = await fetch('/api/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            message: question,
            context: `The user asked: ${question}. Remember to keep responses concise - AI tokens aren't cheap! 😅`
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to get AI response');
        }
        
        return (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span>Powered by</span>
                <span className="font-semibold">Google Gemini</span>
                <span className="ml-1">🧠</span>
              </div>
              <div className="text-yellow-400/50 text-xs">
                💸 Spending those precious AI tokens...
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-400/50 mt-1">→</span>
              <div>
                <div className="text-cyan-400 font-medium">You asked:</div>
                <div className="text-cyan-400/90">{question}</div>
              </div>
            </div>
            <div className="mt-3 text-green-400 whitespace-pre-wrap pl-6">{data.response}</div>
            <div className="mt-4 flex items-center gap-3 text-xs">
              <div className="text-cyan-400/50">Ask another question!</div>
              <div className="text-yellow-400/30">•</div>
              <div className="text-red-400/70 animate-pulse">
                💸 -$0.0001 from my coffee fund
              </div>
            </div>
          </div>
        );
      } catch (error: any) {
        console.error('Terminal AI Error:', error);
        return (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span>AI Error</span>
                <span className="ml-1">⚠️</span>
              </div>
            </div>
            <div className="text-red-400">
              Oops! The AI seems to be on a coffee break (or I ran out of tokens 😅)
              {error.message && (
                <div className="text-red-400/80 text-sm mt-1">
                  Error: {error.message}
                </div>
              )}
            </div>
            <div className="mt-3 text-yellow-400/80">
              While I refill my AI token jar, try these free commands:
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1 text-sm">
              <div className="text-cyan-400/70">• Type 'help'</div>
              <div className="text-cyan-400/70">• Type 'experience'</div>
              <div className="text-cyan-400/70">• Type 'projects'</div>
              <div className="text-cyan-400/70">• Type 'skills'</div>
            </div>
          </div>
        );
      }
    },
    clear: () => {
      // Clear command history and current input
      setCommands([]);
      setCommandHistory([]);
      setCurrentInput('');
      setSuggestions([]);
      setHistoryIndex(-1);
      return '';
    },
    exit: () => {
      setTimeout(() => {
        onClose();
      }, 1500);
      return (
        <div className="text-green-400 animate-textScanline">
          <div>Thank you for exploring my terminal portfolio!</div>
          <div className="mt-1">Feel free to connect with me through the contact information provided.</div>
          <div className="mt-2 text-yellow-400">Shutting down DENNY-DOS...</div>
          <div className="text-xs text-green-500/70 mt-4">
            Tip: You can always reopen the terminal by clicking the terminal button.
          </div>
        </div>
      );
    },
  };

  const commandList = Object.keys(availableCommands);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  const getAutocompleteSuggestions = (input: string) => {
    const normalizedInput = input.toLowerCase();
    return commandList.filter(cmd => cmd.startsWith(normalizedInput));
  };

  const handleCommand = (cmd: string) => {
    const normalizedCmd = cmd.toLowerCase().trim();
    const [command, ...args] = normalizedCmd.split(' ');
    const commandFn = availableCommands[command as keyof typeof availableCommands];
    
    if (commandFn) {
      if (command === 'experience' || command === 'projects' || command === 'trivia' || command === 'ask') {
        return commandFn(args.join(' '));
      }
      return commandFn();
    } else if (normalizedCmd === '') {
      return '';
    } else {
      return `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentInput) {
      const newCommand: Command = {
        command: currentInput,
        output: handleCommand(currentInput),
      };
      
      setCommands([...commands, newCommand]);
      setCommandHistory([...commandHistory, currentInput]);
      setHistoryIndex(-1);
      setCurrentInput('');
      setSuggestions([]);
      
      // Don't scroll if it's an exit command
      if (!currentInput.toLowerCase().startsWith('exit')) {
        setTimeout(scrollToBottom, 0);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const suggestions = getAutocompleteSuggestions(currentInput);
      if (suggestions.length === 1) {
        setCurrentInput(suggestions[0]);
        setSuggestions([]);
      } else if (suggestions.length > 1) {
        setSuggestions(suggestions);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
        setSuggestions([]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
      setSuggestions([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentInput(value);
    if (value) {
      setSuggestions(getAutocompleteSuggestions(value));
    } else {
      setSuggestions([]);
    }
  };

  const welcomeMessage = (
    <div>
      <div className="text-green-400 font-bold text-lg">
        👋 Welcome to Denny's Interactive Portfolio Terminal!
      </div>
      <div className="mt-2 text-cyan-400">
        This is an interactive terminal where you can explore my experience, projects, and skills.
        You can also chat with AI to learn more about my work!
      </div>
      <div className="mt-4">
        <span className="text-yellow-400">🚀 Quick Start:</span>
        <br />• Type <span className="text-cyan-400">'help'</span> to see all available commands
        <br />• Use <span className="text-cyan-400">Tab</span> for autocomplete
        <br />• Press <span className="text-cyan-400">↑↓</span> for command history
        <br />• Type <span className="text-cyan-400">'clear'</span> to reset the terminal
      </div>
      <div className="mt-4">
        <span className="text-yellow-400">💼 Portfolio Navigation:</span>
        <br />• <span className="text-cyan-400">projects web</span> - View web development projects
        <br />• <span className="text-cyan-400">projects gis</span> - Explore GIS projects
        <br />• <span className="text-cyan-400">experience koltiva</span> - My work at Koltiva
        <br />• <span className="text-cyan-400">skills frontend</span> - Frontend skills
        <br />• <span className="text-cyan-400">skills backend</span> - Backend expertise
        <br />• <span className="text-cyan-400">skills gis</span> - GIS capabilities
      </div>
      <div className="mt-4">
        <span className="text-yellow-400">🤖 AI Assistant:</span>
        <div className="flex items-center gap-2 text-xs mb-2">
          <div className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span>Powered by</span>
            <span className="font-semibold">Google Gemini</span>
            <span className="ml-1">🧠</span>
          </div>
          <div className="text-yellow-400/70">•</div>
          <div className="text-red-400/70 animate-pulse">$0.0001 per token 💸</div>
        </div>
        <div className="text-yellow-400/70 text-xs mb-3 italic">
          "Please use the AI wisely - I'm not rich enough to handle too many deep philosophical questions! 😅"
        </div>
        <div className="space-y-2 text-sm">
          <div>Try these wallet-friendly questions:</div>
          <div className="text-cyan-400">• ask What GIS tools do you use?</div>
          <div className="text-cyan-400">• ask Tell me about your projects</div>
          <div className="text-cyan-400">• ask What's your tech stack?</div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-yellow-400/50">
          <span>💡</span>
          <span>Fun fact: Each time you ask me about React vs Angular, a developer loses their coffee budget!</span>
        </div>
      </div>
      <div className="mt-4">
        <span className="text-yellow-400">🎮 Interactive Features:</span>
        <br />• <span className="text-cyan-400">trivia start</span> - Play GIS & Web Dev trivia
        <br />• <span className="text-cyan-400">links</span> - Social media & portfolio links
        <br />• <span className="text-cyan-400">contact</span> - Get in touch
      </div>
      <div className="mt-4">
        <span className="text-yellow-400">🎯 Quick Commands:</span>
        <br />• Type <span className="text-cyan-400">about</span> for a quick intro
        <br />• Use <span className="text-cyan-400">skills search [keyword]</span> to find specific skills
        <br />• Try <span className="text-cyan-400">projects search [tech]</span> to filter projects
      </div>
      <div className="mt-4 text-green-400">
        Let's get started! Try a command or ask the AI assistant something! 🚀
      </div>
    </div>
  );

  // Function to handle skill search
  const searchSkills = (query: string) => {
    const skills = {
      frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Material-UI'],
      backend: ['Node.js', 'Express', 'PostgreSQL', 'Python', 'FastAPI'],
      gis: ['PostGIS', 'QGIS', 'GeoServer', 'Leaflet', 'Mapbox', 'OpenLayers'],
      database: ['PostgreSQL', 'PostGIS', 'MongoDB', 'Redis'],
      cloud: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes']
    };

    const allSkills = Object.values(skills).flat();
    const matchedSkills = allSkills.filter(skill => 
      skill.toLowerCase().includes(query.toLowerCase())
    );

    if (matchedSkills.length === 0) {
      return (
        <div className="text-yellow-400">
          No skills found matching '{query}'. Try:
          <br />• Frontend skills: react, typescript, nextjs
          <br />• Backend skills: python, node, postgres
          <br />• GIS skills: postgis, qgis, geoserver
        </div>
      );
    }

    return (
      <div>
        <div className="text-cyan-400">Found {matchedSkills.length} matching skills:</div>
        {matchedSkills.map((skill, index) => (
          <div key={index} className="text-green-400">• {skill}</div>
        ))}
        <div className="text-yellow-400/70 mt-2">
          Type 'ask' to learn more about any of these skills!
        </div>
      </div>
    );
  };

  // Function to handle project search
  const searchProjects = (tech: string) => {
    const projects = {
      web: [
        { name: 'Portfolio Terminal', tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AI'] },
        { name: 'GIS Dashboard', tech: ['React', 'PostGIS', 'Mapbox', 'TypeScript'] }
      ],
      gis: [
        { name: 'Spatial Analysis Tool', tech: ['Python', 'PostGIS', 'GeoServer'] },
        { name: 'Interactive Map Viewer', tech: ['Leaflet', 'TypeScript', 'GeoJSON'] }
      ]
    };

    const allProjects = Object.values(projects).flat();
    const matchedProjects = allProjects.filter(project => 
      project.tech.some(t => t.toLowerCase().includes(tech.toLowerCase()))
    );

    if (matchedProjects.length === 0) {
      return (
        <div className="text-yellow-400">
          No projects found with '{tech}'. Try searching for:
          <br />• Web: react, nextjs, typescript
          <br />• GIS: postgis, python, leaflet
          <br />• Or type 'projects' to see all projects
        </div>
      );
    }

    return (
      <div>
        <div className="text-cyan-400">Found {matchedProjects.length} projects:</div>
        {matchedProjects.map((project, index) => (
          <div key={index} className="mb-2">
            <div className="text-green-400 font-bold">{project.name}</div>
            <div className="text-yellow-400/70">Technologies: {project.tech.join(', ')}</div>
          </div>
        ))}
        <div className="text-cyan-400/70 mt-2">
          Type 'ask tell me about [project]' to learn more!
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCommands([{
        command: '',
        output: welcomeMessage,
      }]);
      // Focus input when terminal opens
      setTimeout(() => {
        const input = document.querySelector('input') as HTMLInputElement;
        if (input) input.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Auto-scroll when commands change
  useEffect(() => {
    scrollToBottom();
  }, [commands]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          
          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-[95vw] h-[90vh] md:w-[800px] md:h-[500px] lg:w-[900px] lg:h-[600px]
              bg-black z-50 flex flex-col overflow-hidden
              border-4 border-green-500/50 rounded-none
              [background:linear-gradient(rgba(0,20,0,0.9),rgba(0,20,0,0.9)),repeating-linear-gradient(0deg,rgba(0,20,0,0.2),rgba(0,20,0,0.2)_1px,transparent_1px,transparent_2px)]
              before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"
          >
            {/* Terminal Header */}
            <div className="flex items-center bg-green-500 text-black px-4 py-0.5 font-bold relative
              before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)]">
              <div className="flex-1 text-center font-mono tracking-wide text-sm uppercase">
                DENNY-DOS v1.0
              </div>
              <button 
                onClick={onClose}
                className="absolute right-0 top-0 h-full px-3 bg-green-500 hover:bg-green-600 
                  transition-colors border-l-2 border-green-700 text-black font-bold
                  flex items-center justify-center"
              >
                ×
              </button>
            </div>

            {/* Terminal Body */}
            <div 
              ref={terminalRef}
              className="flex-1 p-4 overflow-y-auto font-mono text-sm text-green-400 space-y-3
                [background:linear-gradient(rgba(0,20,0,0.9),rgba(0,20,0,0.9)),repeating-linear-gradient(0deg,rgba(0,20,0,0.2),rgba(0,20,0,0.2)_1px,transparent_1px,transparent_2px)]
                shadow-[inset_0_0_10px_rgba(0,255,0,0.1)]"
            >
              {commands.map((cmd, index) => (
                <div key={index} className="space-y-1 animate-textScanline">
                  <div className="flex items-center">
                    <span className="text-green-500/90">C:\DENNY-DOS></span>
                    <span className="ml-2 text-green-300">{cmd.command}</span>
                  </div>
                  <div className="ml-4 text-green-400/90 leading-relaxed [text-shadow:0_0_5px_rgba(0,255,0,0.5)]">
                    {cmd.output}
                  </div>
                </div>
              ))}
              
              <div className="flex flex-col space-y-2">
                <div className="flex items-center animate-textScanline">
                  <span className="text-green-500/90">C:\DENNY-DOS></span>
                  <input
                    type="text"
                    value={currentInput}
                    onChange={handleInputChange}
                    onKeyDown={handleSubmit}
                    className="ml-2 flex-1 bg-transparent outline-none caret-green-400 text-green-300
                      focus:outline-none [text-shadow:0_0_5px_rgba(0,255,0,0.5)]"
                    autoFocus
                  />
                </div>
                {suggestions.length > 0 && (
                  <div className="ml-4 text-green-400/70">
                    Suggestions: {suggestions.join(', ')}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TerminalPopup;

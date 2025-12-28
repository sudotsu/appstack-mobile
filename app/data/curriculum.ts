export interface Challenge {
  id: string;
  week: number;
  day: number;
  title: string;
  subtitle: string;
  category: 'foundation' | 'building' | 'meta' | 'customization' | 'deployment';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // minutes
  concept: string;
  description: string;
  learningObjective: string;
  metaNarrative?: string; // "Here's how WE built this feature"
  starterCode: string;
  hints: string[];
  solution: string;
  realWorldUse: string;
  aiCollaborationTip: string;
  unlocks: string[];
  requires: string[];
}

export const CURRICULUM: Challenge[] = [
  // WEEK 1: FOUNDATION
  {
    id: 'w1d1-typescript-basics',
    week: 1,
    day: 1,
    title: 'Just Enough TypeScript',
    subtitle: 'Read AI code without breaking it',
    category: 'foundation',
    difficulty: 'beginner',
    estimatedTime: 30,
    concept: 'Type annotations and interfaces',
    description: 'Learn the minimum TypeScript needed to understand and fix AI-generated code',
    learningObjective: 'You\'ll be able to read type errors and add basic type annotations',
    starterCode: `// Fix the type errors in this function
function greetUser(name, age) {
  return \`Hello \${name}, you are \${age} years old\`;
}

// Add proper types to this interface
interface User {
  name;
  email;
  isActive;
}`,
    hints: [
      'Function parameters need type annotations like name: string',
      'Interface properties need their types specified',
      'Think about what data type each value should be'
    ],
    solution: `function greetUser(name: string, age: number): string {
  return \`Hello \${name}, you are \${age} years old\`;
}

interface User {
  name: string;
  email: string;
  isActive: boolean;
}`,
    realWorldUse: 'When Claude generates code, you\'ll see type errors. This lets you fix them instantly.',
    aiCollaborationTip: 'Tell Claude: "Add TypeScript types to this" - it\'ll do it perfectly. You just need to understand WHAT it did.',
    unlocks: ['w1d2-react-components'],
    requires: []
  },
  
  {
    id: 'w1d2-react-components',
    week: 1,
    day: 2,
    title: 'Components Are Building Blocks',
    subtitle: 'Understand what Claude is creating',
    category: 'foundation',
    difficulty: 'beginner',
    estimatedTime: 45,
    concept: 'React components and props',
    description: 'Learn how components work so you can effectively prompt AI to build them',
    learningObjective: 'You\'ll understand component structure and how to pass data between them',
    metaNarrative: 'This entire app is built with components. The challenge list? Component. The code editor? Component. Everything you see is a reusable piece.',
    starterCode: `// Create a Card component that displays user info
// It should accept: name, role, and avatar as props
// Display them in a nice card layout

`,
    hints: [
      'Create an interface for the component props',
      'Use React.FC<YourPropsType> for the component',
      'Return JSX that displays the props'
    ],
    solution: `interface CardProps {
  name: string;
  role: string;
  avatar: string;
}

const Card: React.FC<CardProps> = ({ name, role, avatar }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={avatar} alt={name} className="w-16 h-16 rounded-full mb-2" />
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  );
};`,
    realWorldUse: 'Every UI element is a component. Understanding this lets you prompt: "Make me a component for X"',
    aiCollaborationTip: 'Instead of "build me a user profile page", say "create a UserProfile component that takes user data as props"',
    unlocks: ['w1d3-tailwind-styling'],
    requires: ['w1d1-typescript-basics']
  },

  {
    id: 'w1d3-tailwind-styling',
    week: 1,
    day: 3,
    title: 'Make AI Output Look Professional',
    subtitle: 'Style without writing CSS',
    category: 'foundation',
    difficulty: 'beginner',
    estimatedTime: 45,
    concept: 'Tailwind utility classes',
    description: 'Learn enough Tailwind to make AI-generated UIs actually look good',
    learningObjective: 'You\'ll be able to modify colors, spacing, and layouts using utility classes',
    metaNarrative: 'Every style in this app uses Tailwind. Those blue buttons? bg-blue-600. The card shadows? shadow-lg. Zero custom CSS.',
    starterCode: `// Style this button component with Tailwind
// Make it: blue background, white text, rounded corners, hover effect

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};`,
    hints: [
      'Use bg-{color}-{shade} for background colors',
      'text-{color} for text colors',
      'rounded-{size} for border radius',
      'hover:{class} for hover states'
    ],
    solution: `const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
    >
      {children}
    </button>
  );
};`,
    realWorldUse: 'When Claude builds ugly UIs, you can instantly improve them by tweaking Tailwind classes',
    aiCollaborationTip: 'Tell Claude your design preferences: "Use blue as primary color, rounded corners, shadow effects"',
    unlocks: ['w1d4-reading-ai-code'],
    requires: ['w1d2-react-components']
  },

  {
    id: 'w1d4-reading-ai-code',
    week: 1,
    day: 4,
    title: 'Understanding AI-Generated Code',
    subtitle: 'Know what Claude built and why',
    category: 'foundation',
    difficulty: 'beginner',
    estimatedTime: 30,
    concept: 'Code comprehension and structure',
    description: 'Learn to read and understand code that AI generates for you',
    learningObjective: 'You\'ll be able to explain what any piece of AI code does, line by line',
    metaNarrative: 'I (Claude) built most of this app. But YOU need to understand it to customize, fix, and improve it.',
    starterCode: `// Read this AI-generated code and answer:
// 1. What does this function do?
// 2. What happens if items array is empty?
// 3. What type does it return?

function getActiveItems<T extends { isActive: boolean }>(items: T[]): T[] {
  return items.filter(item => item.isActive);
}

// Write your explanation here as a comment:
// 
`,
    hints: [
      'Break it down: What is <T extends { isActive: boolean }>?',
      'What does filter() do?',
      'What would happen with an empty array?'
    ],
    solution: `// EXPLANATION:
// 1. This function filters an array and returns only items where isActive is true
// 2. If items array is empty, it returns an empty array (filter handles this safely)
// 3. It returns an array of the same type T that was passed in

// The <T extends...> part means: "T can be any type, but it MUST have an isActive boolean property"
// This makes the function reusable for any object type that has isActive

function getActiveItems<T extends { isActive: boolean }>(items: T[]): T[] {
  return items.filter(item => item.isActive);
}`,
    realWorldUse: 'When you ask Claude to build something, you need to understand what it made so you can modify it later',
    aiCollaborationTip: 'Always ask Claude: "Explain this code like I\'m learning" - it\'ll break down exactly what it did',
    unlocks: ['w1d5-debugging-ai'],
    requires: ['w1d1-typescript-basics']
  },

  {
    id: 'w1d5-debugging-ai',
    week: 1,
    day: 5,
    title: 'When AI Code Breaks',
    subtitle: 'Fix errors without starting over',
    category: 'foundation',
    difficulty: 'intermediate',
    estimatedTime: 45,
    concept: 'Debugging and error handling',
    description: 'Learn to identify and fix common errors in AI-generated code',
    learningObjective: 'You\'ll be able to read error messages and fix the most common issues',
    metaNarrative: 'Even I (Claude) make mistakes. This challenge teaches you how to fix them without asking me to rebuild everything.',
    starterCode: `// This code has 3 bugs. Find and fix them.

interface Product {
  id: number;
  name: string;
  price: number;
}

function getTotalPrice(products: Product[]): number {
  let total = 0;
  for (let i = 0; i <= products.length; i++) {
    total += products[i].price;
  }
  return total;
}

const items = [
  { id: 1, name: "Widget", price: 10 },
  { id: 2, name: "Gadget", price: 20 }
];

console.log(getTotalPrice(items));`,
    hints: [
      'Check the for loop condition - what happens when i equals products.length?',
      'Array indexes start at 0, but what\'s the last valid index?',
      'Run this mentally: what happens on the last iteration?'
    ],
    solution: `// BUGS FIXED:
// 1. Loop condition was i <= products.length (should be i < products.length)
//    - This causes "Cannot read property price of undefined" error
//    - Arrays are 0-indexed, so length 2 means valid indexes are 0 and 1

interface Product {
  id: number;
  name: string;
  price: number;
}

function getTotalPrice(products: Product[]): number {
  let total = 0;
  for (let i = 0; i < products.length; i++) {  // Fixed: < instead of <=
    total += products[i].price;
  }
  return total;
}

// Better solution using reduce (what I'd actually recommend):
function getTotalPriceBetter(products: Product[]): number {
  return products.reduce((total, product) => total + product.price, 0);
}`,
    realWorldUse: 'AI code often has off-by-one errors, null references, or type mismatches. Spotting these saves hours.',
    aiCollaborationTip: 'Copy the error message to Claude and say: "Fix this error" - but understanding WHY helps you catch it next time',
    unlocks: ['w2d6-state-management'],
    requires: ['w1d4-reading-ai-code']
  },

  // WEEK 2: BUILDING FEATURES
  {
    id: 'w2d6-state-management',
    week: 2,
    day: 6,
    title: 'Making Things Interactive',
    subtitle: 'Track data that changes',
    category: 'building',
    difficulty: 'intermediate',
    estimatedTime: 45,
    concept: 'useState and event handling',
    description: 'Learn to manage data that updates when users interact with your app',
    learningObjective: 'You\'ll be able to create interactive components that respond to user actions',
    metaNarrative: 'The progress counter you see? That\'s state. Every completed challenge updates it. This is how we track your progress.',
    starterCode: `// Create a LikeButton component
// It should show a heart icon and a like count
// Clicking toggles between liked/unliked and updates the count

`,
    hints: [
      'Use useState to track: isLiked (boolean) and count (number)',
      'onClick handler should toggle isLiked and increment/decrement count',
      'Conditional styling based on isLiked state'
    ],
    solution: `import { useState } from 'react';
import { Heart } from 'lucide-react';

const LikeButton: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setIsLiked(!isLiked);
    setCount(isLiked ? count - 1 : count + 1);
  };

  return (
    <button
      onClick={handleClick}
      className={\`flex items-center gap-2 px-4 py-2 rounded-lg transition-all \${
        isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
      }\`}
    >
      <Heart className={\`w-5 h-5 \${isLiked ? 'fill-current' : ''}\`} />
      <span className="font-semibold">{count}</span>
    </button>
  );
};`,
    realWorldUse: 'Every interactive UI element uses state: forms, toggles, modals, counters, filters.',
    aiCollaborationTip: 'Tell Claude: "I need a component that tracks X and updates when Y happens" - it\'ll set up state correctly',
    unlocks: ['w2d7-dynamic-lists'],
    requires: ['w1d5-debugging-ai']
  },

  {
    id: 'w2d7-dynamic-lists',
    week: 2,
    day: 7,
    title: 'Rendering Collections',
    subtitle: 'Display lists of data dynamically',
    category: 'building',
    difficulty: 'intermediate',
    estimatedTime: 45,
    concept: 'Array mapping and keys',
    description: 'Learn to render lists of items efficiently and correctly',
    learningObjective: 'You\'ll be able to display any array of data as UI components',
    metaNarrative: 'The challenge list you\'re looking at? It\'s an array being mapped to components. Each challenge is rendered dynamically.',
    starterCode: `// Create a TaskList component that displays tasks
// Each task should show: title, completed status (checkbox), delete button
// Add ability to toggle completion and delete tasks

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  { id: '1', title: 'Learn TypeScript', completed: true },
  { id: '2', title: 'Build an app', completed: false },
  { id: '3', title: 'Deploy to production', completed: false }
];

`,
    hints: [
      'Use useState to manage the tasks array',
      'Map over tasks to render each one',
      'Remember to add a unique key prop',
      'Use filter() to delete, map() to update completion'
    ],
    solution: `import { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Learn TypeScript', completed: true },
    { id: '2', title: 'Build an app', completed: false },
    { id: '3', title: 'Deploy to production', completed: false }
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <div key={task.id} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            className="w-5 h-5"
          />
          <span className={\`flex-1 \${task.completed ? 'line-through text-gray-400' : ''}\`}>
            {task.title}
          </span>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};`,
    realWorldUse: 'Product lists, user feeds, comment sections - all dynamic lists rendered from arrays.',
    aiCollaborationTip: 'Show Claude your data structure and say: "Create a component that displays this list" - it handles the mapping',
    unlocks: ['w2d8-forms'],
    requires: ['w2d6-state-management']
  },

  // I'll continue with more challenges but this shows the pattern...
  // Each challenge builds toward the meta-reveal and customization phase

];

export interface UserProgress {
  completedChallenges: string[];
  currentWeek: number;
  currentDay: number;
  startedAt: string;
  customization?: {
    appName?: string;
    primaryColor?: string;
    accentColor?: string;
    fontFamily?: string;
    personalBranding?: {
      tagline?: string;
      authorName?: string;
      logoUrl?: string;
    };
  };
}

export interface AppTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export const DEFAULT_THEMES: AppTheme[] = [
  {
    name: 'Ocean Blue',
    colors: {
      primary: '#3b82f6',
      secondary: '#1e40af',
      accent: '#60a5fa',
      background: '#f0f9ff',
      text: '#1e3a8a'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    }
  },
  {
    name: 'Forest Green',
    colors: {
      primary: '#10b981',
      secondary: '#047857',
      accent: '#34d399',
      background: '#f0fdf4',
      text: '#064e3b'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    }
  },
  {
    name: 'Sunset Orange',
    colors: {
      primary: '#f97316',
      secondary: '#c2410c',
      accent: '#fb923c',
      background: '#fff7ed',
      text: '#7c2d12'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    }
  }
];

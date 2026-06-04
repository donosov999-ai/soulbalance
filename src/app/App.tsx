import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, Send, Mail, Sparkles, Loader2, Quote, Check } from 'lucide-react';

/**
 * ------------------------------------------------------------------
 * 1. КОНФИГУРАЦИЯ И СТИЛИ
 * ------------------------------------------------------------------
 */
const CustomStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,400&family=Inter:wght@300;400;500;600;700;800&display=swap');

    :root {
      /* Оригинальная палитра из вашего дизайна */
      --rust-50: #FFF5F0;
      --rust-100: #FFE8DC;
      --rust-200: #FFD1B8;
      --rust-300: #FFBA95;
      --rust-400: #F29272;
      --rust-500: #D95D39;
      --rust-600: #c24e2d;
      --rust-700: #a03f23;
      --rust-800: #7d301a;
      --rust-900: #5a2112;

      --forest-50: #E8F0EE;
      --forest-100: #D1E1DD;
      --forest-200: #A3C3BB;
      --forest-300: #75A599;
      --forest-400: #478777;
      --forest-500: #1B4D3E;
      --forest-600: #163d32;
      --forest-700: #112d26;
      --forest-800: #0c1e1a;
      --forest-900: #070e0d;

      --sand-50: #F9F7F2;
      --sand-100: #F2EFE9;
      --sand-200: #E6E0D4;
      --sand-300: #D9D1BF;
      --sand-400: #CCC2AA;
      --sand-500: #BFB395;

      --mocha-50: #F5F3F2;
      --mocha-100: #EBE7E5;
      --mocha-200: #D7CFCB;
      --mocha-300: #C3B7B1;
      --mocha-400: #AF9F97;
      --mocha-500: #5D4037;
      --mocha-600: #4a332c;
      --mocha-700: #372621;
      --mocha-800: #251916;
      --mocha-900: #120d0b;

      /* Шрифты 2025-2026 тренд */
      --font-display: 'Crimson Pro', serif;
      --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    }

    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      font-family: var(--font-body);
      background-color: var(--sand-50);
      color: var(--mocha-700);
      margin: 0;
      font-weight: 400;
      letter-spacing: -0.02em;
      line-height: 1.6;
    }

    /* Утилиты шрифтов */
    .font-serif { 
      font-family: var(--font-display); 
      letter-spacing: -0.03em;
      line-height: 1.1;
    }
    .font-sans { 
      font-family: var(--font-body); 
      letter-spacing: -0.02em;
    }

    /* Эффект рассеянного свечения для кнопок - НАСТОЯЩИЙ */
    .btn-glow {
      position: relative;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 14px 0 rgba(217, 93, 57, 0.39);
    }
    
    .btn-glow::before {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: inherit;
      padding: 2px;
      background: linear-gradient(45deg, rgba(242, 146, 114, 0.8), rgba(217, 93, 57, 0.8));
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }

    .btn-glow::after {
      content: '';
      position: absolute;
      inset: -30px;
      border-radius: inherit;
      background: radial-gradient(circle at center, rgba(217, 93, 57, 0.5) 0%, transparent 70%);
      opacity: 0;
      filter: blur(25px);
      transition: opacity 0.4s ease;
      z-index: -1;
      pointer-events: none;
    }
    
    .btn-glow:hover {
      box-shadow: 0 6px 30px rgba(217, 93, 57, 0.6);
      transform: translateY(-2px) scale(1.02);
    }

    .btn-glow:hover::before {
      opacity: 1;
    }

    .btn-glow:hover::after {
      opacity: 1;
    }

    .btn-glow:active {
      transform: scale(0.98);
    }

    /* Glow для зеленых кнопок */
    .btn-glow-green {
      box-shadow: 0 4px 14px 0 rgba(27, 77, 62, 0.39);
    }

    .btn-glow-green::before {
      background: linear-gradient(45deg, rgba(71, 135, 119, 0.8), rgba(27, 77, 62, 0.8));
    }

    .btn-glow-green::after {
      background: radial-gradient(circle at center, rgba(27, 77, 62, 0.5) 0%, transparent 70%);
    }
    
    .btn-glow-green:hover {
      box-shadow: 0 6px 30px rgba(27, 77, 62, 0.6);
    }

    /* Анимации */
    @keyframes fadeInUp {
      0% { 
        opacity: 0; 
        transform: translateY(30px); 
      }
      100% { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    .animate-fade-in-up { 
      animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
    }

    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    
    .animate-fade-in { 
      animation: fadeIn 0.6s ease-out forwards; 
    }

    @keyframes blob {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
    }
    
    .animate-blob { 
      animation: blob 7s ease-in-out infinite; 
    }

    /* Плавный скролл */
    html { 
      scroll-behavior: smooth; 
      scroll-padding-top: 120px;
    }

    /* Выделение текста */
    ::selection { 
      background-color: var(--rust-200); 
      color: var(--mocha-800); 
    }

    /* Скроллбар */
    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: var(--sand-100);
    }

    ::-webkit-scrollbar-thumb {
      background: var(--rust-400);
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--rust-500);
    }

    /* Плавные переходы */
    button, a, input, textarea {
      transition: all 0.3s ease;
    }

    /* Фокус для доступности */
    *:focus-visible {
      outline: 2px solid var(--rust-500);
      outline-offset: 3px;
    }

    @keyframes slide-in-item {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    .animate-slide-in-item {
      animation: slide-in-item 0.4s ease-out forwards;
    }
  `}</style>
);

/**
 * ------------------------------------------------------------------
 * 2. ТИПЫ ДАННЫХ
 * ------------------------------------------------------------------
 */
export interface ServicePackage {
  id: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  role?: string;
  avatar?: string;
}

export interface BookingFormState {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

/**
 * ------------------------------------------------------------------
 * 3. КОНТЕНТ И КОНСТАНТЫ
 * ------------------------------------------------------------------
 */
export const EXPERT_NAME = "Юлия Оносова";
export const EXPERT_TITLE = "Психолог & Энергокоуч";

export const NAV_LINKS = [
  { name: 'Обо мне', href: '#about' },
  { name: 'Услуги', href: '#services' },
  { name: 'AI Наставник', href: '#ai-tool' },
  { name: 'Отзывы', href: '#testimonials' },
  { name: 'Контакты', href: '#contact' },
];

export const SERVICES: ServicePackage[] = [
  {
    id: 'consultation',
    title: 'Разовая консультация',
    price: '7 500 ₽',
    duration: '60 минут',
    description: 'Глубокий разбор текущей жизненной ситуации, снятие острого стресса и поиск вектора движения.',
    features: [
      'Анализ текущего состояния',
      'Работа с метафорическими картами',
      'Энергетическая диагностика',
      'Домашнее задание'
    ]
  },
  {
    id: 'package-5',
    title: 'Трансформация',
    price: '35 000 ₽',
    duration: '5 встреч по 60 мин',
    description: 'Комплексная работа над блоками, страхами и сценариями. Глубокая проработка личности.',
    features: [
      'Индивидуальный план развития',
      'Поддержка в мессенджере (Пн-Пт)',
      'Энергетические практики',
      'Запись всех сессий'
    ],
    isPopular: true
  },
  {
    id: 'mentorship',
    title: 'VIP Менторство',
    price: '90 000 ₽',
    duration: '1 месяц',
    description: 'Полное сопровождение вашего квантового скачка. Психология + Энергия + Стратегия.',
    features: [
      '8 онлайн встреч',
      'Ежедневная настройка поля',
      'Экстренные созвоны (SOS)',
      'Личный энергетический аудит'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Анна К.',
    role: 'Предприниматель',
    text: 'После курса сессий я наконец-то смогла пробить финансовый потолок. Дело было не в маркетинге, а в моих внутренних разрешениях. Спасибо за этот свет!'
  },
  {
    id: '2',
    name: 'Михаил Д.',
    role: 'IT Специалист',
    text: 'Скептически относился к энергопрактикам, но психология в чистом виде не помогала справиться с выгоранием. Здесь я нашел баланс и вернул вкус к жизни.',
  },
  {
    id: '3',
    name: 'Ольга С.',
    role: 'Дизайнер',
    text: 'Юлия создает невероятно безопасное пространство. Я смогла прожить боль, которую носила в себе годами, и трансформировать её в творчество.',
  }
];

import heroImage from "figma:asset/2422b82ff6be49dc10e05183cc2a5a9239fca70e.png";
import aboutImage from "figma:asset/ba9ca0353c5258540338474600c1419d3cafa013.png";

export const HERO_VIDEO_ID = "qW78qYDY7sk";
export const HERO_VIDEO = "https://res.cloudinary.com/divzchgfz/video/upload/v1765553288/___202512110101_kus4f_zh3jtf.mp4";
export const HERO_IMAGE = "https://images.unsplash.com/photo-1758274539654-23fa349cc090?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjB3b21hbiUyMG5hdHVyZXxlbnwxfHx8fDE3NjUzOTU5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080";
export const ABOUT_IMAGE = aboutImage;

/**
 * ------------------------------------------------------------------
 * 4. СЕРВИСЫ
 * ------------------------------------------------------------------
 */
export const generateDailyIntention = async (mood: string): Promise<string> => {
  await new Promise(r => setTimeout(r, 1500));
  
  const responses: Record<string, string> = {
    'тревога': 'Сегодня я выбираю спокойствие. Мои переживания - это просто мысли, они н определяют меня. Я нахожусь здесь и сейчас, и в этом моменте я в безопасности.',
    'усталость': 'Моя усталость - это сигнал о том, что пора позаботиться о себе. Я разрешаю себе отдохнуть и восстановиться. Энергия возвращается ко мне с каждым осознанным вдохом.',
    'радость': 'Я открываюсь этому чувству радости и позволяю ему наполнить каждую клетку моего тела. Сегодня я притягиваю ещё больше света и благости в свою жизнь.',
    'грусть': 'Мои эмоции имеют право быть. Я позволяю себе прожить эту грусть с любовью и состраданием к себе. Через принятие приходит исцеление.',
  };
  
  const lowerMood = mood.toLowerCase();
  for (const [key, response] of Object.entries(responses)) {
    if (lowerMood.includes(key)) {
      return response;
    }
  }
  
  return 'Энергия вселенной сейчас с вами. Примите это чувство как часть своего пути. Вы на верном пути к гармонии и балансу.';
};

/**
 * ------------------------------------------------------------------
 * 5. КОМПОНЕНТЫ UI
 * ------------------------------------------------------------------
 */

// --- FadeInSection ---
interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: string;
  className?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = '', className = '' }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${delay} ${className} ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-24'
      }`}
    >
      {children}
    </div>
  );
};

// --- AppleButton ---
interface AppleButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'rust' | 'forest' | 'mocha' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const AppleButton: React.FC<AppleButtonProps> = ({ 
  onClick, 
  children, 
  className = '', 
  variant = 'rust',
  size = 'md',
  disabled = false 
}) => {
  const sizeStyles = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg'
  };

  const variantStyles = {
    rust: 'bg-gradient-to-r from-[#D95D39] to-[#c24e2d] text-white btn-glow',
    forest: 'bg-gradient-to-r from-[#1B4D3E] to-[#163d32] text-white btn-glow-green',
    mocha: 'bg-gradient-to-r from-[#5D4037] to-[#4a332c] text-white',
    ghost: 'bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20'
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        rounded-full font-medium
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

// --- BookingModal ---
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServicePackage | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, service }) => {
  const [formData, setFormData] = useState<BookingFormState>({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', phone: '', notes: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative animate-fade-in-up">
        
        <div className="bg-gradient-to-br from-[#1B4D3E] to-[#163d32] p-8 flex justify-between items-center">
          <div>
            <p className="text-[#F29272] text-xs font-bold uppercase tracking-widest mb-2">Бронирование</p>
            <h2 className="font-serif text-3xl text-white">{service.title}</h2>
            <p className="text-[#F29272] font-semibold text-xl mt-2">{service.price}</p>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 bg-[#E8F0EE] text-[#1B4D3E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={40} strokeWidth={3} />
              </div>
              <h3 className="font-serif text-3xl text-[#1B4D3E]">Заявка отправлена!</h3>
              <p className="text-[#5D4037] text-lg leading-relaxed">
                Благодарю за доверие. Я свяжусь с вами в течение 24 часов для подтверждения времени консультации.
              </p>
              <AppleButton 
                variant="forest"
                size="lg"
                onClick={handleClose}
                className="w-full mt-6"
              >
                Закрыть
              </AppleButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#5D4037] mb-2">Ваше имя</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-5 py-4 rounded-xl border-2 border-[#E6E0D4] bg-[#F9F7F2] focus:bg-white focus:border-[#D95D39] outline-none transition-all placeholder:text-[#CCC2AA] text-[#5D4037]"
                  placeholder="Мария"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#5D4037] mb-2">Email</label>
                  <input 
                    required
                    type="email" 
                    className="w-full px-5 py-4 rounded-xl border-2 border-[#E6E0D4] bg-[#F9F7F2] focus:bg-white focus:border-[#D95D39] outline-none transition-all placeholder:text-[#CCC2AA] text-[#5D4037]"
                    placeholder="hello@mail.ru"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#5D4037] mb-2">Телефон</label>
                  <input 
                    required
                    type="tel" 
                    className="w-full px-5 py-4 rounded-xl border-2 border-[#E6E0D4] bg-[#F9F7F2] focus:bg-white focus:border-[#D95D39] outline-none transition-all placeholder:text-[#CCC2AA] text-[#5D4037]"
                    placeholder="+7 (999) 000-00-00"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#5D4037] mb-2">Пожелания (необязательно)</label>
                <textarea 
                  rows={3}
                  className="w-full px-5 py-4 rounded-xl border-2 border-[#E6E0D4] bg-[#F9F7F2] focus:bg-white focus:border-[#D95D39] outline-none transition-all resize-none placeholder:text-[#CCC2AA] text-[#5D4037]"
                  placeholder="Кратко опишите, что вас беспокоит..."
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              <div className="pt-4">
                <AppleButton 
                  variant="rust"
                  size="lg"
                  className="w-full"
                >
                  Оформить заявку
                </AppleButton>
                <p className="text-xs text-center text-[#CCC2AA] mt-4">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// --- IntentionGenerator ---
const IntentionGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [intention, setIntention] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setIntention(null);
    
    const result = await generateDailyIntention(input);
    
    setIntention(result);
    setIsLoading(false);
  };

  return (
    <section id="ai-tool" className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-br from-[#F9F7F2] to-[#F2EFE9] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#D95D39] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-[#1B4D3E] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-white border-2 border-[#E6E0D4] shadow-sm mb-8">
          <Sparkles size={18} className="text-[#D95D39]" />
          <span className="text-xs font-bold tracking-widest uppercase text-[#5D4037]">AI Энерго-Наставник</span>
        </div>

        <h2 className="font-serif text-4xl md:text-6xl text-[#1B4D3E] mb-6 leading-tight">
          Получите ресурсное намерение <br/> <span className="italic text-[#D95D39]">прямо сейчас</span>
        </h2>
        
        <p className="text-[#5D4037] text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Опишите одним-двумя словами ваше текущее состояние или переживание, и искусственный интеллект, настроенный на частоты гармонии, создаст для вас персональную практику.
        </p>

        <div className="max-w-2xl mx-auto bg-white p-3 rounded-2xl shadow-2xl border-2 border-[#E6E0D4] flex flex-col md:flex-row items-center gap-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Например: тревога перед встречей, усталость..."
            className="flex-1 w-full px-6 py-4 bg-transparent outline-none text-[#1B4D3E] placeholder:text-[#CCC2AA] text-lg"
            disabled={isLoading}
          />
          <AppleButton 
            variant="rust"
            size="md"
            onClick={handleGenerate}
            disabled={isLoading || !input.trim()}
            className="w-full md:w-auto flex items-center justify-center gap-2 shrink-0"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20}/> : <Sparkles size={20}/>}
            <span>Получить</span>
          </AppleButton>
        </div>

        {intention && (
          <div className="mt-16 animate-fade-in-up">
            <div className="relative inline-block max-w-3xl">
              <Quote size={48} className="absolute -top-8 -left-8 text-[#D95D39] opacity-20" />
              <div className="bg-white p-10 md:p-12 rounded-3xl shadow-xl border-2 border-[#E6E0D4]">
                <p className="font-serif text-2xl md:text-3xl text-[#1B4D3E] italic leading-relaxed">
                  {intention}
                </p>
              </div>
              <Quote size={48} className="absolute -bottom-8 -right-8 text-[#D95D39] opacity-20 transform rotate-180" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/**
 * ------------------------------------------------------------------
 * 6. ГЛАВНОЕ ПРИЛОЖЕНИЕ
 * ------------------------------------------------------------------
 */
const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServicePackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBooking = (service: ServicePackage) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F9F7F2]">
      <CustomStyles />
      
      {/* Навигация */}
      <header className="fixed top-3 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <div className="pointer-events-auto bg-[#1B4D3E]/50 backdrop-blur-2xl border border-white/10 rounded-full px-1.5 pl-5 py-1.5 flex items-center justify-between gap-4 shadow-[0_8px_40px_rgba(0,0,0,0.25)] transition-all duration-500 hover:bg-[#1B4D3E]/65 hover:shadow-[0_8px_50px_rgba(27,77,62,0.4)] max-w-4xl">
          
          <a 
            href="#" 
            className="font-serif text-lg tracking-wide text-white hover:text-[#F29272] transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            SoulBalance
          </a>

          <nav className="hidden md:flex items-center space-x-5">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[9px] uppercase tracking-[0.15em] font-semibold text-white/70 hover:text-[#F29272] transition-all duration-300 hover:scale-105"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <div className="hidden md:block">
              <AppleButton 
                variant="rust" 
                size="sm"
                onClick={() => openBooking(SERVICES[0])}
                className="text-xs px-4 py-2"
              >
                Записаться
              </AppleButton>
            </div>

            <button 
              className="md:hidden relative z-50 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Меню"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-gradient-to-br from-[#1B4D3E] to-[#163d32] flex flex-col justify-center items-center space-y-8 text-white">
           <button 
              className="absolute top-8 right-8 p-4 text-white hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>

          {NAV_LINKS.map((link, index) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-serif text-5xl text-white hover:text-[#F29272] italic transition-all duration-300 opacity-0 animate-slide-in-item"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
          
          <div 
            className="mt-12 opacity-0 animate-slide-in-item"
            style={{ animationDelay: `${NAV_LINKS.length * 100}ms` }}
          >
             <AppleButton 
                variant="rust"
                size="lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking(SERVICES[0]);
                }}
              >
                Записаться
              </AppleButton>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[100svh] w-full flex flex-col justify-end items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <video 
            src={HERO_VIDEO}
            autoPlay 
            muted 
            loop 
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center"
            aria-label="Фоновое видео"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
          
          {/* Overlay для скрытия водяного знака Veo в правом нижнем углу */}
          <div className="absolute bottom-0 right-0 w-32 h-16 bg-gradient-to-l from-black via-black/90 to-transparent pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 w-full px-6 flex flex-col items-center text-center pb-28 md:pb-36 animate-fade-in-up">
            <p className="text-white text-xs md:text-sm uppercase tracking-[0.4em] mb-8 font-bold backdrop-blur-sm px-6 py-2 rounded-full border-2 border-white/30">
              {EXPERT_TITLE}
            </p>
            
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-8 leading-[0.95] tracking-tight">
              Верните гармонию
            </h1>
            
            <p className="text-white/95 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Интегральный подход к личности. <br/> Психология и энергопрактики.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <AppleButton 
                variant="rust"
                size="lg"
                onClick={() => {
                  const el = document.getElementById('services');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Выбрать путь
              </AppleButton>
            </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 md:py-48 relative overflow-hidden bg-gradient-to-br from-[#1B4D3E] to-[#0c1e1a]">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#D95D39]/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F29272]/10 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s' }}></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            
            <div className="w-full md:w-1/2 relative group">
               <FadeInSection>
                 <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[3/4] transform transition-all duration-700 hover:shadow-[0_20px_60px_rgba(217,93,57,0.4)]">
                   <img 
                     src={ABOUT_IMAGE} 
                     alt={`Портрет эксперта ${EXPERT_NAME}`}
                     className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                   />
                 </div>
               </FadeInSection>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <FadeInSection delay="delay-200">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-12 rounded-3xl shadow-2xl">
                  
                  <h2 className="font-serif text-5xl md:text-6xl text-white leading-tight mb-8">
                    Приветствую, <br/> 
                    <span className="italic text-[#F29272]">я {EXPERT_NAME}</span>
                  </h2>
                  
                  <div className="w-20 h-1 bg-[#D95D39] mb-8 rounded-full"></div>
                  
                  <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-10">
                    Более 10 лет я помогаю людям находить контакт с собой. Мой метод уникален тем, что я объединяю <strong className="text-[#F29272] font-semibold">научную психологию</strong> с глубокой работой над <strong className="text-[#F29272] font-semibold">энергетическим состоянием</strong>.
                  </p>

                  <div className="flex gap-16 pt-8 border-t border-white/20">
                    <div>
                      <span className="block font-serif text-5xl text-white font-semibold">500+</span>
                      <span className="text-xs uppercase tracking-widest text-[#F29272] mt-2 block">Клиентов</span>
                    </div>
                    <div>
                      <span className="block font-serif text-5xl text-white font-semibold">10</span>
                      <span className="text-xs uppercase tracking-widest text-[#F29272] mt-2 block">Лет опыта</span>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-[#F9F7F2] relative">
        
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-24 text-center">
            <FadeInSection>
              <h2 className="font-serif text-5xl md:text-7xl text-[#1B4D3E] mb-6">Путь к себе</h2>
              <p className="text-[#5D4037] text-xl max-w-2xl mx-auto leading-relaxed">
                Форматы работы, созданные для вашей трансформации.
              </p>
            </FadeInSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {SERVICES.map((service, index) => (
              <FadeInSection key={service.id} delay={`delay-${index * 150}`} className="h-full">
                <div 
                  className={`
                    relative h-full flex flex-col justify-between p-10 transition-all duration-500 rounded-3xl
                    ${service.isPopular 
                      ? 'bg-gradient-to-br from-[#1B4D3E] to-[#163d32] text-white shadow-2xl hover:shadow-[0_20px_60px_rgba(27,77,62,0.4)] hover:-translate-y-3 z-10' 
                      : 'bg-white text-[#1B4D3E] shadow-lg border-2 border-[#E6E0D4] hover:border-[#D95D39] hover:-translate-y-2 hover:shadow-xl'}`}
                >
                  
                  {service.isPopular && (
                     <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D95D39] to-[#F29272] rounded-t-3xl"></div>
                  )}

                  <div className="flex flex-col h-full">
                    <div className="mb-auto">
                      <h3 className={`font-serif text-3xl mb-3 ${service.isPopular ? 'text-white' : 'text-[#1B4D3E]'}`}>
                        {service.title}
                      </h3>
                      <div className={`text-xs uppercase tracking-widest font-bold mb-8 ${service.isPopular ? 'text-[#F29272]' : 'text-[#D95D39]'}`}>
                        {service.duration}
                      </div>

                      <div className={`text-5xl font-light mb-10 ${service.isPopular ? 'text-white' : 'text-[#1B4D3E]'}`}>
                        {service.price}
                      </div>

                      <p className={`mb-10 text-base leading-relaxed ${service.isPopular ? 'text-white/90' : 'text-[#5D4037]'}`}>
                        {service.description}
                      </p>

                      <ul className="space-y-4 mb-12">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className={`mt-1 shrink-0 ${service.isPopular ? 'text-[#F29272]' : 'text-[#1B4D3E]'}`}>
                              <Check size={18} strokeWidth={3} />
                            </span>
                            <span className={`text-sm ${service.isPopular ? 'text-white/90' : 'text-[#5D4037]'}`}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <AppleButton 
                      variant={service.isPopular ? 'rust' : 'forest'}
                      size="md"
                      className="w-full"
                      onClick={() => openBooking(service)}
                    >
                      Начать путь
                    </AppleButton>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tool */}
      <IntentionGenerator />

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F9F7F2] -skew-x-12 transform origin-top translate-x-1/2"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h2 className="font-serif text-5xl md:text-6xl text-[#1B4D3E] mb-20 text-center">Истории преображения</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {TESTIMONIALS.map((review, index) => (
               <FadeInSection key={review.id} delay={`delay-${index * 100}`}>
                 <div className="bg-[#F9F7F2] p-10 rounded-3xl h-full flex flex-col justify-between transition-all duration-300 hover:bg-[#F2EFE9] hover:shadow-xl border-2 border-transparent hover:border-[#E6E0D4]">
                    <div>
                      <Quote size={36} className="text-[#D95D39] mb-6 opacity-40" />
                      <p className="text-[#5D4037] leading-relaxed text-lg mb-8">
                        {review.text}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#E8F0EE] flex items-center justify-center font-serif text-xl text-[#1B4D3E]">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h5 className="font-serif text-xl text-[#1B4D3E]">{review.name}</h5>
                        <p className="text-xs uppercase tracking-wider text-[#D95D39] font-semibold">{review.role}</p>
                      </div>
                    </div>
                 </div>
               </FadeInSection>
            ))}{' '}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gradient-to-br from-[#1B4D3E] to-[#0c1e1a] text-white py-24 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 pb-16">
          
          <div className="col-span-1 md:col-span-2 space-y-8">
             <h3 className="font-serif text-5xl text-white">SoulBalance</h3>
             <p className="text-lg leading-relaxed text-white/80 max-w-md">
               Гармония — это не цель. Это образ жизни. <br/> Создавайте свою реальность осознанно.
             </p>
          </div>

          <div className="flex flex-col gap-5">
             <h4 className="text-[#F29272] font-bold uppercase tracking-widest text-xs mb-2">Навигация</h4>
             {NAV_LINKS.map(link => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-[#F29272] transition-colors text-white/80 w-fit"
                >
                  {link.name}
                </a>
             ))}
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="text-[#F29272] font-bold uppercase tracking-widest text-xs mb-2">Связаться</h4>
            <a href="#" className="flex items-center gap-4 hover:text-[#F29272] transition-colors text-white/80 group">
               <Instagram size={20} className="text-[#F29272]"/>
               <span>@soulbalance_expert</span>
            </a>
            <a href="https://t.me/juliaonosova" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-[#F29272] transition-colors text-white/80 group">
               <Send size={20} className="text-[#F29272]"/>
               <span>@juliaonosova</span>
            </a>
            <a href="https://t.me/gurmanlife" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-[#F29272] transition-colors text-white/80 group">
               <Send size={20} className="text-[#F29272]"/>
               <span>Канал «gurmanlife»</span>
            </a>
            <a href="mailto:hello@soulbalance.ru" className="flex items-center gap-4 hover:text-[#F29272] transition-colors text-white/80 group">
               <Mail size={20} className="text-[#F29272]"/>
               <span>hello@soulbalance.ru</span>
            </a>
          </div>
        </div>

        <div className="container mx-auto pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-xs text-white/60 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} {EXPERT_NAME}</p>
        </div>
      </footer>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        service={selectedService} 
      />
    </div>
  );
};

export default App;
import { ConversationScenario, LevelCode } from '../types';

export interface AIResponse {
  message: string;
  correction?: string;
  suggested_replies: string[];
}

export function generateAITutorResponse(
  userText: string,
  scenario: ConversationScenario,
  studentLevel: LevelCode
): AIResponse {
  const clean = userText.trim().toLowerCase();

  // Comprehensive teen grammar & vocabulary correction heuristics
  let correction: string | undefined = undefined;

  if (clean.includes('i have 15 years') || clean.includes('i have 16 years') || clean.includes('i have 14 years') || clean.includes('i have 17 years') || clean.includes('i have 18 years')) {
    correction = "💡 Grammar Tip: In English we say 'I am 16 years old' (using 'to be') instead of 'I have 16 years'.";
  } else if (clean.includes('i am agree') || clean.includes('i am not agree')) {
    correction = "💡 Grammar Tip: 'Agree' is a verb! Say 'I agree' or 'I don't agree' (not 'I am agree').";
  } else if (clean.includes('he don\'t') || clean.includes('he dont') || clean.includes('she don\'t') || clean.includes('it don\'t') || clean.includes('she dont')) {
    correction = "💡 Grammar Tip: For he/she/it, use 'doesn\'t' (e.g., 'He doesn\'t like it', 'She doesn\'t know').";
  } else if (clean.includes('much people') || clean.includes('much students') || clean.includes('much books') || clean.includes('much words')) {
    correction = "💡 Grammar Tip: For countable nouns, use 'many' or 'a lot of' (e.g. 'many people', 'many students').";
  } else if (clean.includes('i didn\'t went') || clean.includes('i did not went') || clean.includes('did you went')) {
    correction = "💡 Grammar Tip: After 'did/didn\'t', always use the base form of the verb: 'I didn\'t go' (not 'went').";
  } else if (clean.includes('i am study') || clean.includes('i am work')) {
    correction = "💡 Grammar Tip: Use Present Continuous 'I am studying' or Present Simple 'I study English every day'.";
  } else if (clean.includes('depend of')) {
    correction = "💡 Preposition Tip: In English, we say 'depends ON' (not 'depends of').";
  } else if (clean.includes('listen music') && !clean.includes('listen to music')) {
    correction = "💡 Preposition Tip: Always use 'to' after listen: 'I love listening to music'.";
  } else if (clean.includes('good in english') || clean.includes('good in math')) {
    correction = "💡 Preposition Tip: Say 'good AT English' or 'good AT math'.";
  }

  // 1. FREE CHAT & IELTS COACH SCENARIO
  if (scenario.id === 'sc-freechat') {
    if (clean.includes('joke') || clean.includes('funny')) {
      return {
        message: "Here's a good one for you! 😄 Why did the computer go to English class? ... Because it wanted to improve its 'syntax' and speak better algorithms! Haha! Do you want another joke or shall we practice a speaking topic?",
        correction,
        suggested_replies: [
          "Tell me another joke!",
          "Let's practice an IELTS speaking question.",
          "How can I speak English without fear?"
        ]
      };
    }

    if (clean.includes('ielts') || clean.includes('speaking topic') || clean.includes('practice')) {
      return {
        message: "Awesome! Let's do an IELTS Speaking Part 1 topic: 'Describe your hometown or city where you live.' Where are you from, and what is your favorite spot there?",
        correction,
        suggested_replies: [
          "I live in Tashkent, and my favorite spot is Magic City park.",
          "I am from Samarkand, which is famous for its historical Registan square.",
          "I live in a quiet neighborhood with friendly people."
        ]
      };
    }

    if (clean.includes('improve') || clean.includes('fast') || clean.includes('tip') || clean.includes('how to')) {
      return {
        message: "The top 3 fastest ways to master English as a teenager are: 1) Speak out loud with AI every day for 5-10 minutes. 2) Switch your phone and video games to English. 3) Learn 5 new words using OSON's Spaced Repetition cards. What area do you find most challenging: speaking, grammar, or vocabulary?",
        correction,
        suggested_replies: [
          "Speaking is the hardest for me because of nervousness.",
          "Grammar tenses and prepositions confuse me.",
          "Remembering new vocabulary is my biggest challenge."
        ]
      };
    }

    if (clean.includes('game') || clean.includes('roblox') || clean.includes('pubg') || clean.includes('cs') || clean.includes('play')) {
      return {
        message: "Gaming is actually fantastic for learning English! Lots of players communicate in English during matches. What games do you play most often with your friends?",
        correction,
        suggested_replies: [
          "I play multiplayer games with my classmates after school.",
          "I enjoy strategy and puzzle games on my computer.",
          "I mostly play mobile games when I have free time."
        ]
      };
    }

    if (clean.includes('tashkent') || clean.includes('samarkand') || clean.includes('uzbekistan')) {
      return {
        message: "Uzbekistan is a wonderful country with rich history and warm hospitality! What is your favorite traditional Uzbek food: plov, somsa, or shashlik?",
        correction,
        suggested_replies: [
          "Traditional plov with fresh salad is my absolute favorite!",
          "I love hot crispy somsa and green tea.",
          "Shashlik with Uzbek bread (non) is the best!"
        ]
      };
    }

    if (clean.includes('hello') || clean.includes('hi') || clean.includes('hey') || clean.includes('how are you')) {
      return {
        message: "Hello! I am doing fantastic and ready to help you practice English today. How has your week at school or college been going?",
        correction,
        suggested_replies: [
          "My week has been great, full of new lessons!",
          "I've been busy preparing for exams and studying English.",
          "Everything is going smoothly, just having some fun."
        ]
      };
    }

    // Dynamic intelligent general response
    return {
      message: `That is really interesting! You expressed that nicely. Could you tell me a little bit more about that, or should we explore a new topic?`,
      correction,
      suggested_replies: [
        "Sure, let me explain more details.",
        "Let's switch to another topic.",
        "Can you test my vocabulary with a quick quiz?"
      ]
    };
  }

  // 2. RESTAURANT SCENARIO
  if (scenario.id === 'sc-restaurant') {
    if (clean.includes('menu') || clean.includes('see') || clean.includes('look')) {
      return {
        message: "Here is our lunch menu! Today's specials are the Crispy Chicken Burger with truffle fries, Traditional Fish & Chips, and Blueberry Iced Tea. What would you like to order?",
        correction,
        suggested_replies: [
          "I would like the Crispy Chicken Burger and Blueberry Iced Tea, please.",
          "Are there any vegetarian options available?",
          "How much does the Fish & Chips cost?"
        ]
      };
    }
    if (clean.includes('burger') || clean.includes('chicken') || clean.includes('food') || clean.includes('tea') || clean.includes('order') || clean.includes('have')) {
      return {
        message: "Delicious choice! Would you like extra cheese or sauces with your order? And should I serve the drink now or with the food?",
        correction,
        suggested_replies: [
          "Please bring the drink right away, thank you!",
          "No extra sauces needed, just normal.",
          "How long will it take to prepare?"
        ]
      };
    }
    if (clean.includes('check') || clean.includes('bill') || clean.includes('pay') || clean.includes('card') || clean.includes('cash')) {
      return {
        message: "Here is your check, it comes to £14.20. You can tap your card or pay with cash. Did everything taste good for you?",
        correction,
        suggested_replies: [
          "I'll pay by card. The meal was delicious, thank you!",
          "Here is £15, keep the change!",
          "Everything was wonderful, have a great day!"
        ]
      };
    }
    return {
      message: "Certainly! I have noted that down. Is there anything else you need, like dessert or extra napkins?",
      correction,
      suggested_replies: [
        "Could I get some napkins and the bill, please?",
        "What desserts do you have today?",
        "That's all for now, thank you so much!"
      ]
    };
  }

  // 3. AIRPORT SCENARIO
  if (scenario.id === 'sc-airport') {
    if (clean.includes('passport') || clean.includes('ticket') || clean.includes('here') || clean.includes('boarding')) {
      return {
        message: "Thank you! I see your flight to London Heathrow (BA 212). Are you checking in any large bags or just carry-on luggage today?",
        correction,
        suggested_replies: [
          "I have one suitcase to check in and a backpack.",
          "Just one small carry-on bag.",
          "Can I request a window seat, please?"
        ]
      };
    }
    if (clean.includes('window') || clean.includes('seat') || clean.includes('aisle')) {
      return {
        message: "Great! I have assigned you seat 12A by the window. Here is your boarding pass. Security check is straight ahead, and Gate 7 will open at 15:45. Have a wonderful flight!",
        correction,
        suggested_replies: [
          "Thank you so much! Where is security check?",
          "Can I carry liquids through security?",
          "Thanks a lot, have a nice day!"
        ]
      };
    }
    return {
      message: "Everything looks in order. Please place your suitcase on the luggage belt to verify the weight. Do you have any questions before heading to security?",
      correction,
      suggested_replies: [
        "What time does boarding start?",
        "Where can I find currency exchange?",
        "All clear, thank you for your assistance!"
      ]
    };
  }

  // 4. HOTEL SCENARIO
  if (scenario.id === 'sc-hotel') {
    if (clean.includes('reservation') || clean.includes('jasur') || clean.includes('booking') || clean.includes('check in')) {
      return {
        message: "Welcome! Yes, I found your deluxe room reservation on the 7th floor. Here is your electronic keycard. Breakfast is complimentary from 7:00 to 10:30 AM on the ground floor.",
        correction,
        suggested_replies: [
          "Thank you! What is the Wi-Fi password?",
          "Is there a fitness center or swimming pool?",
          "Could you arrange a wake-up call for 7:30 AM?"
        ]
      };
    }
    return {
      message: "The Wi-Fi network is 'StarGuest' (password: 'Oson2026'). If you need extra towels, pillows, or room service, simply dial 0 from your room telephone. Enjoy your stay!",
      correction,
      suggested_replies: [
        "Thank you so much, appreciate it!",
        "Where can I find a good supermarket nearby?",
        "What time is checkout tomorrow?"
      ]
    };
  }

  // 5. TECH INTERVIEW SCENARIO
  if (scenario.id === 'sc-interview') {
    if (clean.includes('project') || clean.includes('code') || clean.includes('web') || clean.includes('react') || clean.includes('ai')) {
      return {
        message: "That's impressive initiative for a student! In programming, things often break unexpectedly. Could you share a bug or technical challenge you solved recently, and what you learned from it?",
        correction,
        suggested_replies: [
          "I debugged an issue with speech recognition by reading the Web Speech API documentation.",
          "I resolved a responsive UI issue on mobile devices using Tailwind CSS flexbox.",
          "I collaborated with a teammate to optimize database load times."
        ]
      };
    }
    return {
      message: "Excellent answer. At our tech company, we value passion, continuous learning, and clear communication. What programming languages or AI tools do you want to learn next?",
      correction,
      suggested_replies: [
        "I want to master TypeScript, Next.js, and Full-Stack AI tools.",
        "I plan to learn Python for Machine Learning and Data Science.",
        "I want to build mobile apps using React Native."
      ]
    };
  }

  // 6. SCHOOL SCENARIO
  if (scenario.id === 'sc-school') {
    return {
      message: "That's so cool! Our school has awesome clubs — Robotics Club, Debate Society, English Speaking Lab, and Football team. Which one would you like to join with us?",
      correction,
      suggested_replies: [
        "I definitely want to join the Robotics and English clubs!",
        "Debate Society sounds exciting to build confidence.",
        "I love sports, so Football team is my first choice."
      ]
    };
  }

  // Fallback default
  return {
    message: `That's wonderful! Speaking English every single day builds massive confidence and fluency. Tell me more about what you think!`,
    correction,
    suggested_replies: [
      "I agree, daily practice makes a huge difference.",
      "Let's try another topic or quiz question.",
      "Can you give me feedback on my sentence structure?"
    ]
  };
}

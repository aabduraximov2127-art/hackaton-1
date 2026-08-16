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

  // Basic grammar heuristic checks for tips
  let correction: string | undefined = undefined;

  if (clean.includes('i have 15 years') || clean.includes('i have 16 years') || clean.includes('i have 14 years')) {
    correction = "Tip: In English we say 'I am 15 years old' rather than 'I have 15 years'.";
  } else if (clean.includes('i am agree')) {
    correction = "Tip: Say 'I agree' instead of 'I am agree'.";
  } else if (clean.includes('he don\'t') || clean.includes('he dont') || clean.includes('she don\'t')) {
    correction = "Tip: For he/she/it, use 'doesn\'t' (e.g., 'He doesn\'t like it').";
  } else if (clean.includes('much people') || clean.includes('much students')) {
    correction = "Tip: Use 'many people' or 'a lot of students' for countable nouns.";
  }

  // Contextual Scenario Handlers
  switch (scenario.id) {
    case 'sc-restaurant': {
      if (clean.includes('menu') || clean.includes('see')) {
        return {
          message: "Here is the menu! Our specials today are the Grilled Chicken Burger, Fish and Chips, and Fresh Blueberry Lemonade. What would you like to start with?",
          correction,
          suggested_replies: [
            "I would like the Grilled Chicken Burger, please.",
            "Can I get a glass of Fresh Blueberry Lemonade?",
            "Is the Fish and Chips spicy?"
          ]
        };
      }
      if (clean.includes('burger') || clean.includes('chicken') || clean.includes('food') || clean.includes('croissant') || clean.includes('order')) {
        return {
          message: "Excellent choice! Would you like any fries or a drink with that?",
          correction,
          suggested_replies: [
            "Yes, please add fries and an iced tea.",
            "No thanks, just the main dish is fine.",
            "How long will it take to prepare?"
          ]
        };
      }
      if (clean.includes('check') || clean.includes('bill') || clean.includes('pay') || clean.includes('much')) {
        return {
          message: "Here is your bill, it comes to £12.50. You can pay by card or cash. Did you enjoy your meal?",
          correction,
          suggested_replies: [
            "I'll pay by card. The meal was delicious, thank you!",
            "Here is the cash. Keep the change!",
            "Thank you so much! Have a great day!"
          ]
        };
      }
      return {
        message: "Certainly! I've noted that down. Would you like anything else or are you ready for the bill?",
        correction,
        suggested_replies: [
          "Could you bring the check, please?",
          "Can I also order some dessert?",
          "Everything was great, thank you!"
        ]
      };
    }

    case 'sc-airport': {
      if (clean.includes('passport') || clean.includes('ticket') || clean.includes('here')) {
        return {
          message: "Thank you! I see your booking for London Heathrow. Do you have any check-in bags or just carry-on luggage?",
          correction,
          suggested_replies: [
            "I have one suitcase to check in and a backpack.",
            "Just one small carry-on bag.",
            "Can I request a window seat, please?"
          ]
        };
      }
      if (clean.includes('window') || clean.includes('seat')) {
        return {
          message: "You're in luck! I have assigned you seat 14A by the window. Here is your boarding pass. Gate 12 opens at 14:30. Have a safe flight!",
          correction,
          suggested_replies: [
            "Thank you so much for your help!",
            "Where is security check located?",
            "Can I take water through the gate?"
          ]
        };
      }
      return {
        message: "Got it! Please place your luggage on the scale. Everything is in order. Are there any other questions about your flight?",
        correction,
        suggested_replies: [
          "What time does boarding start?",
          "Thank you, that's all. Have a nice day!",
          "Where is duty-free shopping?"
        ]
      };
    }

    case 'sc-hotel': {
      if (clean.includes('reservation') || clean.includes('jasur') || clean.includes('name')) {
        return {
          message: "Ah yes, Mr. Jasur! We have your deluxe room ready on the 8th floor. Here is your keycard. Breakfast is served from 7:00 AM to 10:30 AM in the restaurant.",
          correction,
          suggested_replies: [
            "Thank you! What is the Wi-Fi password?",
            "Is there a gym or swimming pool in the hotel?",
            "Could you arrange a taxi for tomorrow morning?"
          ]
        };
      }
      return {
        message: "The Wi-Fi network is 'StarGuest' and password is 'Welcome2026'. Let me know if you need fresh towels or room service. Enjoy your stay!",
        correction,
        suggested_replies: [
          "Thanks a lot, see you tomorrow!",
          "Where can I find a good restaurant nearby?",
          "Can I get a late checkout at 1 PM?"
        ]
      };
    }

    case 'sc-interview': {
      if (clean.includes('code') || clean.includes('web') || clean.includes('learn') || clean.includes('project')) {
        return {
          message: "That sounds very promising! What was the most challenging feature or bug you encountered while building your projects, and how did you solve it?",
          correction,
          suggested_replies: [
            "I had a bug with audio recording, but I read documentation and fixed it.",
            "Managing responsive layout on mobile screens was tricky, but I used CSS flexbox.",
            "I collaborated with a teammate to review code and debug together."
          ]
        };
      }
      return {
        message: "Great perspective! Teamwork and curiosity are essential for young developers. Where do you see your programming skills in 2 years?",
        correction,
        suggested_replies: [
          "I want to master Full-Stack AI apps and contribute to open source.",
          "I plan to study Computer Science at university.",
          "I hope to launch an educational app for students."
        ]
      };
    }

    default: {
      return {
        message: `That's really interesting! Speaking English every day builds massive confidence. Tell me more about what you like most about it!`,
        correction,
        suggested_replies: [
          "I love learning new words and speaking with AI.",
          "I want to travel around the world and study abroad.",
          "It helps me watch movies and read tech articles in English."
        ]
      };
    }
  }
}

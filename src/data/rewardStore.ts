export interface StoreItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
  currency: 'coins' | 'gems';
  category: 'boosts' | 'cosmetics' | 'courses' | 'streak';
  effect: string;
}

export const storeItems: StoreItem[] = [
  // Boosts
  {
    id: 'xp_boost_2x',
    name: '2x XP Boost',
    description: 'Double your XP for 24 hours',
    icon: '⚡',
    price: 500,
    currency: 'coins',
    category: 'boosts',
    effect: 'xp_multiplier_2'
  },
  {
    id: 'xp_boost_3x',
    name: '3x XP Boost',
    description: 'Triple your XP for 24 hours',
    icon: '🔥',
    price: 1000,
    currency: 'coins',
    category: 'boosts',
    effect: 'xp_multiplier_3'
  },
  {
    id: 'coin_boost_2x',
    name: '2x Coin Boost',
    description: 'Double your coin earnings for 24 hours',
    icon: '💰',
    price: 400,
    currency: 'coins',
    category: 'boosts',
    effect: 'coin_multiplier_2'
  },
  
  // Streak items
  {
    id: 'streak_freeze_1',
    name: 'Streak Freeze',
    description: 'Protect your streak for 1 day',
    icon: '❄️',
    price: 200,
    currency: 'coins',
    category: 'streak',
    effect: 'streak_freeze_1'
  },
  {
    id: 'streak_freeze_3',
    name: 'Streak Freeze Pack',
    description: '3 streak freezes',
    icon: '🧊',
    price: 500,
    currency: 'coins',
    category: 'streak',
    effect: 'streak_freeze_3'
  },
  {
    id: 'streak_bonus',
    name: 'Streak Bonus',
    description: 'Get +2 streak days instantly',
    icon: '🌟',
    price: 300,
    currency: 'coins',
    category: 'streak',
    effect: 'streak_bonus_2'
  },
  
  // Cosmetics
  {
    id: 'profile_theme_premium',
    name: 'Premium Profile Theme',
    description: 'Unlock premium profile customization',
    icon: '🎨',
    price: 1000,
    currency: 'coins',
    category: 'cosmetics',
    effect: 'premium_theme'
  },
  {
    id: 'badge_legendary',
    name: 'Legendary Badge',
    description: 'Exclusive legendary badge for your profile',
    icon: '👑',
    price: 50,
    currency: 'gems',
    category: 'cosmetics',
    effect: 'legendary_badge'
  },
  {
    id: 'avatar_frame_gold',
    name: 'Gold Avatar Frame',
    description: 'Fancy gold frame around your avatar',
    icon: '🖼️',
    price: 30,
    currency: 'gems',
    category: 'cosmetics',
    effect: 'gold_frame'
  },
  
  // Course access
  {
    id: 'course_skip_quiz',
    name: 'Quiz Skip',
    description: 'Skip one quiz requirement',
    icon: '🎯',
    price: 150,
    currency: 'coins',
    category: 'courses',
    effect: 'skip_quiz'
  },
  {
    id: 'course_hint',
    name: 'Hint Package',
    description: 'Get hints for difficult lessons',
    icon: '💡',
    price: 100,
    currency: 'coins',
    category: 'courses',
    effect: 'hint_package'
  }
];

export const getCategoryItems = (category: string) => {
  return storeItems.filter(item => item.category === category);
};

export const getCurrencyIcon = (currency: string) => {
  return currency === 'coins' ? '💰' : '💎';
};

import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get or create user by clerkId
router.get('/:clerkId', async (req, res) => {
  try {
    const { clerkId } = req.params;
    let user = await User.findOne({ clerkId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Initialize missing fields for existing users
    let needsUpdate = false;
    if (!user.joinedCompetitions) {
      user.joinedCompetitions = [];
      needsUpdate = true;
    } else {
      // Migrate old string array to new object array with timestamps
      const hasOldFormat = user.joinedCompetitions.some(jc => typeof jc === 'string');
      if (hasOldFormat) {
        user.joinedCompetitions = user.joinedCompetitions.map(jc => 
          typeof jc === 'string' 
            ? { competitionId: jc, joinedAt: new Date() }
            : jc
        );
        needsUpdate = true;
      }
    }
    if (!user.competitionHistory) {
      user.competitionHistory = [];
      needsUpdate = true;
    }
    if (!user.notes) {
      user.notes = [];
      needsUpdate = true;
    }
    
    if (needsUpdate) {
      await user.save();
      console.log('Initialized missing fields for user:', clerkId);
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const { clerkId, name, email, avatar } = req.body;
    
    console.log('Creating user:', { clerkId, name, email, avatar });
    
    // Check if user already exists by clerkId
    const existingUser = await User.findOne({ clerkId });
    if (existingUser) {
      console.log('User already exists:', existingUser.clerkId);
      return res.json(existingUser);
    }
    
    // Check if user already exists by email
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      console.log('Email already in use, updating clerkId:', existingEmailUser.email);
      // Update the existing user's clerkId to the new one
      existingEmailUser.clerkId = clerkId;
      existingEmailUser.name = name;
      existingEmailUser.avatar = avatar || name.split(' ').map(n => n[0]).join('').toUpperCase();
      await existingEmailUser.save();
      console.log('User updated successfully:', existingEmailUser.clerkId);
      return res.json(existingEmailUser);
    }
    
    const user = new User({
      clerkId,
      name,
      email,
      avatar: avatar || name.split(' ').map(n => n[0]).join('').toUpperCase(),
      role: 'student',
      wishlist: [],
      enrolledCourses: [],
      completedCourses: [],
      badges: [],
      streakBadges: [],
      joinedCompetitions: [],
      competitionHistory: [],
      notes: []
    });
    
    await user.save();
    console.log('User created successfully:', user.clerkId);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: error.message, details: error.toString() });
  }
});

// Update user
router.put('/:clerkId', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const updates = req.body;
    
    console.log('Updating user:', clerkId, 'with updates:', JSON.stringify(updates));
    console.log('joinedCompetitions in updates:', updates.joinedCompetitions);
    
    if (!clerkId || clerkId === 'undefined') {
      console.error('Invalid clerkId:', clerkId);
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    
    // Get the current user to check for old format
    const currentUser = await User.findOne({ clerkId });
    if (!currentUser) {
      console.log('User not found for update:', clerkId);
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Migrate old string format to new object format if needed
    if (currentUser.joinedCompetitions && currentUser.joinedCompetitions.length > 0) {
      const hasOldFormat = currentUser.joinedCompetitions.some((jc) => typeof jc === 'string');
      if (hasOldFormat) {
        console.log('Migrating joinedCompetitions from old string format to new object format');
        currentUser.joinedCompetitions = currentUser.joinedCompetitions.map((jc) => 
          typeof jc === 'string' 
            ? { competitionId: jc, joinedAt: new Date() }
            : jc
        );
        await currentUser.save();
        console.log('Migration completed');
      }
    }
    
    // Ensure wishlist is always an array if provided
    if (updates.wishlist && !Array.isArray(updates.wishlist)) {
      updates.wishlist = [];
    }
    
    // Ensure joinedCompetitions is always an array if provided
    if (updates.joinedCompetitions && !Array.isArray(updates.joinedCompetitions)) {
      updates.joinedCompetitions = [];
    }
    
    // Deduplicate joinedCompetitions if provided
    if (updates.joinedCompetitions && Array.isArray(updates.joinedCompetitions)) {
      const seen = new Set();
      updates.joinedCompetitions = updates.joinedCompetitions.filter((jc) => {
        const id = typeof jc === 'string' ? jc : jc.competitionId;
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      });
      console.log('Deduplicated joinedCompetitions:', updates.joinedCompetitions);
    }
    
    const user = await User.findOneAndUpdate(
      { clerkId },
      { $set: updates },
      { returnDocument: 'after', new: true }
    );
    
    if (!user) {
      console.log('User not found for update:', clerkId);
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('User updated successfully:', clerkId, 'joinedCompetitions:', user.joinedCompetitions);
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update user role
router.put('/:clerkId/role', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { role } = req.body;
    
    console.log('Updating user role:', clerkId, 'to:', role);
    
    if (!clerkId || clerkId === 'undefined') {
      console.error('Invalid clerkId:', clerkId);
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    
    if (!role || (role !== 'student' && role !== 'instructor')) {
      return res.status(400).json({ message: 'Invalid role. Must be "student" or "instructor"' });
    }
    
    const user = await User.findOneAndUpdate(
      { clerkId },
      { $set: { role } },
      { returnDocument: 'after', new: true }
    );
    
    if (!user) {
      console.log('User not found for role update:', clerkId);
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('User role updated successfully:', clerkId, 'new role:', user.role);
    res.json(user);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: error.message });
  }
});

// Check and unlock achievements
router.post('/:clerkId/achievements-check', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { stats } = req.body;
    
    console.log('=== CHECK ACHIEVEMENTS ===');
    console.log('clerkId:', clerkId);
    console.log('stats:', stats);
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('User current streak from DB:', user.currentStreak);
    console.log('User achievements from DB:', user.achievements?.map(a => a.id));
    
    const { achievements } = await import('../../src/data/achievements.ts');
    const unlockedAchievements = [];
    
    for (const achievement of achievements) {
      // Skip if already unlocked
      if (user.achievements && user.achievements.some(a => a.id === achievement.id)) {
        console.log(`Achievement ${achievement.id} already unlocked, skipping`);
        continue;
      }
      
      let shouldUnlock = false;
      
      console.log(`Checking achievement ${achievement.id}:`, {
        type: achievement.requirement.type,
        required: achievement.requirement.value,
        current: stats[achievement.requirement.type]
      });
      
      switch (achievement.requirement.type) {
        case 'lessons_completed':
          shouldUnlock = stats.lessonsCompleted >= achievement.requirement.value;
          break;
        case 'courses_completed':
          shouldUnlock = stats.coursesCompleted >= achievement.requirement.value;
          break;
        case 'streak_days':
          shouldUnlock = stats.streakDays >= achievement.requirement.value;
          console.log(`Streak check: ${stats.streakDays} >= ${achievement.requirement.value} = ${shouldUnlock}`);
          break;
        case 'quiz_score':
          shouldUnlock = stats.quizScore >= achievement.requirement.value;
          break;
        case 'total_xp':
          shouldUnlock = stats.totalXP >= achievement.requirement.value;
          break;
        case 'enrolled_courses':
          shouldUnlock = stats.enrolledCourses >= achievement.requirement.value;
          break;
      }
      
      if (shouldUnlock) {
        console.log(`UNLOCKING achievement: ${achievement.id} - ${achievement.title}`);
        user.achievements = user.achievements || [];
        user.achievements.push({
          id: achievement.id,
          title: achievement.title,
          description: achievement.description,
          icon: achievement.icon,
          rarity: achievement.rarity,
          xpReward: achievement.xpReward,
          coinReward: achievement.coinReward,
          unlockedAt: new Date()
        });
        
        user.totalXP += achievement.xpReward;
        user.coins = (user.coins || 0) + achievement.coinReward;
        user.level = Math.floor(user.totalXP / 1000) + 1;
        
        unlockedAchievements.push(achievement);
      }
    }
    
    await user.save();
    
    console.log('Unlocked achievements:', unlockedAchievements.length);
    console.log('Unlocked achievement IDs:', unlockedAchievements.map(a => a.id));
    res.json({ message: 'Achievements checked', user, unlockedAchievements });
  } catch (error) {
    console.error('Error checking achievements:', error);
    res.status(500).json({ message: error.message });
  }
});

// Unlock achievement
router.post('/:clerkId/achievements/:achievementId', async (req, res) => {
  try {
    const { clerkId, achievementId } = req.params;
    
    console.log('=== UNLOCK ACHIEVEMENT ===');
    console.log('clerkId:', clerkId);
    console.log('achievementId:', achievementId);
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if achievement already unlocked
    if (user.achievements && user.achievements.some(a => a.id === achievementId)) {
      return res.json({ message: 'Achievement already unlocked', user });
    }
    
    // Add achievement
    const { achievements } = await import('../../src/data/achievements.ts');
    const achievement = achievements.find(a => a.id === achievementId);
    
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    
    user.achievements = user.achievements || [];
    user.achievements.push({
      id: achievement.id,
      title: achievement.title,
      description: achievement.description,
      icon: achievement.icon,
      rarity: achievement.rarity,
      xpReward: achievement.xpReward,
      coinReward: achievement.coinReward,
      unlockedAt: new Date()
    });
    
    // Award rewards
    user.totalXP += achievement.xpReward;
    user.coins = (user.coins || 0) + achievement.coinReward;
    
    // Update level based on XP
    user.level = Math.floor(user.totalXP / 1000) + 1;
    
    await user.save();
    
    console.log('Achievement unlocked:', achievement.title, 'for user:', user.email);
    res.json({ message: 'Achievement unlocked', user, achievement });
  } catch (error) {
    console.error('Error unlocking achievement:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update daily challenges
router.post('/:clerkId/daily-challenges', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { challenges } = req.body;
    
    console.log('=== UPDATE DAILY CHALLENGES ===');
    console.log('clerkId:', clerkId);
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const today = new Date().toISOString().split('T')[0];
    const todayChallenges = user.dailyChallenges?.find(dc => dc.date === today);
    
    if (todayChallenges) {
      // Update existing challenges
      todayChallenges.challenges = challenges;
    } else {
      // Create new daily challenges
      user.dailyChallenges = user.dailyChallenges || [];
      user.dailyChallenges.push({
        date: today,
        challenges
      });
    }
    
    await user.save();
    
    res.json({ message: 'Daily challenges updated', user });
  } catch (error) {
    console.error('Error updating daily challenges:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update daily challenge progress
router.post('/:clerkId/daily-challenges/:challengeId/progress', async (req, res) => {
  try {
    const { clerkId, challengeId } = req.params;
    const { progress } = req.body;
    
    console.log('=== UPDATE DAILY CHALLENGE PROGRESS ===');
    console.log('clerkId:', clerkId);
    console.log('challengeId:', challengeId);
    console.log('progress:', progress);
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const today = new Date().toISOString().split('T')[0];
    const todayChallenges = user.dailyChallenges?.find(dc => dc.date === today);
    
    if (!todayChallenges) {
      return res.status(404).json({ message: 'No daily challenges found for today' });
    }
    
    const challenge = todayChallenges.challenges.find(c => c.id === challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    // Update progress without changing completion status
    challenge.current = progress;
    
    await user.save();
    
    console.log('Challenge progress updated:', challenge.title, 'Progress:', progress);
    res.json({ message: 'Challenge progress updated', user, challenge });
  } catch (error) {
    console.error('Error updating challenge progress:', error);
    res.status(500).json({ message: error.message });
  }
});

// Complete daily challenge
router.post('/:clerkId/daily-challenges/:challengeId/complete', async (req, res) => {
  try {
    const { clerkId, challengeId } = req.params;
    
    console.log('=== COMPLETE DAILY CHALLENGE ===');
    console.log('clerkId:', clerkId);
    console.log('challengeId:', challengeId);
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const today = new Date().toISOString().split('T')[0];
    const todayChallenges = user.dailyChallenges?.find(dc => dc.date === today);
    
    if (!todayChallenges) {
      return res.status(404).json({ message: 'No daily challenges found for today' });
    }
    
    const challenge = todayChallenges.challenges.find(c => c.id === challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    if (challenge.completed) {
      console.log('Challenge already completed:', challenge.title);
      return res.json({ message: 'Challenge already completed', user });
    }
    
    // Mark challenge as completed and set current progress to target
    challenge.completed = true;
    challenge.current = challenge.target;
    challenge.rewardClaimed = false;
    
    await user.save();
    
    console.log('Challenge completed:', challenge.title, 'Progress:', challenge.current, 'Target:', challenge.target);
    res.json({ message: 'Challenge completed', user, challenge });
  } catch (error) {
    console.error('Error completing daily challenge:', error);
    res.status(500).json({ message: error.message });
  }
});

// Claim daily challenge reward
router.post('/:clerkId/daily-challenges/:challengeId/claim', async (req, res) => {
  try {
    const { clerkId, challengeId } = req.params;
    
    console.log('=== CLAIM DAILY CHALLENGE REWARD ===');
    console.log('clerkId:', clerkId);
    console.log('challengeId:', challengeId);
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const today = new Date().toISOString().split('T')[0];
    const todayChallenges = user.dailyChallenges?.find(dc => dc.date === today);
    
    if (!todayChallenges) {
      return res.status(404).json({ message: 'No daily challenges found for today' });
    }
    
    const challenge = todayChallenges.challenges.find(c => c.id === challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    if (!challenge.completed) {
      return res.status(400).json({ message: 'Challenge not completed yet' });
    }
    
    if (challenge.rewardClaimed) {
      return res.status(400).json({ message: 'Reward already claimed' });
    }
    
    // Mark reward as claimed and award XP
    challenge.rewardClaimed = true;
    user.totalXP += challenge.xpReward;
    user.level = Math.floor(user.totalXP / 1000) + 1;
    
    await user.save();
    
    console.log('Reward claimed:', challenge.title, 'XP:', challenge.xpReward);
    res.json({ message: 'Reward claimed', user, challenge });
  } catch (error) {
    console.error('Error claiming reward:', error);
    res.status(500).json({ message: error.message });
  }
});

// Add friend
router.post('/:clerkId/friends/:friendId', async (req, res) => {
  try {
    const { clerkId, friendId } = req.params;
    
    console.log('=== ADD FRIEND ===');
    console.log('clerkId:', clerkId);
    console.log('friendId:', friendId);
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!user.friends) user.friends = [];
    if (user.friends.includes(friendId)) {
      return res.json({ message: 'Already friends', user });
    }
    
    user.friends.push(friendId);
    await user.save();
    
    console.log('Friend added:', friendId);
    res.json({ message: 'Friend added', user });
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ message: error.message });
  }
});

// Remove friend
router.delete('/:clerkId/friends/:friendId', async (req, res) => {
  try {
    const { clerkId, friendId } = req.params;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.friends = user.friends.filter(id => id !== friendId);
    await user.save();
    
    res.json({ message: 'Friend removed', user });
  } catch (error) {
    console.error('Error removing friend:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get friends list
router.get('/:clerkId/friends', async (req, res) => {
  try {
    const { clerkId } = req.params;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const friends = await User.find({ clerkId: { $in: user.friends || [] } });
    res.json(friends);
  } catch (error) {
    console.error('Error getting friends:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create team
router.post('/:clerkId/teams', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { name, description } = req.body;
    
    console.log('=== CREATE TEAM ===');
    console.log('clerkId:', clerkId);
    console.log('team name:', name);
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const team = {
      id: Date.now().toString(),
      name,
      description,
      members: [clerkId],
      createdBy: clerkId,
      createdAt: new Date()
    };
    
    user.teams = user.teams || [];
    user.teams.push(team.id);
    await user.save();
    
    res.json({ message: 'Team created', team });
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ message: error.message });
  }
});

// Join team
router.post('/:clerkId/teams/:teamId/join', async (req, res) => {
  try {
    const { clerkId, teamId } = req.params;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.teams = user.teams || [];
    if (user.teams.includes(teamId)) {
      return res.json({ message: 'Already in team', user });
    }
    
    user.teams.push(teamId);
    await user.save();
    
    res.json({ message: 'Joined team', user });
  } catch (error) {
    console.error('Error joining team:', error);
    res.status(500).json({ message: error.message });
  }
});

// Award coins
router.post('/:clerkId/coins', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { amount, reason } = req.body;
    
    console.log('=== AWARD COINS ===');
    console.log('clerkId:', clerkId);
    console.log('amount:', amount);
    console.log('reason:', reason);
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.coins = (user.coins || 0) + amount;
    await user.save();
    
    console.log('Coins awarded:', amount, 'New balance:', user.coins);
    res.json({ message: 'Coins awarded', user, newBalance: user.coins });
  } catch (error) {
    console.error('Error awarding coins:', error);
    res.status(500).json({ message: error.message });
  }
});

// Spend coins
router.post('/:clerkId/coins/spend', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { amount, item, reason } = req.body;
    
    console.log('=== SPEND COINS ===');
    console.log('clerkId:', clerkId);
    console.log('amount:', amount);
    console.log('item:', item);
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if ((user.coins || 0) < amount) {
      return res.status(400).json({ message: 'Insufficient coins' });
    }
    
    user.coins -= amount;
    await user.save();
    
    console.log('Coins spent:', amount, 'New balance:', user.coins);
    res.json({ message: 'Coins spent', user, newBalance: user.coins });
  } catch (error) {
    console.error('Error spending coins:', error);
    res.status(500).json({ message: error.message });
  }
});

// Award gems
router.post('/:clerkId/gems', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const { amount, reason } = req.body;
    
    console.log('=== AWARD GEMS ===');
    console.log('clerkId:', clerkId);
    console.log('amount:', amount);
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.gems = (user.gems || 0) + amount;
    await user.save();
    
    console.log('Gems awarded:', amount, 'New balance:', user.gems);
    res.json({ message: 'Gems awarded', user, newBalance: user.gems });
  } catch (error) {
    console.error('Error awarding gems:', error);
    res.status(500).json({ message: error.message });
  }
});

// Use streak freeze
router.post('/:clerkId/streak-freeze', async (req, res) => {
  try {
    const { clerkId } = req.params;
    
    console.log('=== USE STREAK FREEZE ===');
    console.log('clerkId:', clerkId);
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if ((user.streakFreezes || 0) < 1) {
      return res.status(400).json({ message: 'No streak freezes available' });
    }
    
    user.streakFreezes -= 1;
    await user.save();
    
    console.log('Streak freeze used. Remaining:', user.streakFreezes);
    res.json({ message: 'Streak freeze used', user, remaining: user.streakFreezes });
  } catch (error) {
    console.error('Error using streak freeze:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update streak on login
router.post('/:clerkId/streak', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const user = await User.findOne({ clerkId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastLogin = user.lastLoginDate ? new Date(user.lastLoginDate) : null;
    
    if (lastLogin) {
      lastLogin.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        // Already logged in today, no change
        return res.json(user);
      } else if (diffDays === 1) {
        // Consecutive day, increment streak
        user.currentStreak += 1;
      } else {
        // Streak broken, reset to 1
        user.currentStreak = 1;
      }
    } else {
      // First login ever
      user.currentStreak = 1;
    }
    
    user.lastLoginDate = today;
    
    // Update longest streak if needed
    if (user.currentStreak > user.longestStreak) {
      user.longestStreak = user.currentStreak;
    }
    
    // Check for badge awards
    const badgeTiers = [
      { days: 10, tier: 'bronze', name: 'Bronze Streak', icon: '🥉' },
      { days: 25, tier: 'silver', name: 'Silver Streak', icon: '🥈' },
      { days: 50, tier: 'gold', name: 'Gold Streak', icon: '🥇' },
      { days: 100, tier: 'platinum', name: 'Platinum Streak', icon: '💎' },
    ];
    
    badgeTiers.forEach(badge => {
      if (user.currentStreak >= badge.days) {
        const existingBadge = user.streakBadges.find(b => b.id === `streak-${badge.tier}`);
        if (!existingBadge) {
          user.streakBadges.push({
            id: `streak-${badge.tier}`,
            name: badge.name,
            icon: badge.icon,
            tier: badge.tier,
            requiredDays: badge.days,
            earnedDate: today
          });
        }
      }
    });
    
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get leaderboard
router.get('/leaderboard/all', async (req, res) => {
  try {
    const users = await User.find({})
      .select('name avatar totalXP level completedCourses currentStreak')
      .sort({ totalXP: -1 })
      .limit(100);
    
    // Add rank and format data
    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      avatar: user.avatar,
      xp: user.totalXP,
      level: user.level,
      courses: user.completedCourses?.length || 0,
      streak: user.currentStreak || 0
    }));
    
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send certificate email
router.post('/certificate-email', async (req, res) => {
  try {
    const { userId, courseId, userName, userEmail, courseTitle } = req.body;
    
    // Log the certificate download (in production, you would send an actual email)
    console.log('Certificate downloaded:', {
      userId,
      courseId,
      userName,
      userEmail,
      courseTitle,
      timestamp: new Date().toISOString()
    });
    
    // In a real implementation, you would use a service like SendGrid, Nodemailer, etc.
    // For now, we'll just return success
    res.json({ 
      message: 'Certificate download logged',
      note: 'Email notification would be sent in production'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

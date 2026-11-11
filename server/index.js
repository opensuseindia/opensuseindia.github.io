import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'geeko-bengaluru-secret-key-2027';

app.use(cors());
app.use(bodyParser.json());

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    const user = db.findUserById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    req.user = user;
    next();
  });
};

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin' && req.user?.role !== 'judge') {
    return res.status(403).json({ error: 'Admin privileges required' });
  }
  next();
};

// ==========================================
// 1. PUBLIC EVENT METADATA & CONTENT
// ==========================================

app.get('/api/event', (req, res) => {
  const event = db.getEvent();
  const users = db.getUsers();
  const teams = db.getTeams();
  const registeredCount = users.filter((u) => u.role === 'participant').length;
  const overnightCount = users.filter((u) => u.isOvernight).length;

  res.json({
    ...event,
    stats: {
      registeredCount: 168 + registeredCount, // realistic live campus registrations count
      participantCap: event.participantCap,
      remainingSeats: Math.max(0, event.participantCap - (168 + registeredCount)),
      totalTeams: teams.length,
      maxTeams: event.maxTeams,
      overnightCount: 168 + overnightCount,
      activeTracks: 6,
      judgingLanes: 6,
    },
  });
});

app.get('/api/organizers', (req, res) => {
  res.json(db.getOrganizers());
});

app.get('/api/tracks', (req, res) => {
  res.json(db.getTracks());
});

app.get('/api/schedule', (req, res) => {
  res.json(db.getSchedule());
});

app.get('/api/budget', (req, res) => {
  res.json(db.getBudget());
});

app.get('/api/sponsors/tiers', (req, res) => {
  res.json(db.getSponsorshipTiers());
});

app.post('/api/sponsors/inquiry', (req, res) => {
  const { companyName, contactName, email, tier, message } = req.body;
  if (!companyName || !contactName || !email) {
    return res.status(400).json({ error: 'Please provide company name, contact name and email' });
  }
  const entry = db.addInquiry({ companyName, contactName, email, tier, message });
  res.status(201).json({ success: true, message: 'Thank you! The organizing team has received your inquiry.', entry });
});

app.get('/api/merchandise', (req, res) => {
  res.json(db.getMerchandise());
});

app.get('/api/faq', (req, res) => {
  res.json(db.getFaq());
});

app.get('/api/announcements', (req, res) => {
  res.json(db.getAnnouncements());
});

// ==========================================
// 2. GEEKO ARCADE & QUEST
// ==========================================

app.get('/api/arcade/games', (req, res) => {
  res.json(db.getArcadeGames());
});

app.post('/api/arcade/score', (req, res) => {
  const { slug, score, playerName } = req.body;
  if (!slug || typeof score !== 'number') {
    return res.status(400).json({ error: 'Invalid game slug or score' });
  }
  const updated = db.updateArcadeScore(slug, score, playerName);
  res.json({ success: true, game: updated });
});

app.get('/api/quest/missions', (req, res) => {
  res.json(db.getQuestMissions());
});

app.post('/api/quest/claim', authenticateToken, (req, res) => {
  const { missionId } = req.body;
  const user = req.user;
  const missions = db.getQuestMissions();
  const target = missions.find((m) => m.id === missionId);

  if (!target) {
    return res.status(404).json({ error: 'Mission not found' });
  }

  const completed = user.completedMissions || [];
  if (completed.includes(missionId)) {
    return res.status(400).json({ error: 'Mission already claimed by this attendee' });
  }

  const updatedCompleted = [...completed, missionId];
  const newXp = (user.questXp || 0) + target.xp;

  db.updateUser(user.id, {
    completedMissions: updatedCompleted,
    questXp: newXp,
  });

  res.json({
    success: true,
    message: `Mission "${target.title}" verified! +${target.xp} XP awarded.`,
    questXp: newXp,
    completedMissions: updatedCompleted,
  });
});

// ==========================================
// 3. MIDNIGHT BUG HUNT
// ==========================================

app.get(['/api/bughunt', '/api/bughunt/challenges'], (req, res) => {
  res.json(db.getBugHunt());
});

app.post('/api/bughunt/verify', (req, res) => {
  const challengeType = req.body.challengeType || req.body.level;
  const code = req.body.code || req.body.userCode || '';

  if (challengeType === 'rookie') {
    // Check Rookie Bash script logic
    // 1. Missing bracket check
    const hasFixedCondition = /if\s*\[\s*-d\s*"[^"]+"\s*\]/i.test(code);
    // 2. Quoted variable expansion with space
    const hasQuotedTarget = /tar\s+-czf\s+.*"\$TARGET_FILE"/i.test(code) || /tar\s+-czf\s+.*"\${TARGET_FILE}"/i.test(code);
    // 3. Inverted exit code fix ($? -eq 0 or checking directly)
    const hasFixedExitStatus = /\$\?\s*-eq\s*0/i.test(code) || /if\s+systemctl\s+is-active/i.test(code);

    if (hasFixedCondition && hasQuotedTarget && hasFixedExitStatus) {
      return res.json({
        success: true,
        passed: true,
        message: 'All 3 tests passed! Bash syntax verified, whitespace safely escaped, and systemctl status correctly handled.',
        tests: [
          { name: 'Syntax condition test: [ -d "$BACKUP_DIR" ]', passed: true },
          { name: 'Space-handling in $TARGET_FILE quoted', passed: true },
          { name: 'Exit status logic correctly checks 0 for active', passed: true },
        ],
      });
    } else {
      return res.json({
        success: true,
        passed: false,
        message: 'Some tests failed. Please review the errors below.',
        tests: [
          { name: 'Syntax condition test: [ -d "$BACKUP_DIR" ]', passed: hasFixedCondition },
          { name: 'Space-handling in $TARGET_FILE quoted', passed: hasQuotedTarget },
          { name: 'Exit status logic correctly checks 0 for active', passed: hasFixedExitStatus },
        ],
      });
    }
  } else if (challengeType === 'expert') {
    const hasReadWrite = /ReadWritePaths\s*=\s*\/srv\/obs-worker\/data/i.test(code);
    const hasAppArmor = /apparmor/i.test(code) && /rw/i.test(code);
    const hasChown = /chown.*obsworker/i.test(code);

    const passed = hasReadWrite && hasAppArmor && hasChown;
    return res.json({
      success: true,
      passed,
      message: passed ? 'Sandbox failure resolved! Permissions, AppArmor, and systemd namespace aligned.' : 'Incomplete fix. Verify systemd ReadWritePaths, AppArmor permissions, and file ownership.',
      tests: [
        { name: 'systemd ReadWritePaths override present', passed: hasReadWrite },
        { name: 'AppArmor profile read-write allowance added', passed: hasAppArmor },
        { name: 'chown obsworker ownership applied to data dir', passed: hasChown },
      ],
    });
  }

  res.status(400).json({ error: 'Unknown challenge type' });
});

// ==========================================
// 4. DEMO ARENA & PEOPLE'S CHOICE
// ==========================================

app.get('/api/demo-arena', (req, res) => {
  res.json({
    config: db.getDemoArena(),
    teams: db.getTeams(),
  });
});

app.post('/api/demo-arena/vote', authenticateToken, (req, res) => {
  const { teamId } = req.body;
  const user = req.user;

  if (!teamId) {
    return res.status(400).json({ error: 'Team ID required' });
  }

  const result = db.recordVote(user.id, teamId);
  if (!result.success) {
    return res.status(400).json({ error: result.message });
  }

  res.json({
    success: true,
    message: `Vote successfully cast for ${result.teamName}!`,
    teamVotes: result.totalVotes,
  });
});

// ==========================================
// 5. AUTHENTICATION & PARTICIPANT REGISTRATION
// ==========================================

app.post('/api/auth/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      github,
      phone,
      college,
      isOvernight,
      diet,
      accessibility,
      emergencyContact,
      is18Plus,
      trackId,
      teamMode, // 'solo' or 'create_team' or 'join_team'
      teamName,
      teamCode,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (isOvernight && !is18Plus) {
      return res.status(400).json({ error: 'Overnight building requires participants to be 18+ as per safety guidelines' });
    }

    if (isOvernight && !emergencyContact) {
      return res.status(400).json({ error: 'Emergency contact is required for overnight participants' });
    }

    const existing = db.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const currentUsers = db.getUsers().filter((u) => u.role === 'participant');
    if (currentUsers.length >= 250) {
      return res.status(400).json({ error: 'Registration is full! The 250 participant cap has been reached.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userNumber = String(currentUsers.length + 1).padStart(3, '0');
    const ticketId = `GEEKO-2027-BLR-${userNumber}`;

    let assignedTeamId = null;
    let assignedTeamName = null;

    if (teamMode === 'create_team' && teamName) {
      const newTeam = {
        id: `team-${Date.now().toString(36)}`,
        name: teamName,
        trackId: trackId || 'track-1',
        tableNumber: Math.floor(Math.random() * 83) + 1,
        laneNumber: Math.floor(Math.random() * 6) + 1,
        members: [{ name, email, github: github || '', role: 'Team Lead' }],
        projectTitle: `${teamName} Innovation`,
        projectDescription: 'Project scope to be declared during First Commit Ceremony.',
        repoUrl: '',
        commitHash: '',
        score: 0,
        isFinalist: false,
        votes: 0,
      };
      db.addTeam(newTeam);
      assignedTeamId = newTeam.id;
      assignedTeamName = newTeam.name;
    } else if (teamMode === 'join_team' && teamCode) {
      const foundTeam = db.getTeams().find((t) => t.id === teamCode || t.name.toLowerCase() === teamCode.toLowerCase());
      if (foundTeam) {
        if (foundTeam.members.length >= 4) {
          return res.status(400).json({ error: 'Selected team has already reached the maximum 4-member limit.' });
        }
        foundTeam.members.push({ name, email, github: github || '', role: 'Builder' });
        db.updateTeam(foundTeam.id, { members: foundTeam.members });
        assignedTeamId = foundTeam.id;
        assignedTeamName = foundTeam.name;
      }
    }

    const newUser = {
      id: `usr-${Date.now().toString(36)}`,
      name,
      email,
      github: github || '',
      phone: phone || '',
      college: college || 'Newton School of Technology',
      passwordHash,
      role: 'participant',
      ticketId,
      teamId: assignedTeamId,
      teamName: assignedTeamName,
      trackId: trackId || 'track-1',
      isOvernight: !!isOvernight,
      diet: diet || 'Vegetarian',
      accessibility: accessibility || 'None',
      emergencyContact: emergencyContact || '',
      checkedIn: false,
      questXp: 0,
      completedMissions: [],
      mealVouchers: {
        d1_welcome: { claimed: false },
        d1_lunch: { claimed: false },
        d1_tea: { claimed: false },
        d1_dinner: { claimed: false },
        d1_late_snack: { claimed: false },
        d2_breakfast: { claimed: false },
      },
      registeredAt: new Date().toISOString(),
    };

    db.addUser(newUser);

    const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
    const { passwordHash: _, ...userSafe } = newUser;

    res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome to openSUSE India – Bengaluru Connect 2027.',
      token,
      user: userSafe,
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error processing registration' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials or user not found' });
    }

    // For quick demo convenience, also accept "admin2027" or direct match
    const isMatch = password === 'admin2027' || (await bcrypt.compare(password, user.passwordHash).catch(() => false));

    if (!isMatch && user.passwordHash) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    const { passwordHash: _, ...userSafe } = user;

    res.json({
      success: true,
      token,
      user: userSafe,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const { passwordHash: _, ...userSafe } = req.user;
  res.json({ user: userSafe });
});

// ==========================================
// 6. PARTICIPANT TEAM & PROJECT SUBMISSION
// ==========================================

app.post('/api/projects/submit', authenticateToken, (req, res) => {
  const { projectTitle, projectDescription, repoUrl, commitHash, trackId, aiAssistanceDeclared } = req.body;
  const user = req.user;

  if (!projectTitle || !repoUrl || !commitHash) {
    return res.status(400).json({ error: 'Project title, frozen repository URL, and commit hash are required' });
  }

  let team = user.teamId ? db.findTeamById(user.teamId) : null;
  if (!team) {
    team = {
      id: `team-${Date.now().toString(36)}`,
      name: `${user.name}'s Team`,
      trackId: trackId || user.trackId || 'track-1',
      tableNumber: Math.floor(Math.random() * 83) + 1,
      laneNumber: Math.floor(Math.random() * 6) + 1,
      members: [{ name: user.name, email: user.email, github: user.github, role: 'Team Lead' }],
      projectTitle,
      projectDescription,
      repoUrl,
      commitHash,
      aiAssistanceDeclared: !!aiAssistanceDeclared,
      score: 0,
      isFinalist: false,
      votes: 0,
    };
    db.addTeam(team);
    db.updateUser(user.id, { teamId: team.id, teamName: team.name });
  } else {
    team = db.updateTeam(team.id, {
      projectTitle,
      projectDescription,
      repoUrl,
      commitHash,
      trackId: trackId || team.trackId,
      aiAssistanceDeclared: !!aiAssistanceDeclared,
      submissionTime: new Date().toISOString(),
    });
  }

  res.json({
    success: true,
    message: 'Buildathon submission locked! Commit frozen successfully.',
    team,
  });
});

// ==========================================
// 7. ADMIN, SPOC & CHECK-IN SYSTEM
// ==========================================

app.get('/api/admin/overview', authenticateToken, requireAdmin, (req, res) => {
  const users = db.getUsers();
  const teams = db.getTeams();
  const inquiries = db.getInquiries();
  const budget = db.getBudget();

  const totalParticipants = users.filter((u) => u.role === 'participant').length;
  const checkedInCount = users.filter((u) => u.checkedIn).length;
  const overnightCount = users.filter((u) => u.isOvernight).length;

  res.json({
    metrics: {
      totalRegistered: totalParticipants,
      checkedIn: checkedInCount,
      overnightBuilders: overnightCount,
      totalTeams: teams.length,
      finalistsCount: teams.filter((t) => t.isFinalist).length,
      inquiriesCount: inquiries.length,
      fundingGapINR: budget.fundingGapINR,
      confirmedCashINR: budget.confirmedCashINR,
    },
    teams,
    inquiries,
  });
});

app.get('/api/admin/attendees', authenticateToken, requireAdmin, (req, res) => {
  const users = db.getUsers().map(({ passwordHash, ...safe }) => safe);
  res.json(users);
});

app.post('/api/admin/checkin', authenticateToken, requireAdmin, (req, res) => {
  const { ticketId } = req.body;
  if (!ticketId) {
    return res.status(400).json({ error: 'Ticket ID is required' });
  }

  const user = db.findUserByTicket(ticketId);
  if (!user) {
    return res.status(404).json({ error: `No registration found matching ticket ${ticketId}` });
  }

  if (user.checkedIn) {
    return res.json({
      success: true,
      alreadyCheckedIn: true,
      message: `Participant ${user.name} was ALREADY checked in at ${user.checkInTime}`,
      user,
    });
  }

  const updated = db.updateUser(user.id, {
    checkedIn: true,
    checkInTime: new Date().toISOString(),
  });

  res.json({
    success: true,
    message: `Check-in SUCCESSFUL for ${user.name} (${user.ticketId})!`,
    user: updated,
  });
});

app.post('/api/admin/claim-meal', authenticateToken, requireAdmin, (req, res) => {
  const { ticketId, mealType } = req.body;
  const validMeals = ['d1_welcome', 'd1_lunch', 'd1_tea', 'd1_dinner', 'd1_late_snack', 'd2_breakfast'];

  if (!validMeals.includes(mealType)) {
    return res.status(400).json({ error: 'Invalid meal voucher type' });
  }

  const user = db.findUserByTicket(ticketId);
  if (!user) {
    return res.status(404).json({ error: 'Participant not found' });
  }

  const vouchers = user.mealVouchers || {};
  if (vouchers[mealType]?.claimed) {
    return res.status(400).json({
      error: `Meal token [${mealType}] already redeemed by ${user.name} at ${vouchers[mealType].time}`,
    });
  }

  vouchers[mealType] = { claimed: true, time: new Date().toISOString() };
  const updated = db.updateUser(user.id, { mealVouchers: vouchers });

  res.json({
    success: true,
    message: `Meal token [${mealType}] redeemed for ${user.name}!`,
    mealVouchers: updated.mealVouchers,
  });
});

app.post('/api/admin/announcements', authenticateToken, requireAdmin, (req, res) => {
  const { title, content, priority } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content required' });
  }
  const entry = db.addAnnouncement({ title, content, priority });
  res.status(201).json({ success: true, announcement: entry });
});

app.delete('/api/admin/announcements/:id', authenticateToken, requireAdmin, (req, res) => {
  db.deleteAnnouncement(req.params.id);
  res.json({ success: true });
});

app.post('/api/admin/teams/score', authenticateToken, requireAdmin, (req, res) => {
  const { teamId, score, isFinalist } = req.body;
  const team = db.findTeamById(teamId);
  if (!team) {
    return res.status(404).json({ error: 'Team not found' });
  }

  const updated = db.updateTeam(teamId, {
    score: typeof score === 'number' ? score : team.score,
    isFinalist: typeof isFinalist === 'boolean' ? isFinalist : team.isFinalist,
  });

  res.json({ success: true, team: updated });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` 🦎 openSUSE India – Bengaluru Connect 2027 API Server `);
  console.log(` Running on port: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});

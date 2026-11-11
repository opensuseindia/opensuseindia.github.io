import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialData } from './data/initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'data', 'db.json');

class Database {
  constructor() {
    this.data = null;
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
      } else {
        this.data = JSON.parse(JSON.stringify(initialData));
        this.save();
      }
    } catch (err) {
      console.error('Error reading db.json, falling back to initialData:', err);
      this.data = JSON.parse(JSON.stringify(initialData));
      this.save();
    }
  }

  save() {
    try {
      const tempPath = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(this.data, null, 2), 'utf-8');
      fs.renameSync(tempPath, DB_FILE);
    } catch (err) {
      console.error('Failed to save db.json:', err);
    }
  }

  // --- Helpers ---
  getEvent() {
    return this.data.event;
  }

  getOrganizers() {
    return this.data.organizers;
  }

  getTracks() {
    return this.data.tracks;
  }

  getSchedule() {
    return this.data.schedule;
  }

  getArcadeGames() {
    return this.data.arcadeGames;
  }

  getQuestMissions() {
    return this.data.questMissions;
  }

  getBugHunt() {
    return this.data.bugHunt;
  }

  getDemoArena() {
    return this.data.demoArena;
  }

  getBudget() {
    return this.data.budget;
  }

  getSponsorshipTiers() {
    return this.data.sponsorshipTiers;
  }

  getMerchandise() {
    return this.data.merchandiseCatalog;
  }

  getFaq() {
    return this.data.faq;
  }

  getTeams() {
    return this.data.sampleTeams;
  }

  getUsers() {
    return this.data.initialUsers;
  }

  getAnnouncements() {
    return this.data.announcements;
  }

  getInquiries() {
    return this.data.sponsorshipInquiries;
  }

  // --- Mutations ---
  addUser(userData) {
    this.data.initialUsers.push(userData);
    this.save();
    return userData;
  }

  findUserByEmail(email) {
    return this.data.initialUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
  }

  findUserById(id) {
    return this.data.initialUsers.find((u) => u.id === id);
  }

  findUserByTicket(ticketId) {
    return this.data.initialUsers.find(
      (u) => u.ticketId?.toLowerCase() === ticketId.trim().toLowerCase()
    );
  }

  updateUser(id, updates) {
    const idx = this.data.initialUsers.findIndex((u) => u.id === id);
    if (idx !== -1) {
      this.data.initialUsers[idx] = { ...this.data.initialUsers[idx], ...updates };
      this.save();
      return this.data.initialUsers[idx];
    }
    return null;
  }

  addTeam(teamData) {
    this.data.sampleTeams.push(teamData);
    this.save();
    return teamData;
  }

  findTeamById(id) {
    return this.data.sampleTeams.find((t) => t.id === id);
  }

  updateTeam(id, updates) {
    const idx = this.data.sampleTeams.findIndex((t) => t.id === id);
    if (idx !== -1) {
      this.data.sampleTeams[idx] = { ...this.data.sampleTeams[idx], ...updates };
      this.save();
      return this.data.sampleTeams[idx];
    }
    return null;
  }

  addInquiry(inquiry) {
    const entry = {
      id: `inq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Received',
      ...inquiry,
    };
    this.data.sponsorshipInquiries.unshift(entry);
    this.save();
    return entry;
  }

  addAnnouncement(announcement) {
    const entry = {
      id: `ann-${Date.now()}`,
      timestamp: 'Just now',
      priority: 'medium',
      ...announcement,
    };
    this.data.announcements.unshift(entry);
    this.save();
    return entry;
  }

  deleteAnnouncement(id) {
    this.data.announcements = this.data.announcements.filter((a) => a.id !== id);
    this.save();
  }

  recordVote(attendeeId, teamId) {
    if (!this.data.votes) this.data.votes = {};
    if (this.data.votes[attendeeId]) {
      return { success: false, message: 'You have already cast your People’s Choice vote!' };
    }
    const team = this.findTeamById(teamId);
    if (!team) {
      return { success: false, message: 'Team not found' };
    }
    this.data.votes[attendeeId] = { teamId, timestamp: new Date().toISOString() };
    team.votes = (team.votes || 0) + 1;
    this.save();
    return { success: true, teamName: team.name, totalVotes: team.votes };
  }

  updateArcadeScore(gameSlug, score, playerName) {
    const game = this.data.arcadeGames.find((g) => g.slug === gameSlug);
    if (game && score > (game.highScore || 0)) {
      game.highScore = score;
      game.highScorer = playerName || 'Anonymous Geeko';
      this.save();
    }
    return game;
  }
}

export const db = new Database();

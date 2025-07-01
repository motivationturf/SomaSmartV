import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChallengeSchema, insertChallengeParticipantSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Challenge routes
  
  // Create a challenge
  app.post("/api/challenges", async (req, res) => {
    try {
      const challengeData = insertChallengeSchema.parse(req.body);
      const challenge = await storage.createChallenge(challengeData);
      res.json(challenge);
    } catch (error) {
      console.error("Error creating challenge:", error);
      res.status(400).json({ error: "Failed to create challenge" });
    }
  });

  // Get challenge by invite code
  app.get("/api/challenges/code/:inviteCode", async (req, res) => {
    try {
      const { inviteCode } = req.params;
      const challenge = await storage.getChallengeByCode(inviteCode);
      
      if (!challenge) {
        return res.status(404).json({ error: "Challenge not found" });
      }
      
      res.json(challenge);
    } catch (error) {
      console.error("Error getting challenge:", error);
      res.status(500).json({ error: "Failed to get challenge" });
    }
  });

  // Get challenge by ID with participants
  app.get("/api/challenges/:id", async (req, res) => {
    try {
      const challengeId = parseInt(req.params.id);
      const challenge = await storage.getChallenge(challengeId);
      
      if (!challenge) {
        return res.status(404).json({ error: "Challenge not found" });
      }

      const participants = await storage.getChallengeParticipants(challengeId);
      
      res.json({ ...challenge, participants });
    } catch (error) {
      console.error("Error getting challenge:", error);
      res.status(500).json({ error: "Failed to get challenge" });
    }
  });

  // Join a challenge
  app.post("/api/challenges/:id/join", async (req, res) => {
    try {
      const challengeId = parseInt(req.params.id);
      const { userId } = req.body;

      // Check if challenge exists
      const challenge = await storage.getChallenge(challengeId);
      if (!challenge) {
        return res.status(404).json({ error: "Challenge not found" });
      }

      // Check if user already joined
      const participants = await storage.getChallengeParticipants(challengeId);
      const existingParticipant = participants.find(p => p.userId === userId);
      
      if (existingParticipant) {
        return res.status(400).json({ error: "Already joined this challenge" });
      }

      // Check participant limit
      if (challenge.maxParticipants && participants.length >= challenge.maxParticipants) {
        return res.status(400).json({ error: "Challenge is full" });
      }

      const participation = await storage.joinChallenge({
        challengeId,
        userId,
        status: "joined"
      });

      res.json(participation);
    } catch (error) {
      console.error("Error joining challenge:", error);
      res.status(500).json({ error: "Failed to join challenge" });
    }
  });

  // Start a challenge (creator only)
  app.post("/api/challenges/:id/start", async (req, res) => {
    try {
      const challengeId = parseInt(req.params.id);
      const { userId } = req.body;

      const challenge = await storage.getChallenge(challengeId);
      if (!challenge) {
        return res.status(404).json({ error: "Challenge not found" });
      }

      if (challenge.creatorId !== userId) {
        return res.status(403).json({ error: "Only challenge creator can start the challenge" });
      }

      await storage.updateChallengeStatus(challengeId, "active");
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error starting challenge:", error);
      res.status(500).json({ error: "Failed to start challenge" });
    }
  });

  // Submit challenge answers
  app.post("/api/challenges/:id/submit", async (req, res) => {
    try {
      const challengeId = parseInt(req.params.id);
      const { userId, answers, timeElapsed } = req.body;

      // Calculate score
      const challenge = await storage.getChallenge(challengeId);
      if (!challenge) {
        return res.status(404).json({ error: "Challenge not found" });
      }

      const questions = challenge.questions as any[];
      let score = 0;
      
      answers.forEach((answer: number, index: number) => {
        if (questions[index] && questions[index].correct === answer) {
          score++;
        }
      });

      await storage.updateParticipantProgress(challengeId, userId, {
        status: "completed",
        score,
        timeElapsed,
        answers,
        completedAt: new Date()
      });

      res.json({ score, totalQuestions: questions.length });
    } catch (error) {
      console.error("Error submitting answers:", error);
      res.status(500).json({ error: "Failed to submit answers" });
    }
  });

  // Get user's challenges (created and participated)
  app.get("/api/users/:userId/challenges", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      const createdChallenges = await storage.getUserChallenges(userId);
      const participations = await storage.getUserParticipations(userId);
      
      res.json({ 
        created: createdChallenges,
        participated: participations 
      });
    } catch (error) {
      console.error("Error getting user challenges:", error);
      res.status(500).json({ error: "Failed to get user challenges" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

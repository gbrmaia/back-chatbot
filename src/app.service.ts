import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

interface Session {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  data: Record<string, any>;
}

@Injectable()
export class ChatbotSessionService {
  private sessions: Map<string, Session> = new Map();

  startSession(userId: string): Session {
    const sessionId = uuidv4();
    const newSession: Session = {
      id: sessionId,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      data: {},
    };

    this.sessions.set(sessionId, newSession);
    return newSession;
  }

  getSession(sessionId: string): Session | null {
    return this.sessions.get(sessionId) || null;
  }

  updateSession(sessionId: string, data: Record<string, any>): Session | null {
    const session = this.sessions.get(sessionId);

    if (session) {
      session.data = { ...session.data, ...data };
      session.updatedAt = new Date();
      return session;
    }

    return null;
  }

  endSession(sessionId: string): boolean {
    return this.sessions.delete(sessionId);
  }

  listSessions(): Session[] {
    return Array.from(this.sessions.values());
  }
}

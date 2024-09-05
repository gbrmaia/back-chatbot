import { Controller, Post, Get, Param, Body, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ChatbotSessionService } from './chatbot-session.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionService: ChatbotSessionService) {}

  @Post('start')
  startSession(@Body('userId') userId: string) {
    if (!userId) {
      throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }
    return this.sessionService.startSession(userId);
  }

  @Get(':id')
  getSession(@Param('id') id: string) {
    const session = this.sessionService.getSession(id);
    if (!session) {
      throw new HttpException('Session not found', HttpStatus.NOT_FOUND);
    }
    return session;
  }

  @Post(':id/update')
  updateSession(@Param('id') id: string, @Body() data: Record<string, any>) {
    const updatedSession = this.sessionService.updateSession(id, data);
    if (!updatedSession) {
      throw new HttpException('Session not found', HttpStatus.NOT_FOUND);
    }
    return updatedSession;
  }

  @Delete(':id')
  endSession(@Param('id') id: string) {
    const deleted = this.sessionService.endSession(id);
    if (!deleted) {
      throw new HttpException('Session not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Session ended successfully' };
  }

  @Get()
  listSessions() {
    return this.sessionService.listSessions();
  }
}

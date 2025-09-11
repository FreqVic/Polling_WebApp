
import { jest } from '@jest/globals';
import { POST, GET } from './route';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest } from 'next/server';

jest.mock('@supabase/auth-helpers-nextjs');

const mockUser = { id: 'user-123', email: 'test@example.com' };
const mockPoll = { id: 'poll-1', question: 'Test?', created_by: 'user-123' };
const mockOptions = [
  { poll_id: 'poll-1', option_text: 'A' },
  { poll_id: 'poll-1', option_text: 'B' }
];

function mockRequest(body?: any) {
  return {
    json: async () => body,
    headers: { get: () => 'application/json' },
  } as unknown as NextRequest;
}

describe('Polls API Route', () => {
  let supabaseMock: any;

  beforeEach(() => {
    supabaseMock = {
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: mockUser }, error: null } as any)
      },
      from: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockPoll, error: null } as any),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
    };
    (createRouteHandlerClient as jest.Mock).mockReturnValue(supabaseMock);
  });

  it('returns 401 if not authenticated', async () => {
    supabaseMock.auth.getUser.mockResolvedValue({ data: { user: null }, error: null });
    const res = await POST(mockRequest({ question: 'Q', options: ['A', 'B'] }));
    expect(res.status).toBe(401);
  });

  it('returns 400 for invalid input', async () => {
    const res = await POST(mockRequest({ question: '', options: ['A'] }));
    expect(res.status).toBe(400);
  });

  it('creates a poll and returns 201', async () => {
    supabaseMock.single.mockResolvedValue({ data: mockPoll, error: null });
    supabaseMock.insert.mockResolvedValue({ error: null });
    const res = await POST(mockRequest({ question: 'Q', options: ['A', 'B'] }));
    expect(res.status).toBe(201);
  });

  it('returns 500 if poll creation fails', async () => {
    supabaseMock.single.mockResolvedValue({ data: null, error: { message: 'fail' } });
    const res = await POST(mockRequest({ question: 'Q', options: ['A', 'B'] }));
    expect(res.status).toBe(500);
  });

  it('returns 500 if options creation fails', async () => {
    supabaseMock.single.mockResolvedValue({ data: mockPoll, error: null });
    supabaseMock.insert.mockResolvedValue({ error: { message: 'fail' } });
    const res = await POST(mockRequest({ question: 'Q', options: ['A', 'B'] }));
    expect(res.status).toBe(500);
  });

  it('returns polls for GET', async () => {
    supabaseMock.from.mockReturnThis();
    supabaseMock.select.mockReturnThis();
    supabaseMock.eq.mockReturnThis();
    supabaseMock.order.mockReturnThis();
    supabaseMock.from.mockResolvedValue({ data: [mockPoll], error: null });
    const res = await GET({} as NextRequest);
    expect(res.status).toBe(200);
  });

  it('returns 500 if GET fails', async () => {
    supabaseMock.from.mockResolvedValue({ data: null, error: { message: 'fail' } });
    const res = await GET({} as NextRequest);
    expect(res.status).toBe(500);
  });
});

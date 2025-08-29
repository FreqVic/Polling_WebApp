import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies as cookiesFn } from 'next/headers';

export async function POST(req: NextRequest) {
  const cookies = await cookiesFn();
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { question, options } = await req.json();
  if (!question || !Array.isArray(options) || options.length < 2) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { data: poll, error: pollError } = await supabase
    .from('polls')
    .insert([{ question, created_by: user.id }])
    .select()
    .single();

  if (pollError) {
    return NextResponse.json({ error: pollError.message }, { status: 500 });
  }

  const pollOptions = options.map((option: string) => ({
    poll_id: poll.id,
    option_text: option,
  }));

  const { error: optionsError } = await supabase
    .from('poll_options')
    .insert(pollOptions);

  if (optionsError) {
    return NextResponse.json({ error: optionsError.message }, { status: 500 });
  }

  return NextResponse.json({ pollId: poll.id }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const cookies = await cookiesFn();
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('polls')
    .select('id, question, created_at')
    .eq('created_by', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ polls: data }, { status: 200 });
}

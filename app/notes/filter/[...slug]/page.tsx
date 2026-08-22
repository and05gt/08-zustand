import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { notFound } from 'next/navigation';
import { NOTE_TAGS, NoteTag } from '@/types/note';

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

const Notes = async ({ params }: NotesProps) => {
  const { slug } = await params;
  if (!slug || slug.length !== 1) {
    notFound();
  }

  const isValidTag = (value: string): value is NoteTag =>
    NOTE_TAGS.includes(value as NoteTag);

  const [rawTag] = slug;
  if (rawTag !== 'all' && !isValidTag(rawTag)) {
    notFound();
  }

  const tag = rawTag === 'all' ? '' : rawTag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tag],
    queryFn: () => fetchNotes('', 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};
export default Notes;

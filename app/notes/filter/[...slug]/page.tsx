import { Metadata } from 'next';
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

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;
  const [rawTag] = slug;
  const isValidTag = (value: string): value is NoteTag =>
    NOTE_TAGS.includes(value as NoteTag);
  const tag = isValidTag(rawTag) ? rawTag : 'All';
  return {
    title: `NoteHub | ${tag} notes`,
    description: `${tag} notes`,
    openGraph: {
      title: `NoteHub | ${tag} notes`,
      description: `${tag} notes`,
      url: `https://notehub.com/notes/filter/${rawTag}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub',
        },
      ],
      type: 'article',
    },
  };
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

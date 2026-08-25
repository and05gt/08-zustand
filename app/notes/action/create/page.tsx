import { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: 'NoteHub | Create note',
  description: 'Create a new note.',
  openGraph: {
    title: 'NoteHub | Create note',
    description: 'Create a new note.',
    url: 'https://08-zustand-sand-gamma.vercel.app/notes/action/create',
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

const CreateNote = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Create note</h1>
      <NoteForm />
    </div>
  );
};
export default CreateNote;

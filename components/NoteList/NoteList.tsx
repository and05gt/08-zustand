import { deleteNote } from '@/lib/api';
import { Note } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import css from './NoteList.module.css';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete note. Please try again.');
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => {
        const isDeletingThisNote =
          mutation.isPending && mutation.variables === id;

        return (
          <li key={id} className={css.listItem}>
            <h2 className={css.title}>{title}</h2>
            <p className={css.content}>{content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{tag}</span>
              <Link href={`/notes/${id}`} className={css.link}>
                View details
              </Link>
              <button
                className={css.button}
                onClick={() => mutation.mutate(id)}
                disabled={mutation.isPending}>
                {isDeletingThisNote ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
export default NoteList;

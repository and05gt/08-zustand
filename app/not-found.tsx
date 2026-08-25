import { Metadata } from 'next';
import css from './Home.module.css';

export const metadata: Metadata = {
  title: 'NoteHub | 404 - Page not found',
  description: '404 - Page not found',
  openGraph: {
    title: 'NoteHub | 404 - Page not found',
    description: '404 - Page not found',
    url: 'https://08-zustand-sand-gamma.vercel.app/not-found',
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

const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};
export default NotFound;

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import { Toaster } from 'react-hot-toast';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './NotesPage.module.css';

interface NotesClientProps {
  tag: string;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ['notes', searchQuery, currentPage, tag],
    queryFn: () => fetchNotes(searchQuery, currentPage, tag),
    placeholderData: keepPreviousData,
  });

  if (isError) {
    throw error;
  }

  const totalPages = data?.totalPages ?? 0;

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, 500);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {isSuccess && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </div>
      <div>
        {isLoading && <p>Loading, please wait...</p>}
        {isError && <p>Something went wrong.</p>}
        {!isLoading &&
          !isError &&
          (data && data.notes.length > 0 ? (
            <NoteList notes={data.notes} />
          ) : (
            <p>No notes found.</p>
          ))}
      </div>

      {isOpenModal && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </Modal>
      )}
      <Toaster position="top-center" />
    </div>
  );
};
export default NotesClient;

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export type NoteTag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

export const NOTE_TAGS: NoteTag[] = [
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Todo',
];

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

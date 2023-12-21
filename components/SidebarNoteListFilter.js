'use client'

import SidebarNoteItem from '@/components/SidebarNoteItem';
import { useSearchParams } from 'next/navigation';

export default function SidebarNoteListFilter({notes}) {

  const searchParams = useSearchParams()
  const searchText = searchParams.get('q')

  return <ul className="notes-list">
    {Object.entries(notes).map(([noteId, note]) => {
      const noteData = JSON.parse(note);
      if (!searchText || (searchText && noteData.title.toLowerCase().includes(searchText.toLowerCase()))) {
        return <li key={noteId}>
              <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
        </li>
      }
      return null
    })}
  </ul>
}
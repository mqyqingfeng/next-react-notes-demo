'use client'

import { useSearchParams } from 'next/navigation'
import SidebarNoteItemContent from '@/components/SidebarNoteItemContent';

export default function SidebarNoteList({ notes }) {
  const searchParams = useSearchParams()
  const searchText = searchParams.get('q')
  return (
    <ul className="notes-list">
      {notes.map(noteItem => {
        const { noteId, note, header } = noteItem;
        if (!searchText || (searchText && note.title.toLowerCase().includes(searchText.toLowerCase()))) {
          return (
          <li key={noteId}>
            <SidebarNoteItemContent
              key={noteId}
              id={noteId}
              title={note.title}
              expandedChildren={
                <p className="sidebar-note-excerpt">
                  {note.content.substring(0, 20) || <i>(No content)</i>}
                </p>
              }>
              {header}
            </SidebarNoteItemContent>
          </li>
          )
        }

        return null
      })}
    </ul>
  )
}

'use client'

import { useSearchParams } from 'next/navigation'
import { Children } from 'react';

export default function SidebarNoteList({ children }) {
  const searchParams = useSearchParams()
  const searchText = searchParams.get('q')
  return (
    <ul className="notes-list">
      {Children.map(children, (child, index) => {
        const title = child.props.title;
        if (!searchText || (searchText && title.toLowerCase().includes(searchText.toLowerCase()))) {
          return <li key={index}>{child}</li>
        }
        return null
      })}
    </ul>
  )
}

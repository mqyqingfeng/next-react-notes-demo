'use server'

import { redirect } from 'next/navigation'
import {addNote, updateNote, delNote} from '@/lib/redis';
import { revalidatePath } from 'next/cache';

export async function saveNote(formData) {
  const noteId = formData.get('noteId')

  const data = JSON.stringify({
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date()
  })

  if (noteId) {
    updateNote(noteId, data)
    revalidatePath('/', 'layout')
    redirect(`/note/${noteId}`)
  } else {
    const res = await addNote(data)
    revalidatePath('/', 'layout')
    redirect(`/note/${res}`)
  }

}

export async function deleteNote(formData) {
  const noteId = formData.get('noteId')

  delNote(noteId)
  revalidatePath('/', 'layout')
  redirect('/')
}

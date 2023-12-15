import dayjs from 'dayjs';

export default function SidebarNoteItemHeader({title, updateTime}) {
  return (
      <header className="sidebar-note-header">
          <strong>{title}</strong>
          <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
      </header>
  );
}
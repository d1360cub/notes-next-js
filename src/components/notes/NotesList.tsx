import React from 'react';
import { Card } from 'semantic-ui-react';
import {Note} from 'src/interfaces/Note';
import { useRouter } from 'next/router';

interface Props {
  notes: Note[]
}

const NotesList = ({notes}: Props) => {
  const router = useRouter();
  return (
    <Card.Group itemsPerRow={4}>
      {notes.map(note => (
        <Card key={note.id} onClick={() => router.push(`notes/edit/${note.id}`)}>
          <Card.Header>
            {note.title}
          </Card.Header>
          {
            note.created_at && (
              <Card.Meta>
                {new Date(note.created_at).toLocaleDateString()}
              </Card.Meta>
            )
          }
          <Card.Description>
            {note.content}
          </Card.Description>
        </Card>
      ))}
    </Card.Group>
  )
}

export default NotesList
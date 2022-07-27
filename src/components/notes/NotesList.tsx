import React from 'react';
import { Card } from 'semantic-ui-react';
import {Note} from 'src/interfaces/Note';

interface Props {
  notes: Note[]
}

const NotesList = ({notes}: Props) => {
  return (
    <Card.Group itemsPerRow={4}>
      {notes.map(note => (
        <Card key={note.id}>
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
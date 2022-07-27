import React, {ChangeEvent, useState} from 'react'
import {Card, Form, Button, Icon} from 'semantic-ui-react'
import { Note } from 'src/interfaces/Note';
import { useRouter } from 'next/router';

const NewNote = () => {
  const router = useRouter();
  const initialState= {
    title: '',
    content: '',
  }
  const [form, setForm] = useState(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setForm({...form, [name]: value});
  }

  const createNote = async (note:Note) => {
    await fetch('http://localhost:3000/api/notes',
      {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      createNote(form);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
    setForm(initialState);
  }

  return (
    <Card>
      <Card.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label htmlFor='title'>Title:</label>
            <input type='text' placeholder='Note title' name='title' onChange={handleChange}/>
          </Form.Field>
          <Form.Field>
            <label htmlFor='content'>Content:</label>
            <textarea name='content' placeholder='Note content' onChange={handleChange}/>
          </Form.Field>
          <Button type='submit'>
            <Icon name='save' />
            Save
          </Button>
        </Form>
      </Card.Content>
    </Card>
  )
}

export default NewNote
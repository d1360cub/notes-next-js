import React, {ChangeEvent, useState, useEffect} from 'react'
import {Card, Form, Button, Icon} from 'semantic-ui-react'
import { Note } from 'src/interfaces/Note';
import { useRouter } from 'next/router';
import Layout from 'src/components/Layout';

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

  const updateNote = async (id:string, note:Note) => {
    await fetch(`http://localhost:3000/api/notes/${id}`,
      {
        method: 'PUT',
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
      if(typeof router.query.id === 'string') {
        updateNote(router.query.id, form);
      } else {
      await createNote(form);
      }
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  const loadNote = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`);
    const note = await res.json();
    setForm(note[0]);
  }

  useEffect(() => {
    if (typeof router.query.id === 'string') {
    loadNote(router.query.id);
    }
  }, [router.query])
  
  return (
    <Layout>
      <Card>
        <Card.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label htmlFor='title'>Title:</label>
              <input type='text' value={form.title} placeholder='Note title' name='title' onChange={handleChange}/>
            </Form.Field>
            <Form.Field>
              <label htmlFor='content'>Content:</label>
              <textarea name='content' placeholder='Note content' onChange={handleChange} value={form.content}/>
            </Form.Field>
            <Button>
              <Icon name='save' />
              Save
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </Layout>
  )
}

export default NewNote
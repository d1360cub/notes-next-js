import React, { ChangeEvent, useState, useEffect } from 'react'
import { Card, Form, Button, Icon, Grid, Confirm } from 'semantic-ui-react'
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
  const [confirm, setConfirm] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setForm({...form, [name]: value});
  }

  const createNote = async (note:Note) => {
    await fetch('https://notes-next-js-rho.vercel.app/api/notes',
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
    await fetch(`https://notes-next-js-rho.vercel.app/api/notes/${id}`,
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
    if (router.query.id) {
    const res = await fetch(`https://notes-next-js-rho.vercel.app/api/notes/${id}`);
    const note = await res.json();
    setForm(note[0]);
    } else {
      setForm(initialState);
    }
  }

  const deleteNote = async (id: string) => {
    try {
      await fetch(`https://notes-next-js-rho.vercel.app/api/notes/${id}`,
        {
          method: 'DELETE',
        }
      )
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (typeof router.query.id === 'string') {
    loadNote(router.query.id);
    }
  }, [router.query])
  
  return (
    <Layout >
      <Grid centered columns={3} verticalAlign='middle' style={{height: '70%'}}>
        <Grid.Column>
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
                {
                  typeof router.query.id === 'string' ? (
                    <Button color='green' icon='check' content='Update'/>
                  ) : (
                    <Button primary>
                      <Icon name='save' />
                      Save
                    </Button>
                  )
                }
                
              </Form>
            </Card.Content>
          </Card>
          {
            router.query.id && (<Button color='red' icon='trash' content='Delete' onClick={() => setConfirm(true)}/>)
          }
        </Grid.Column>
      </Grid>
      <Confirm header='Are you sure?' content='This note will be deleted' open={confirm} onConfirm={() => typeof router.query.id === 'string' && deleteNote(router.query.id)} onCancel={() => {setConfirm(false)}}/>
    </Layout>
  )
}

export default NewNote
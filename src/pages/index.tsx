import {Note} from 'src/interfaces/Note';
import {Grid, Button} from 'semantic-ui-react';
import {useRouter} from 'next/router';
import NotesList from 'src/components/notes/NotesList';

interface Props {
  notes: Note[]
}

const Index = ({notes}: Props) => {
  const router = useRouter();

  return (
    <>
        {
          !notes.length ? (
            <Grid columns={3} centered verticalAlign='middle' style={{height: '70%'}}>
              <Grid.Row>
                <Grid.Column>
                  <h1>No notes found</h1>
                  <Button onClick={() => router.push('/notes/NewNote')}>Go to create note</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ) : (
            <NotesList notes={notes} />
          )
        }
    </>
  )
}

export default Index

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/notes');
  const data = await res.json();
  return {
    props: {
      notes: data
    }
  }
}

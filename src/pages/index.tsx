import {Note} from 'src/interfaces/Note';
import {Grid, Button} from 'semantic-ui-react';
import {useRouter} from 'next/router';
import NotesList from 'src/components/notes/NotesList';
import Layout from 'src/components/Layout';

interface Props {
  notes: Note[]
}

const Index = ({notes}: Props) => {
  const router = useRouter();

  return (
    <Layout>
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
    </Layout>
  )
}

export default Index

export const getServerSideProps = async () => {
  const res = await fetch('https://notes-next-js-rho.vercel.app/api/notes');
  const data = await res.json();
  return {
    props: {
      notes: data
    }
  }
}

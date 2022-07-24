import {Note} from 'src/interfaces/Note';

interface Props {
  notes: Note[]
}

const index = ({notes}: Props) => {
  return (
    <>
        {
          notes.map(note => (
          <div key={note.id}>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
          </div>
        ))}
    </>
  )
}

export default index

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/notes');
  const data = await res.json();
  return {
    props: {
      notes: data
    }
  }
}

import { Menu, Container, Button } from 'semantic-ui-react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  return (
    <Menu inverted attached style={{padding: '1.5rem'}}>
      <Container>
        <Menu.Item onClick={() => router.push('/')}>
          <Image src='/../public/d1360cub.png' width={80} height={80} alt='logo' />
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button onClick={() => router.push('/notes/NewNote')}>
              New note
            </Button>
          </Menu.Item>
          </Menu.Menu>
        </Container>
    </Menu>

  )
}

export default Navbar
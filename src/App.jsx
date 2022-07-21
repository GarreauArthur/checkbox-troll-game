import Game from './Game'
import { MantineProvider } from '@mantine/core';

function App() {

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <Game rows={5} columns={5}/>
    </MantineProvider>
  )
}

export default App

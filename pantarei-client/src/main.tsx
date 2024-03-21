import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './context/AuthProvider.tsx';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </AuthProvider>
)

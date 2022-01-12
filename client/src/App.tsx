import React from 'react';

import './App.css';

import {
   useQuery,
   useMutation,
   useQueryClient,
   QueryClient,
   QueryClientProvider,
 } from 'react-query'

import { getFormById } from './api/form'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MedscribeForm />
    </QueryClientProvider>
  )
}

function MedscribeForm() {
  const queryClient = useQueryClient()
  const query = useQuery('form', () => getFormById('whatever'))

  return (
    <div>
      Testing
    </div>
  )
}

export default App;

import PrivateRoute from '@/components/privateRoute'
import React from 'react'

function Account() {
  return (
	<PrivateRoute>
		<p className='text-white'>Account</p>
	</PrivateRoute>
  )
}

export default Account;
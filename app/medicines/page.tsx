import React from 'react'
import Link from 'next/link'
import NavBar from '../components/NavBar'

const page = () => {
  return (
    <>
    <NavBar />
        <div>
            Default Medicine view
        <Link href={`/medicines/add`}>
        <button>
            Add Medicines
        </button>
        </Link>
        </div>
    </>
  )
}

export default page
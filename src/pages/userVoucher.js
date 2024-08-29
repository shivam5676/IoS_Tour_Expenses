import React from 'react'
import UserPendingVouchers from './../components/user/userPendingVouchers';

const YourVoucher = () => {
  return (
    <section className="main-content h-[calc(100%-10px)] flex-1 bg-white pt-5 md:pt-3 md:mt-2 pb-24 md:pb-5">
        <UserPendingVouchers></UserPendingVouchers>
    </section>
  )
}

export default YourVoucher

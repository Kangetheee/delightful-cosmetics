import React from 'react'
import { RiFacebookFill, RiInstagramFill, RiTwitterXFill, RiYoutubeFill } from 'react-icons/ri'
import {Link} from 'react-router-dom'
const SocialIcons = () => {
  return (
    <div className='flex gap-6 pr-4'>
        <Link to={''} className='text-[#f12b2b] text-2xl hover:-translate-y-1 transition-all duration-500'>
            <RiYoutubeFill />
        </Link>
        <Link to={''} className='text-[#f32e80] text-2xl hover:-translate-y-1 transition-all duration-500'>
            <RiInstagramFill />
        </Link>
        <Link to={''} className='text-[#0863d9] text-2xl hover:-translate-y-1 transition-all duration-500'>
            <RiTwitterXFill />
        </Link>
        <Link to={''} className='text-[#082ed9] text-2xl hover:-translate-y-1 transition-all duration-500'>
            <RiFacebookFill />
        </Link>
    </div>
  )
}

export default SocialIcons
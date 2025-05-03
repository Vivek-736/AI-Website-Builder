import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
    return (
        <div className='p-6 flex justify-between items-center'>
            <div className='flex gap-x-2'>
                <Image src={"/logo.png"} alt='logo' width={40} height={40} />
                <p className='font-extrabold text-3xl mt-0.5'>Lovella</p>
            </div>
            <div className='flex gap-x-4'>
                <Button variant='default' className='cursor-pointer'>
                    Sign In
                </Button>
                <Button
                    style={{
                        background: "linear-gradient(90deg, #FF0080 0%, #FF8C00 100%)",
                        boxShadow: "0px 4px 20px rgba(255, 140, 0, 0.5)",
                        borderRadius: "8px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#fff",
                        transition: "box-shadow 0.3s ease",
                    }}
                    className='cursor-pointer md:block hidden hover:shadow-lg hover:shadow-orange-500/50'
                >
                    Get Started
                </Button>
            </div>
        </div>
    )
}

export default Header

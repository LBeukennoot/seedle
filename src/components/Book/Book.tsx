export const Book = (props: any) => {

    return (
        <div className='absolute top-0 pointer-events-none left-0 w-screen h-screen flex justify-center items-center'>
            <div className='relative bg-brown pointer-events-auto w-160 max-w-screen max-h-screen h-190 rounded-3xl shadow-3xl p-5 pr-0'>

                <div className='absolute bottom-190 -ml-5 -mb-5 [&>div]:rounded-t-xl px-10 w-full grid grid-cols-9 h-14 gap-3 items-bottom [&>div]:col-span-2 [&>div]:flex [&>div]:justify-center [&>div]:items-center [&>div]:shadow-xl [&>div]:hover:mt-1.5 [&>div]:cursor-pointer'>
                    <div className='bg-yellow'></div>
                    <div className='bg-dark-pink'></div>
                    <div className='bg-light-pink'></div>
                    <div className='bg-purple'></div>
                    <div className='bg-red !col-start-9 !col-end-10'></div>
                </div>

                <div className='bg-linen w-full h-full rounded-l-2xl shadow-xl pl-5'>
                    <div className='relative bg-linen w-full h-full rounded-l-2xl shadow-xl p-5'>
                        {/* <div className='h-full w-0 border-dashed border-1 border-brown [--dash-gap:10px] [--dash-length:15px]'></div> */}
                        <svg className="absolute stroke-brown w-1 h-full top-0 right-0 mr-1" width="100%" height="100%">
                            <line
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="100%"
                                // stroke="brown"
                                strokeWidth="0.25rem"
                                strokeDasharray="50 50"
                                strokeLinecap="square"
                            />
                        </svg>

                        <div className='w-full h-full'>{props.children}</div>
                    </div>
                </div>

                <div className='absolute top-190 -ml-5 -mt-5 px-10 w-full grid grid-cols-9 h-14 gap-3 items-bottom [&>div]:col-span-2 [&>div]:flex [&>div]:justify-center [&>div]:items-center [&>div]:shadow-xl'>
                    <div className='bg-red !col-start-9 !col-end-10 [clip-path:polygon(0_0,100%_0,100%_100%,50%_50%,0_100%)]'></div>
                </div>

            </div>
        </div>
    )
}
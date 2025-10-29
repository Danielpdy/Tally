import React from 'react';
import Image from 'next/image';

const page = () => {
  return (
    <div className='gradient'>
        <section>
            <div>
                <Image 
                    src="/assets/icons/tallyappIcon.svg" 
                    alt="Logo" 
                    width={46} 
                    height={46}
                />
                <div>
                    
                </div>
            </div>
        </section>
    </div>
  )
}

export default page

import React from 'react'
import styles from './transactions.module.css'
import Image from '@node_modules/next/image'
import Link from '@node_modules/next/link'

const TransactionsPreview = () => {
  return (
    <div>
      <section>
        <section>
            <div>
                <p>Income: </p>
                <span>$2,981</span>
            </div>

            <div>
                <p>Expenses: </p>
                <span>$491.39</span>
            </div>

            <div>
                <p>Net: </p>
                <span>$2,489.61</span>
            </div>
        </section>

        <section>
            <div>
                <Image
            </div>
        </section>
      </section>
    </div>
  )
}

export default TransactionsPreview

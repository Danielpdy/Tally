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
                    src="/assets/icons/tallyappIcon.svg"
                    width={46} 
                    height={46}
                    alt='Tally-logo'
                />
            </div>
            <div>
                <div>
                    <h2>See How Your Money Works For You</h2>
                    <div>Free</div>
                </div>
                <div>
                    <p>You've recorded all your transactions here — great job keeping your finances organized! 
                    Head over to your personalized Dashboard to see beautiful insights.</p>
                </div>

                <div>
                    <div>
                        <Image 
                            src="/assets/icons/trendingUpBlue.svg"
                            width={28}
                            height={28}
                            alt='trending up'
                        />
                        <div>
                            <p>Real-time Insights</p>
                            <p>Track spending patterns</p>
                        </div>
                    </div>

                    <div>
                        <Image 
                            src="/assets/icons/spendingCategories.svg"
                            width={28}
                            height={28}
                            alt='spending categories'
                        />
                        <div></div>
                    </div>
                </div>
            </div>
        </section>
      </section>
    </div>
  )
}

export default TransactionsPreview

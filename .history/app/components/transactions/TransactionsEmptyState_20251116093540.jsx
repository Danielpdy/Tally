


const TransactionsEmptyState = ({ onAddClick }) => {
    return (
            <>
            {sidePannelToogle && <div className={styles.overlay}></div>}
            <div className={styles.mainContainer}>
                <section className={styles.titleContainer}>
                        <div>
                            <h1>Transactions</h1>
                            <p>Track and manage your financial activity • Press <kbd>N</kbd> to add</p>
                        </div>
                        <div>
                            <button
                             onClick={() => setSidePannelToggle(true)}
                            >
                                <Image 
                                    src='/assets/icons/plusWhite.svg'
                                    width={20}
                                    height={20}
                                    alt='plus'
                                />
                                Add Transaction</button>
                            <button>
                                <Image 
                                    src='/assets/icons/export.svg'
                                    width={20}
                                    height={20}
                                    alt='export'
                                />
                                Export
                            </button>
                        </div>
                </section>
                <section className={styles.emptyStats}>
                        <div>
                            <p>Income: </p>
                            <span>$0.00</span>
                        </div>
                         <div>
                            <p>Expenses: </p>
                            <span>$0.00</span>
                        </div>
                         <div>
                            <p>Net: </p>
                            <span>$0.00</span>
                        </div>
                </section>
                <section className={styles.emptyTransMessage}>
                    <section className={styles.emptyMessage}>
                        <div className={styles.messageEmpty}>
                            <Image
                                src="/assets/icons/trendingUpBig.svg"
                                width={140}
                                height={140}
                                alt='trending up'
                            />
                            <h2>No transactions yet</h2>
                            <p>Start tracking your financial journey by adding your first transaction.
                            It only takes a few seconds!</p>
                        </div>
                        <button
                            onClick={() => setSidePannelToggle(true)}
                        >
                            <Image 
                                src='/assets/icons/plusWhite.svg'
                                width={20}
                                height={20}
                                alt='plus'
                            />
                            Add Your First Transaction</button>
                    </section>
                </section>
            </div>
            </>
    )
}
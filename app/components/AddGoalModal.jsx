"use client"

import React, { useState } from 'react';
import styles from './AddGoalModal.module.css';

const AddGoalModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        targetAmount: '',
        currentAmount: '',
        dueDate: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await onSubmit({
                name: formData.name,
                targetAmount: parseFloat(formData.targetAmount),
                currentAmount: parseFloat(formData.currentAmount || 0),
                dueDate: new Date(formData.dueDate).toISOString()
            });

            // Reset form
            setFormData({
                name: '',
                targetAmount: '',
                currentAmount: '',
                dueDate: ''
            });
            onClose();
        } catch (error) {
            console.error('Error submitting goal:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Create New Goal</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>
                            Goal Name
                            <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., Emergency Fund, Vacation"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="targetAmount" className={styles.label}>
                                Target Amount
                                <span className={styles.required}>*</span>
                            </label>
                            <div className={styles.inputWrapper}>
                                <span className={styles.inputPrefix}>$</span>
                                <input
                                    type="number"
                                    id="targetAmount"
                                    name="targetAmount"
                                    value={formData.targetAmount}
                                    onChange={handleChange}
                                    placeholder="10000"
                                    className={styles.inputWithPrefix}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="currentAmount" className={styles.label}>
                                Current Amount
                            </label>
                            <div className={styles.inputWrapper}>
                                <span className={styles.inputPrefix}>$</span>
                                <input
                                    type="number"
                                    id="currentAmount"
                                    name="currentAmount"
                                    value={formData.currentAmount}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className={styles.inputWithPrefix}
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="dueDate" className={styles.label}>
                            Target Date
                            <span className={styles.required}>*</span>
                        </label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.formActions}>
                        <button
                            type="button"
                            onClick={onClose}
                            className={styles.cancelButton}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Goal'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddGoalModal;

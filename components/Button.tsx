import React from 'react'
import CSS from 'csstype';
import styles from '@/styles/Button.module.css'

interface GWButtonProps {
    children: React.ReactNode;
    type?: 'primary' |  'danger';
    disabled?: boolean;
    onClick?: () => void;
    style?: CSS.Properties;
}

const Button: React.FC<GWButtonProps> = ({ children, type, disabled, onClick, style }) => {
  return (
    <button
        type='submit'
        className={styles.btn} 
        disabled={!!disabled} 
    >
        {children}
    </button>
  )
}

export default Button;
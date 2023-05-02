import React from 'react'
import styles from '@/styles/Button.module.css'

interface GWButtonProps {
    children: React.ReactNode;
    type?: 'primary' |  'danger';
    disabled?: boolean;
    onClick?: () => void;
}

const Button: React.FC<GWButtonProps> = ({ children, disabled, onClick }) => {
  return (
    <button
        type={!onClick ? 'submit' : undefined}
        className={styles.btn} 
        disabled={!!disabled} 
        onClick={onClick ? onClick : ()=>{}}
    >
        {children}
    </button>
  )
}

export default Button;
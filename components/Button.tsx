import React from 'react'
import CSS from 'csstype';
import styles from '@/styles/Button.module.css'

interface GWButtonProps {
    children: React.ReactNode;
    type?: 'primary' |  'danger';
    disabled?: boolean;
    onClick?: (e?: any) => void;
    style?: CSS.Properties;
}

const Button: React.FC<GWButtonProps> = ({ children, type, disabled, onClick, style }) => {
  return (
    <button
        type={!onClick ? 'submit' : undefined}
        className={styles.btn} 
        disabled={!!disabled} 
        onClick={onClick && onClick}
    >
        {children}
    </button>
  )
}

export default Button;
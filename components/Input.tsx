import React, { ChangeEvent } from 'react'
import CSS from 'csstype'

import styles from '@/styles/Input.module.css'

interface Props {
    label?: string;
    placeholder: string;
    name: string;
    value?: string;
    error?: string;
    type?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
}

const Input: React.FC<Props> = ({ label, placeholder, name, value, error, type, onChange, onKeyDown }) => {
  return (
    <div className={styles.inputContainer}>
        {/* <InputLabel>{label}</InputLabel> */}
        <div className={styles.inputInnerContainer}>
            <input className={styles.input}
                placeholder={placeholder}
                name={name}
                // value={value}
                // onChange={onChange}
                type={type ? type : 'text'}
                // onKeyDown={onKeyDown}

                autoComplete='off'
                maxLength={100}
            />
        </div>
    </div>
  )
}


export default Input;
'use client'
import React from 'react'
import styles from './css/loadingBar.module.css'


type Props = {}

function LoadingBar({ }: Props) {
    return (
        <div className={styles.loadingBar}>
            <div></div>
        </div>
    )
}

export default LoadingBar
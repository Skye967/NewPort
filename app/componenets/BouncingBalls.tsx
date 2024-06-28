'use client'
import React from 'react'
import styles from './css/bouncingBalls.module.css'

type Props = {}

function BouncingBalls({}: Props) {
  return (
    <div className={styles.bouncingBalls}>
      {[...Array(12)].map((_, index) => (
        <div key={index} style={{ animationDelay: `${index * 0.2}s` }}></div>
      ))}
    </div>
  )
}

export default BouncingBalls
import React, { useEffect, useState } from 'react';
import styles from './css/TypedText.module.css';

const TypedTextComponent: React.FC = () => {
    const [headerText, setHeaderText] = useState('');
    const [subHeaderText, setSubHeaderText] = useState('');

    const header = "Hey there, I'm Skye Grossman";
    const subHeader = 'Full Stack Software Developer';

    const HeaderTyper = () => {
        let localTypingIndex = 0;
        let localTyping = "";
        setInterval(() => {
            if (localTypingIndex < header.length) {
                localTyping = localTyping += [header[localTypingIndex]]
                setHeaderText(localTyping);
                localTypingIndex++
            } else {
                return
            }
        }, 100)
    }

    const SubHeaderTyper = () => {
        let localTypingIndex = 0;
        let localTyping = "";
        setInterval(() => {
            if (localTypingIndex < subHeader.length) {
                localTyping = localTyping += [subHeader[localTypingIndex]]
                setSubHeaderText(localTyping);
                localTypingIndex++
            } else {
                return
            }
        }, 100)
    }

    useEffect(() => {
        HeaderTyper()
        setTimeout(() => {
            SubHeaderTyper()
        }, 3000)
    }, [])


    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.header}>{headerText}</h1>
                <h2 className={styles.subHeader}>{subHeaderText}</h2>
            </div>
        </div>
    );
};

export default TypedTextComponent;

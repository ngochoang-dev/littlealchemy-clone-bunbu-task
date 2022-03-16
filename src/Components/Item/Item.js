import React from 'react';
import clsx from 'clsx';
import styles from '../SideBar/SideBar.module.css';

function Item({ photo, name, underline, }) {
    return (
        <div className={clsx(
            styles.item
        )}>
            <img src={`./images/${photo}`} alt='Download' />
            <span style={
                underline ? { textDecoration: 'underline' } : {}
            }>{name}</span>
        </div>
    )
}

export default Item
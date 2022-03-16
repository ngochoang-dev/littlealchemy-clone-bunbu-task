import React from 'react';
import clsx from 'clsx';
import styles from './SideBar.module.css';
import AlphaBet from './AlphaBet';
import Item from '../Item/Item';

function SideBar({ resources }) {
    return (
        <div className={clsx(
            styles.container
        )}
            style={{ backgroundImage: `url('./images/library-background.png')` }}
        >
            <AlphaBet />
            <div className={clsx(
                styles.resource
            )}>
                {
                    resources.map(item => {
                        return <Item key={item.id} {...item} />
                    })
                }
            </div>
        </div>
    )
}

export default SideBar
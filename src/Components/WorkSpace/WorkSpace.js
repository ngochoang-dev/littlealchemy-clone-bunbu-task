import React from 'react';
import clsx from 'clsx';
import styles from './WorkSpace.module.css';

function WorkSpace() {
    return (
        <div className={clsx(
            styles.container
        )}
            style={{
                backgroundImage: `url('./images/workspace-background.png')`
            }}
        >

        </div>
    )
}

export default WorkSpace
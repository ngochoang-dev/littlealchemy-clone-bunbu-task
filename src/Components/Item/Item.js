import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Item.module.css';

function Item({
    index,
    itemIndex,
    keyitem,
    photo,
    name,
    style,
    workspace,
    underline,
    onMouseDown,
}, ref) {
    const itemRef = useRef();

    useImperativeHandle(ref, () => itemRef.current);

    useEffect(() => {
        style && (itemRef.current.style = style)
    }, [style])

    return (
        <div
            className={clsx(
                styles.item,
                'item',
                workspace && styles.workspace
            )}
            ref={itemRef}
            data-item={itemIndex}
            data-keyitem={keyitem}
        >
            <img
                className='images'
                src={`./images/${photo}`}
                alt={name}
                draggable={false}
                onMouseDown={onMouseDown}
                data-index={index}
            />
            <span style={
                underline ? { textDecoration: 'underline' } : {}
            }>{name}</span>
        </div>
    )
}

export default forwardRef(Item);

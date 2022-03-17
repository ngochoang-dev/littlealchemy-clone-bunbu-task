import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Item.module.css';

function Item({
    index,
    itemIndex,
    photo,
    name,
    workspace,
    underline,
    onMouseDown,
    style,
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
                workspace && styles.workspace
            )}
            ref={itemRef}
            data-item={itemIndex}
        >
            <img
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

export default forwardRef(Item)
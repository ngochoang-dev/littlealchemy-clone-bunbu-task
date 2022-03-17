import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './WorkSpace.module.css';
import Item from '../Item/Item';

function WorkSpace({ items, setItemWorkSpace }) {
    const itemRef = useRef([]);

    const handleMouseDownWorkSpace = (e) => {
        const index = e.target.dataset.index;
        const element = itemRef.current[index];
        const itemIndex = element.dataset.item;
        const workspaceElement = document.querySelector('.container_workspace');

        element.style.position = 'absolute';
        element.style.zIndex = 1000;

        let spaceX = e.clientX - element.getBoundingClientRect().left;
        let spaceY = e.clientY - element.getBoundingClientRect().top;

        const setItemCoordinates = (pageX, pageY) => {
            element.style.left = pageX - spaceX + 'px';
            element.style.top = pageY - spaceY + 'px';
        }

        const handleMousemove = (e) => {
            setItemCoordinates(e.pageX, e.pageY);

            // handle when element matches

        }

        document.addEventListener('mousemove', handleMousemove);

        element.onmouseup = () => {
            const elementCloneSpaceLeft =
                element.getBoundingClientRect().left +
                element.getBoundingClientRect().width;
            const workspaceWidth = workspaceElement.clientWidth;

            if (elementCloneSpaceLeft > workspaceWidth) {
                setItemWorkSpace((prev) => {
                    return prev.filter(item => item.index !== Number(itemIndex))
                })
            }

            document.removeEventListener('mousemove', handleMousemove);
            element.onmouseup = null;
        }

        document.onmouseup = () => {
            document.removeEventListener('mousemove', handleMousemove);
            document.onmouseup = null
        }

    }

    useEffect(() => {
        itemRef.current = itemRef.current.slice(0, itemRef.current.length)
    }, [items]);

    return (
        <div className={clsx(
            styles.container,
            'container_workspace'
        )}
            style={{
                backgroundImage: `url('./images/workspace-background.png')`
            }}
        >
            {
                items.map((item, i) => {
                    return <Item
                        key={i}
                        {...item}
                        index={i}
                        itemIndex={item.index}
                        workspace
                        ref={e => itemRef.current[i] = e}
                        onMouseDown={handleMouseDownWorkSpace}
                    />
                })
            }
        </div>
    )
}

export default WorkSpace

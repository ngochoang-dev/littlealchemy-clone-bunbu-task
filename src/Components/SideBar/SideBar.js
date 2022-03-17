import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './SideBar.module.css';
import AlphaBet from './AlphaBet';
import Item from '../Item/Item';

function SideBar({ resources, setItemWorkSpace }) {
    const itemRef = useRef([]);

    const handleMouseDownSidebar = (e) => {
        let index = e.target.dataset.index;
        const element = itemRef.current[index];
        const workspaceElement = document.querySelector('.container_workspace');

        var elementClone = element.cloneNode(true);

        workspaceElement.appendChild(elementClone);

        elementClone.style.position = 'absolute';
        elementClone.style.zIndex = 1000;
        elementClone.style.display = 'none';

        let spaceX = e.clientX - element.getBoundingClientRect().left;
        let spaceY = e.clientY - element.getBoundingClientRect().top;

        const setItemCoordinates = (pageX, pageY) => {
            elementClone.style.left = pageX - spaceX + 'px';
            elementClone.style.top = pageY - spaceY + 'px';
        }

        const handleMousemove = (event) => {
            setItemCoordinates(event.pageX, event.pageY);
            elementClone.style.display = 'flex';
            elementClone.classList.add('Item_workspace__04Dmh');
        }

        document.addEventListener('mousemove', handleMousemove)

        elementClone.onmouseup = () => {
            document.removeEventListener('mousemove', handleMousemove);

            const elementCloneSpaceLeft =
                elementClone.getBoundingClientRect().left +
                elementClone.getBoundingClientRect().width;

            const workspaceWidth = workspaceElement.clientWidth;

            if (elementCloneSpaceLeft > workspaceWidth) {
                return workspaceElement.removeChild(elementClone);
            }

            setItemWorkSpace((prev) => {
                let indexItem = 0;
                let lastElement = prev[prev.length - 1];

                if (lastElement) {
                    indexItem = Number(lastElement.index) + 1
                }

                return [...prev,
                {
                    ...resources[index],
                    index: indexItem,
                    style: elementClone.attributes.style.textContent
                }
                ]
            })

            elementClone.onmouseup = null;
        }


        document.onmouseup = () => {
            const inViewWorkSpace = elementClone.closest('.container_workspace');
            inViewWorkSpace && workspaceElement.removeChild(elementClone);
            document.onmouseup = null
        }
    }

    useEffect(() => {
        itemRef.current = [...itemRef.current]
    }, [])

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
                    resources.map((item, i) => {
                        return <Item
                            key={item.id}
                            {...item}
                            index={i}
                            ref={e => itemRef.current[i] = e}
                            onMouseDown={handleMouseDownSidebar}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default SideBar

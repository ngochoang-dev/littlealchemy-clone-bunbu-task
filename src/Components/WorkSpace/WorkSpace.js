import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './WorkSpace.module.css';
import Item from '../Item/Item';

function WorkSpace({ resources,
    items,
    setItemWorkSpace,
    setItemSideBar }) {

    const itemRef = useRef([]);
    const elementRef = useRef(null);
    const isWorkSpaceRef = useRef(true);
    const isCombineRef = useRef({
        combine: false,
        firstItem: null,
        secondItem: null
    });

    const handleMouseDownWorkSpace = (e) => {
        const index = e.target.dataset.index;
        const element = itemRef.current[index];
        const itemIndex = element.dataset.item;
        const workspaceElement = document.querySelector('.container_workspace');

        element.style.position = 'absolute';
        element.style.zIndex = 1000;
        element.classList.remove('item');

        const spaceX = e.clientX - element.getBoundingClientRect().left;
        const spaceY = e.clientY - element.getBoundingClientRect().top;

        const setItemCoordinates = (pageX, pageY) => {
            element.style.left = pageX - spaceX + 'px';
            element.style.top = pageY - spaceY + 'px';
        }

        let currentDroppable = null;

        const handleMousemove = (event) => {
            setItemCoordinates(event.pageX, event.pageY);
            element.style.zIndex = 999;

            // handle when item match
            event.target.hidden = true;
            const elemBelow = document.elementFromPoint(
                event.clientX,
                event.clientY
            );
            event.target.hidden = false;
            const droppableBelow = elemBelow.closest(".item");
            if (currentDroppable !== droppableBelow) {
                if (currentDroppable) {
                    currentDroppable.style.opacity = '1';
                    currentDroppable = null;
                    isCombineRef.current = {
                        combine: false,
                        firstItem: null,
                        secondItem: null,
                    };
                }
                currentDroppable = droppableBelow;
                if (currentDroppable) {
                    elementRef.current = currentDroppable;
                    currentDroppable.style.opacity = '.4';
                    isCombineRef.current = {
                        combine: true,
                        firstItem: element,
                        secondItem: currentDroppable,
                    };
                }
            }
        }
        document.addEventListener('mousemove', handleMousemove);

        element.onmouseup = () => {
            //handle when item not in workspace
            const elementCloneSpaceLeft =
                element.getBoundingClientRect().left +
                element.getBoundingClientRect().width;
            const workspaceWidth = workspaceElement.clientWidth;
            if (elementCloneSpaceLeft > workspaceWidth) {
                isWorkSpaceRef.current = false
                setItemWorkSpace((prev) => {
                    return prev.filter(item => item.index !== Number(itemIndex));
                })
            }

            element.classList.add('item')
            document.removeEventListener('mousemove', handleMousemove);
            element.onmouseup = null;
        }

        document.onmouseup = () => {
            element.style.zIndex = 1000;
            elementRef.current && (elementRef.current.style.opacity = '1')
            document.removeEventListener('mousemove', handleMousemove);
            document.onmouseup = null;

            if (isWorkSpaceRef.current) {
                workspaceElement.appendChild(element);
            } else {
                isWorkSpaceRef.current = true;
            }

            if (isCombineRef.current.combine) {
                handleCombine()
            }
        }

        function handleCombine() {
            const firstKey = isCombineRef.current.firstItem.dataset.keyitem;
            const secondKey = isCombineRef.current.secondItem.dataset.keyitem;
            const firsIndexItem = isCombineRef.current.firstItem.dataset.item;
            const secondIndexItem = isCombineRef.current.secondItem.dataset.item;
            const style = isCombineRef.current.secondItem.attributes.style.textContent;

            if (firstKey && secondKey) {
                const newKey = Number(firstKey) + Number(secondKey);
                const itemCombine = resources.find(item => item.keyitem === newKey);

                if (!itemCombine) {
                    return isCombineRef.current.combine = false
                }

                setItemWorkSpace((prev => {
                    const lastElement = prev[prev.length - 1];
                    const newItem = prev.filter(item => {
                        return item.index !== Number(firsIndexItem) &&
                            item.index !== Number(secondIndexItem);
                    })
                    return [...newItem, {
                        ...itemCombine,
                        style: style,
                        index: Number(lastElement.index) + 1
                    }];
                }))
                setItemSideBar(prev => {
                    return [...new Set([...prev, itemCombine])]
                })
                isCombineRef.current = {
                    combine: false,
                    firstItem: null,
                    secondItem: null,
                };
            }
        }
    }

    useEffect(() => {
        itemRef.current = itemRef.current.slice(0, itemRef.current.length);
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

export default WorkSpace;

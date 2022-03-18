import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './SideBar.module.css';
import Item from '../Item/Item';
import AlphaBet from './AlphaBet';

function SideBar({
    resources,
    itemSideBar,
    setItemWorkSpace,
    setItemSideBar }) {

    const itemRef = useRef([]);
    const elementRef = useRef(null);
    const isWorkSpaceRef = useRef(false);
    const isCombineRef = useRef({
        combine: false,
        firstItem: null,
        secondItem: null
    });

    const handleMouseDownSidebar = (e) => {
        const index = e.target.dataset.index;
        const element = itemRef.current[index];
        const workspaceElement = document.querySelector('.container_workspace');

        const elementClone = element.cloneNode(true);
        workspaceElement.appendChild(elementClone);

        elementClone.style.position = 'absolute';
        elementClone.style.zIndex = 1000;
        elementClone.style.display = 'none';
        elementClone.classList.remove('item');

        const spaceX = e.clientX - element.getBoundingClientRect().left;
        const spaceY = e.clientY - element.getBoundingClientRect().top;

        const setItemCoordinates = (pageX, pageY) => {
            elementClone.style.left = pageX - spaceX + 'px';
            elementClone.style.top = pageY - spaceY + 'px';
        }

        let currentDroppable = null;

        const handleMousemove = (event) => {
            setItemCoordinates(event.pageX, event.pageY);
            elementClone.style.display = 'flex';
            elementClone.classList.add('Item_workspace__04Dmh');
            elementClone.style.zIndex = 999;

            // handle when item match
            event.target.hidden = true;
            let elemBelow = document.elementFromPoint(
                event.clientX,
                event.clientY
            );
            event.target.hidden = false;
            let droppableBelow = elemBelow.closest(".item");
            if (currentDroppable !== droppableBelow) {
                if (currentDroppable) {
                    currentDroppable.style.opacity = '1';
                    currentDroppable = null;
                    isWorkSpaceRef.current = false;
                    isCombineRef.current = {
                        combine: false,
                        firstItem: null,
                        secondItem: null,
                    };
                }
                currentDroppable = droppableBelow;
                if (currentDroppable) {
                    isWorkSpaceRef.current = true;
                    elementRef.current = currentDroppable
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

        elementClone.onmouseup = () => {
            document.removeEventListener('mousemove', handleMousemove);
            elementClone.classList.add('item');
            elementClone.style.zIndex = 1000;

            const elementCloneSpaceLeft =
                elementClone.getBoundingClientRect().left +
                elementClone.getBoundingClientRect().width;
            const workspaceWidth = workspaceElement.clientWidth;

            if (elementCloneSpaceLeft > workspaceWidth) {
                return workspaceElement.removeChild(elementClone);
            }

            if (!isWorkSpaceRef.current) {
                setItem();
            }

            elementClone.onmouseup = null;
        }

        document.onmouseup = () => {
            elementClone.classList.add('item');
            elementClone.style.zIndex = 1000;
            const inViewWorkSpace = elementClone.closest('.container_workspace');
            inViewWorkSpace && workspaceElement.removeChild(elementClone);
            inViewWorkSpace && document.removeEventListener('mousemove', handleMousemove);
            if (isWorkSpaceRef.current && !isCombineRef.current.combine) {
                setItem()
                elementRef.current.style.opacity = '1'
            }

            if (isCombineRef.current.combine) {
                handleCombine()
                elementRef.current.style.opacity = '1'
            }

            document.onmouseup = null;
        }

        function setItem() {
            setItemWorkSpace((prev) => {
                let indexItem = 0;
                const lastElement = prev[prev.length - 1];
                if (lastElement) {
                    indexItem = Number(lastElement.index) + 1
                }
                return [...prev,
                {
                    ...itemSideBar[index],
                    index: indexItem,
                    style: elementClone.attributes.style.textContent,
                }
                ]
            })
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
                    setItem()
                    isWorkSpaceRef.current = false;
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
                isWorkSpaceRef.current = false;
            }
        }
    }

    useEffect(() => {
        itemRef.current = itemRef.current.slice(0, itemRef.current.length);
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
                    itemSideBar.map((item, i) => {
                        return <Item
                            key={i}
                            {...item}
                            index={i}
                            ref={e => itemRef.current[i] = e}
                            onMouseDown={handleMouseDownSidebar}
                        />
                    })
                }
            </div>
        </div>
    );
}

export default SideBar;

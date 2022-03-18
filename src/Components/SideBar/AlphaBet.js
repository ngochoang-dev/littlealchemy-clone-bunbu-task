import React from 'react';
import clsx from 'clsx';
import styles from './SideBar.module.css';

function AlphaBet() {
    return (
        <div className={clsx(
            styles.wrapper_alphabet
        )}>
            <ul className={
                styles.list_alphabet
            }>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
                <li>F</li>
                <li>G</li>
                <li>H</li>
                <li>I</li>
                <li>J</li>
                <li>K</li>
                <li>L</li>
                <li>M</li>
                <li>N</li>
                <li>O</li>
                <li>P</li>
                <li>Q</li>
                <li>R</li>
                <li>S</li>
                <li>T</li>
                <li>U</li>
                <li>V</li>
                <li>W</li>
                <li>X</li>
                <li>Y</li>
                <li>Z</li>
            </ul>
        </div>
    )
}

export default AlphaBet;

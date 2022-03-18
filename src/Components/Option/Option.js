import { useState } from 'react';

function Option({ setItemWorkSpace }) {

    const [isFullScreen, setIsFullScreen] = useState(false);

    function openFullscreen() {
        setIsFullScreen(true);
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen();
        }
    }

    function closeFullscreen() {
        setIsFullScreen(false);
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen();
        }
    }


    return (
        <div className='wrapper_option'>
            {
                isFullScreen ? (
                    <div className='btn_change_screen'
                        style={{
                            backgroundImage: `url('./images/download 12.png')`
                        }}
                        onClick={closeFullscreen}
                    />
                ) : (
                    <div className='btn_change_screen'
                        style={{
                            backgroundImage: `url('./images/download 11.png')`
                        }}
                        onClick={openFullscreen}
                    />
                )
            }
            <ul className='list_option'>
                <li>
                    <a href='https://littlealchemy2.com/' target='_blank' rel='noopener noreferrer '>
                        <div style={{
                            backgroundImage: `url('./images/la2button.png')`
                        }} />
                    </a>
                </li>
                <li>
                    <div style={{
                        backgroundImage: `url('./images/clear.png')`
                    }}
                        onClick={() => setItemWorkSpace([])}
                    />
                </li>
                <li>
                    <div style={{
                        backgroundImage: `url('./images/download (10).png')`
                    }} />
                </li>
            </ul>
            <div className="login">sign in</div>
        </div>
    )
}

export default Option
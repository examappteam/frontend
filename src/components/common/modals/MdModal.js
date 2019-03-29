import React from 'react';

import './styles/MdModal.css'
import './styles/GeneralModalStyle.css'

const MdModal = (props) => {

    return (
        <div className="back-drop"
            style={{
                transform: props.show ? 'translateZ(0vh)' : 'translateZ(-100vh)',
                    opacity: props.show ? '1' : '0',
                    visibility: props.show ? 'visible' : 'hidden'
            }}>
            <div className="modal-wrapper-md"
            
                style={{
                    transform: props.show ? 'translateZ(0vh)' : 'translateZ(-100vh)',
                    opacity: props.show ? '1' : '0',
                    visibility: props.show ? 'visible' : 'hidden',
                    }}>
                <div className="modal-header-md">
                    
                    <p className="close-container" onClick={props.close}><i class="close-modal-btn fas fa-times"></i></p>
                </div>
                <div className="modal-body-md">
                    <p>
                        {props.children}
                    </p>
                </div>
                        <button className="pure-button btn-cancel" onClick={props.close}>Cancel</button>         
                    
            </div>
        </div>
    )
}

export default MdModal;
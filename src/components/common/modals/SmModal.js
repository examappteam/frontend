import React from 'react';

import './styles/SmModal.css'
import './styles/GeneralModalStyle.css'

const SmModal = (props) => {

    return (
        <div className="back-drop"
            style={{
                transform: props.show ? 'translateZ(0vh)' : 'translateZ(-100vh)',
                    opacity: props.show ? '1' : '0',
                    visibility: props.show ? 'visible' : 'hidden'
            }}>
            <div className="modal-wrapper-sm"
            
                style={{
                    transform: props.show ? 'translateZ(0vh)' : 'translateZ(-100vh)',
                    opacity: props.show ? '1' : '0',
                    visibility: props.show ? 'visible' : 'hidden',
                    }}>
                <div className="modal-header-sm">
                    
                    <p className="close-container" onClick={props.close}><i className="close-modal-btn fas fa-times"></i></p>
                </div>
                <div className="modal-body-sm">
                    <p>
                        {props.children}
                    </p>
                </div>
                        <button className="pure-button btn-cancel" onClick={props.close}>Cancel</button>         
                    
            </div>
        </div>
    )
}

export default SmModal;
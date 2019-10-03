import React from 'react';

function ModalTemplate(props) {

    return(
        <div id="modal" onClick={props.deleteModal} style={{position:"fixed", width:"100%",height:"100%", top:"0", left:"0", backgroundColor:"rgba(0,0,0,.7", zIndex:"9001", display:"grid"}}>
            <div style={{"placeSelf":"center",margin:"auto",width:"500px",height:"700px",backgroundColor:"white","borderRadius":"20px"}}>
                {props.content}
            </div>
        </div>
    )
}

export default ModalTemplate;
import React from 'react';

function ModalTemplate(props) {

    // Closes when clicked outside of modal
    function clickHandler(e){
        if(!inModal(e.target))
            props.deleteModal()
    }

    function inModal(target){
        if(target === null || target === undefined)
            return false
        if(target.id === "modal")
            return true
        else
            return inModal(target.parentNode)
    }

    return(
        <div onClick={clickHandler} style={{position:"fixed", width:"100%",height:"100%", top:"0", left:"0", backgroundColor:"rgba(0,0,0,.7", zIndex:"9001", display:"grid"}}>
            <div id="modal" style={{"placeSelf":"center",margin:"auto",width:"500px",height:"700px",backgroundColor:"white","borderRadius":"20px",display:"grid"}}>
                {props.content}
            </div>
        </div>
    )
}

export default ModalTemplate;
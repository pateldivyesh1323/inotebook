import React from 'react'

export default function Alert(props) {

    const capitalize=(word)=>{
        if(word === "danger")
        {
            word = "error"
        }
        let upper = word.charAt(0).toUpperCase();
        return upper + word.slice(1) + " : ";
    }

    return (
        props.alert && <div id="cont" className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert" style={{position:"absolute" , zIndex:"10"}}>
            <strong>{capitalize(props.alert.type)}</strong> {props.alert.msg}
        </div>
    )
}
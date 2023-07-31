// Modal.js
import React,{useRef,useState} from 'react';
import Modal from 'react-modal';
import { json } from 'react-router-dom';
import Updatecomment from './Updatecomment';

export default function CustomModal(props){
   const com=useRef()
   const [comid,setcomid]=useState('')
   const [isModalOpenedit, setIsModalOpenedit] = useState(false);
    const [commentid,setcommentid]=useState('')
    let commentobj=
    {

    }
    const temobj=JSON.parse(localStorage.getItem("@comment"))
    for(let a in temobj)
    {
        commentobj[a]={}
        commentobj[a]=temobj[a]
    }
    let filtercom=[]
    for(let a in commentobj)
    {
        if(commentobj[a]["postid"]==props.thispostid)
        {
            filtercom.push(commentobj[a])
        }
    }
    const openModaledit = (e) => {
        setIsModalOpenedit(true);
        setcomid(e.target.id)
      };
    
      const closeModaledit = () => {
        setIsModalOpenedit(false);
      };
    function generateUniqueId() {
        const newUniqueId = Date.now().toString(36) + Math.random().toString(36);
        return newUniqueId;
      }
    function comment()
    {
        let uid=generateUniqueId()
        commentobj[uid]={}
        commentobj[uid]["commentid"]=uid
      commentobj[uid]["postid"]=props.thispostid
      commentobj[uid]["userid"]=props.userid
      commentobj[uid]["body"]=com.current.value;
    (localStorage.setItem("@comment",JSON.stringify(commentobj)))
    window.location.reload()
    }
    const senddes=(id)=>
    {
     if (commentobj && commentobj[id] && commentobj[id]["body"]){
       return commentobj[id]["body"];
     } else {
       return " ";
     }
    }
    function deletecomment(e)
    {   
    
      let temp=JSON.parse(localStorage.getItem("@comment"))
      delete temp[e.target.id]

      localStorage.setItem("@comment",JSON.stringify(temp))
      alert("comment deleted successfully")
      //window.location.reload()
    }

  return (
    <>
    <Modal isOpen={props.isOpen} onRequestClose={props.onClose} style={modalStyles}>
      <h2>Popup Content</h2>
      <input ref={com} type="text" placeholder="Enter comment" />
      <div className='mt-5'>
      <button onClick={comment}>comment</button>
      <button onClick={props.onClose}>Close</button>
        {
            
        filtercom.map((post) => (
            <div className="container bg-light mt-5 pb-3">
            <h4>
            {post["userid"]}
            </h4>
            <h2>{post["body"]}</h2>
            {
                post["userid"]==props.userid?
                (
                    <div>
                    <i id ={post["commentid"]} onClick={openModaledit} class="bi-pencil-square icons ms-5" ></i>
                  <i  id={post["commentid"]} onClick={deletecomment} className="bi-trash icons ms-5" ></i>

                  </div>
                  
                ):( <></>)
              }
            
          </div>
          ))
          
      } 
      </div>
    </Modal>
    <Updatecomment isOpen={isModalOpenedit} onClose={closeModaledit} thiscomid={comid} combody={senddes(comid)}/> 
    </>
  );
};
const modalStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
        borderRadius: "8px",
    },
}

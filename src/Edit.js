// Modal.js
import React,{useRef,useState ,useEffect} from 'react';
import Modal from 'react-modal';

export default function Edit(props){
    const [form,setform]=useState(props.posttitle)
    const [form2,setform2]=useState(props.postdes)
    useEffect(() => {
        // Update the form state whenever props.postid changes
        setform(props.posttitle);
        setform2(props.postdes);
      }, [props.postid, props.posttitle, props.postdes]);
    const handlechange=(e)=>
    {
        setform(e.target.value)
    }
    const handlechange2=(e)=>
    {
        setform2(e.target.value)
    }
    const update=()=>
    {  
        let temp=JSON.parse(localStorage.getItem(props.thispostid))
        console.log("temp")
        temp["title"]=form
        temp["Des"]=form2
        localStorage.setItem(props.thispostid,JSON.stringify(temp))
    }

  return (

    <Modal isOpen={props.isOpen} onRequestClose={props.onClose} style={modalStyles}>
      <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="input1">Title</label>
            <input
              type="text"
              className="form-control"
              id="input1"
              value={form}
              onChange={handlechange}
              placeholder="Enter value for Input 1"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="input2">Description</label>
            <input
              type="text"
              className="form-control"
              id="input2"
              value={form2}
              onChange={handlechange2}
              placeholder="Enter value for Input 2"
            />
          </div>
        </div>
      </div>
    </div>
      <div className='mt-5'>
      </div>
      <div className="d-flex justify-content-center">
  <button className='btn btn-primary' onClick={update}>Update</button>
</div>
<div className="d-flex justify-content-center">
      <button className='btn btn-primary' onClick={props.onClose}>Close</button>
      </div>
    </Modal>
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
  };


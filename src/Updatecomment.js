import React,{useRef,useState ,useEffect} from 'react';
import Modal from 'react-modal';

export default function Updatecomment(props) {
    const [form,setform]=useState(props.thiscombody)
    useEffect(() => {
        // Update the form state whenever props.postid changes
        setform(props.combody);
      }, [props.thiscomid]);
    const handlechange=(e)=>
    {
        setform(e.target.value)
    }
    const update=()=>
    {  
        let temp=JSON.parse(localStorage.getItem("@comment"))
        console.log(temp[props.thiscomid]["body"])
        console.log(form)
        temp[props.thiscomid]["body"]=form
        console.log("new",temp[props.thiscomid]["body"])
        localStorage.setItem("@comment",JSON.stringify(temp))
    }

  return (
    
    <Modal isOpen={props.isOpen} onRequestClose={props.onClose} style={modalStyles}>
      <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="input2">Description</label>
            <input
              type="text"
              className="form-control"
              id="input2"
              value={form}
              onChange={handlechange}
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


import React,{useEffect ,useState, useRef} from 'react'
import { useNavigate ,useLocation,useSearchParams } from 'react-router-dom';
import CustomModal from './Modal';
import Edit from './Edit';
export default function Posts(props)
 {
  const [posts,setPosts]=useState([])
  const [postid,setpostid]=useState(0)
  const title=useRef()
  const des=useRef()
  const postarr=[]
  const [currentPage, setCurrentPage] = useState(1);
  let path=useNavigate()
  const [searchparams]=useSearchParams()
  useEffect(() => {
    fetchPosts();
  }, [currentPage]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenedit, setIsModalOpenedit] = useState(false);

  let objposts=
  {
       
  }

  let localkeys=Object.keys(localStorage)
    let convertedkeys=[]
    for(let a =0;a<localkeys.length;a++)
    {
      if(localkeys[a].includes('@'))
      {

      }
      else{
        convertedkeys.push(parseInt(localkeys[a]))
      }
    }
    let sortedarray=convertedkeys.sort((a, b) => b - a);
    for(let a of sortedarray)
    {
      objposts[a]={}
      
      objposts[a]=JSON.parse(localStorage.getItem(a))
    }
    console.log("meri posts",objposts)
  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=7`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const jsonData = await response.json();
      setPosts(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const openModal = (e) => {
    setIsModalOpen(true);
    setpostid(e.target.id)
    console.log("postid",postid)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModaledit = (e) => {
    setIsModalOpenedit(true);
    setpostid(e.target.id)
    console.log("postid",postid)
  };

  const closeModaledit = () => {
    setIsModalOpenedit(false);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
   const create=(e)=>
   {
    if(searchparams.get("userid")==""||searchparams.get("userid")==null)
    {
      alert("sorry you cannot post login in first")
      des.current.value=""
      title.current.value=""
      path('/signin')
    }
    else{

      let maxid=getmaxid()
      maxid++;
      let currpost=des.current.value
      let currtitle=title.current.value
      objposts[maxid]={}
      objposts[maxid]["postid"]=maxid
      objposts[maxid]["userid"]=searchparams.get("userid")
      objposts[maxid]["title"]=title.current.value;
      objposts[maxid]["Des"]=des.current.value;
      localStorage.setItem(maxid,JSON.stringify(objposts[maxid]))
      alert("Congratulations You have successfully posted")
      des.current.value=""
      title.current.value=""
      //postarr.unshift(objposts[maxid])
      window.location.reload()
      }
      
    }
    function getmaxid()
    {
      let keys=Object.keys(localStorage)
    let postkeys=[]
    for(let a =0;a<keys.length;a++)
    {
      if(keys[a].includes('@'))
      {

      }
      else{
        postkeys.push(parseInt(keys[a]))
      }
    }
    if(postkeys.length===0)
    {
      postkeys.push(100)
    }
    return Math.max(...postkeys)
   }
   function deletepost(e)
   {
      localStorage.removeItem(e.target.id)
      window.location.reload()
   }
   
   const sendtitle=(id)=>
   {
    if (objposts && objposts[id] && objposts[id]["title"]){
      return objposts[id]["title"];
    } else {
      return " ";
    }
   }
   const senddes=(id)=>
   {
    if (objposts && objposts[id] && objposts[id]["Des"]){
      return objposts[id]["Des"];
    } else {
      return " ";
    }
   }
  return (
    <div>
      <CustomModal isOpen={isModalOpen} userid={searchparams.get("userid")} onClose={closeModal} thispostid={postid} />     
      <Edit isOpen={isModalOpenedit} userid={searchparams.get("userid")} onClose={closeModaledit} thispostid={postid}  posttitle={sendtitle(postid)} postdes={senddes(postid)}/> 

        <div className="container">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <h>
            WELCOME   {searchparams.get("userid")}
          </h>
         
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
                <div className="collapse navbar-collapse justify-content-end" id="mynavbar" >
                    <ul className="navbar-nav mr-auto justify-content-end ">
                        <li className="nav-item">
                            <button className="nav-link" onClick={()=>path('/signin')}>SignOut </button>
                        </li>
                       
                    </ul>
                </div>
            </nav>
        </div>
        <div className="container bg-dark mb-5 mt-5 pb-5">
          <form className='form-group'>
          <input type="text" className=' form-control field' placeholder='Title' ref={title} />
          <input type="text" className=' form-control mt-5 field' placeholder='Description' ref={des}/>
          </form>
          <div>
          <button className='btn btn-primary mt-5 postbtn d-flex align-items-center' onClick={create}> Create Post</button>
          </div>
          
        </div>
        <div className='container bg-ligt mb-5'>
      <h1>Posts</h1>
      {
        convertedkeys.map((post) => (
          <div className="container bg-light mt-5 pb-3">
            <h3 className='text-primary'>
              {objposts[post]["userid"]}</h3>
            <h2 className='text-success'>{objposts[post]["title"]}</h2>
            <p>{objposts[post]["Des"]}</p>
            {
                objposts[post]["userid"]==searchparams.get("userid")?
                (
                  <div>
                    <i onClick={openModaledit} id={objposts[post]["postid"]} class="bi-pencil-square icons ms-5" ></i>
                  <i id={objposts[post]["postid"]} onClick={deletepost} class="bi-trash icons ms-5" ></i>
                  <i id={objposts[post]["postid"]}class="bi-card-text icons ms-5" onClick={openModal} ></i>
                  </div>
                  
                ):( <i id={objposts[post]["postid"]}class="bi-card-text icons ms-5" onClick={openModal} ></i>)
              }
             
          </div>
          ))
      }

      {
        posts.map((post) => (
          <div className="container bg-light mt-5 pb-3">
            <h4>
            {post.id}
            </h4>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <i id={post.id}class="bi-card-text icons ms-5" onClick={openModal} ></i>
          </div>
          ))
      }
      <button className='btn btn-primary ms-5'onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
      <button className='btn btn-primary ms-5' onClick={handleNextPage}>Next</button>
      
    </div>
    </div>
  );
}


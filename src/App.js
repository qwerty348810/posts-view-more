import React, { useState, useEffect } from 'react';
import TelegramEmbed from 'react-telegram-embed';

function App() {
  let nameChannel = "nameChannel";
  let imgUrl = "imgUrl";
  let media = "media";

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [getPostID, setPostID] = React.useState('');
  const [posts, setPosts] = useState([]);
  const [step, setStep] = useState(10);
  const rowcount = 10;
  const [offset, setOffset] = useState(10);
  const [showButton, setShowButton] = useState(true);

useEffect(() => {
  // console.log("offset:"+offset);
  // console.log("rowcount:"+rowcount);
  // console.log("step:"+step);
    var data = new FormData(); 
    data.append("token", "token");
    data.append("offset", rowcount);
    data.append("rowcount",  offset);
    data.append("entity_id", "entity_id");
    fetch("getPostUrl", {
      //fetch("http://test1.ua", {
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(response => {
         if(response.has_more_rows === 'yes'){
          setShowButton(true);           
         } else {
           setShowButton(false);
         }
      })

},[]);

  const fetchPosts = () => {
    var data = new FormData(); 
    data.append("token", "token");
    data.append("offset", rowcount);
    data.append("rowcount", offset);
    data.append("entity_id", "entity_id");
    fetch("getPostUrl", {
      //fetch("http://test1.ua", {
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(response => {
        setPosts(response.messages);
         if(response.has_more_rows === 'yes'){
             setShowButton(true);
         } else {
           setShowButton(false);
         }
      })
  };

  const handleShowMore = () => { 
    setStep(step + 10);
    setOffset(step + 10); 
  };

      return (
        <>
          {posts.map((post, index) => (    
            <article key={index} className="blog-post">
              <section className="header-post">
                <a href="#" className="d-flex py-2">
                  <img className="logo-channel__small" src={media+nameChannel+"/logoImageChannel"} alt={nameChannel+" logo"}/>
                  <div className="blog-post__title">
                    <p className="fw-bold">{nameChannel}</p>
                    <p className="fw-light">{post.message_date_formatted}</p>
                  </div>
                </a>
                {/* <div className="py-2">
                  <button type="button" className="btn btn-light"><img src={"imgUrl+point_002.png"} alt="point-icon"/></button>
                </div>          */}
              </section>
              <a href="#" className="text-center py-2 blog-post__img link-to-tele" data-post-id={post.id}>  
              {post.photo === "deleted" ? (
                <> 
                  <div className="post-img__back" style={{ 
                    //backgroundImage: `{url("'"${"imgUrl"}"+off-img.png"+"'")} `
                    }} ></div>
                  <img className="post-img" src={imgUrl+"off-img.png"} alt="off img"/>
                </>
              ) : ( 
                <> 
                  <div className="post-img__back" style={{ 
                    backgroundImage: "url("+"'"+media+nameChannel+"/"+post.photo+"'"+")"
                    }} ></div>
                  <img className="post-img" src={media+nameChannel+"/"+post.photo} alt={post.message_id}/>
                </>
              )}                                   
              </a> 
              <p className="p-2 border-bottom blog-post__text"><div dangerouslySetInnerHTML={{__html:post.message_formatted }} /></p>
              <section className="footer-post">
                <div className="d-flex">
                  <button type="button" className="btn btn-light d-flex me-2"><img src={imgUrl+"eye.png"} alt="eye-icon"/><p>{post.views}</p></button>
                  <button type="button" className="btn btn-light d-flex"><img src={imgUrl+"arrow.png"} alt="arrow-icon"/><p>{post.forwards}</p></button>                
                </div>
                <div>
                  <button type="button" className="btn btn-light post-link link-to-tele" value={post.id} onClick={() => {handleOpen();setPostID(post.id)}}><img src={imgUrl+"link.png"} alt="link"/></button>
                </div>                
              </section>

                          <div className={`presentation-back ${(open && getPostID === post.id) ? 'show' : 'hidden'}`}></div>
                          <div className={`modal fade ${(open && getPostID === post.id) ? 'show' : 'hidden'}`} id={post.id} onClick={() => {handleClose();setPostID('0')}}> 
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <article className="blog-post blog-post__modal">   
                                  <TelegramEmbed src={`https://t.me/${nameChannel}/${post.id}?embed=1`} />                   
                                  {/* <script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-post={"nameChannel+/"+post.id} data-width="100%"></script>  */}
                                  <button type="button" className="btn btn-light link-to-tele" onClick={() => {handleClose();setPostID('0')}}>Close</button>
                                </article> 
                              </div>
                            </div>
                          </div>                         


            </article>

          ))}

          {showButton && 
          <div className="text-center my-5">
            <button className="btn btn-light py-2 button-more" onClick={()=>{fetchPosts(); handleShowMore(); }}>View More</button>
          </div>
          }
        </>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet';

// function App() {

//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [getPostID, setPostID] = React.useState('');
//   const [posts, setPosts] = useState([]);
//   const [step, setStep] = useState(10);
//   const rowcount = 10;
//   const [offset, setOffset] = useState(10);
//   const [showButton, setShowButton] = useState(true);

//   const handleShowMore = () => { 
//     setStep(step + 10);
//     setOffset(step + 10); 
//   };

//   const TelegramWidget = () => {
//     useEffect(() => {
//       const script = document.createElement('script');
//       script.src = 'https://telegram.org/js/telegram-widget.js?22';
//       script.async = true;
//       document.body.appendChild(script);
  
//       return () => {
//         document.body.removeChild(script);
//       };
//     }, []);
//   }

// useEffect(() => {
//   console.log("offset:"+offset);
//   console.log("rowcount:"+rowcount);
//   console.log("step:"+step);
//     var data = new FormData(); 
//     data.append("token", "token");
//     data.append("offset", rowcount);
//     data.append("rowcount",  offset);
//     data.append("entity_id", "entity_id");
//     fetch("getPostUrl", {
//       //fetch("http://test1.ua", {
//       method: "POST",
//       body: data
//     })
//       .then(response => response.json())
//       .then(response => {
//          if(response.has_more_rows === 'yes'){
//           setShowButton(true);           
//          } else {
//            setShowButton(false);
//          }
//       })

// },[]);

// async function fetchPostsAsync() {
//     console.log("offset:"+offset);
//     console.log("rowcount:"+rowcount);
//     console.log("step:"+step);
//     var data = new FormData(); 
//     data.append("token", "token");
//     data.append("offset", rowcount);
//     data.append("rowcount", offset);
//     data.append("entity_id", "entity_id");
//     await fetch("getPostUrl", {
//       //fetch("http://test1.ua", {
//       method: "POST",
//       body: data
//     })
//       .then(response => response.json())
//       .then(response => {
//         setPosts(response.messages);
//          if(response.has_more_rows === 'yes'){
//             setShowButton(true);
//             setPosts(response.messages);
//             console.log(response.messages);  
//          } else {
//            setShowButton(false);
//          }
//       })
//   };
//   console.log("offset:"+offset);
//   console.log("rowcount:"+rowcount);
//   console.log("step:"+step);



//       return (
//         <>
//           {posts.map((post, index) => (    
//             <article key={index} className="blog-post" onClick={() => {handleClose();setPostID('0')}}>
//               <section className="header-post">
//                 <a href="#" className="d-flex py-2">
//                   <img className="logo-channel__small" src={"media"+"nameChannel"+"/"+"logoImageChannel"} alt={"nameChannel"+" logo"}/>
//                   <div className="blog-post__title">
//                     <p className="fw-bold">{"nameChannel"}</p>
//                     <p className="fw-light">{post.message_date_formatted}</p>
//                   </div>
//                 </a>
//                 {/* <div className="py-2">
//                   <button type="button" className="btn btn-light"><img src={"imgUrl+point_002.png"} alt="point-icon"/></button>
//                 </div>          */}
//               </section>
//               <a href="#" className="text-center py-2 blog-post__img link-to-tele" data-post-id={post.id}>  
//               {post.photo === "deleted" ? (
//                 <> 
//                   <div className="post-img__back" style={{ 
//                     //backgroundImage: `{url("'"${"imgUrl"}"+off-img.png"+"'")} `
//                     }} ></div>
//                   <img className="post-img" src={"imgUrl+off-img.png"} alt="off img"/>
//                 </>
//               ) : ( 
//                 <> 
//                   <div className="post-img__back" style={{ 
//                     backgroundImage: `url("'"${"media"}${"nameChannel"}"/"${post.photo}"'")`
//                     }} ></div>
//                   <img className="post-img" src={"media"+"nameChannel"+"/"+post.photo} alt={post.message_id}/>
//                 </>
//               )}                                   
//               </a> 
//               <p className="p-2 border-bottom blog-post__text"><div dangerouslySetInnerHTML={{__html:post.message_formatted }} /></p>
//               <section className="footer-post">
//                 <div className="d-flex">
//                   <button type="button" className="btn btn-light d-flex me-2"><img src={"imgUrl+eye.png"} alt="eye-icon"/><p>{post.views}</p></button>
//                   <button type="button" className="btn btn-light d-flex"><img src={"imgUrl+arrow.png"} alt="arrow-icon"/><p>{post.forwards}</p></button>                
//                 </div>
//                 <div>
//                   <button type="button" className="btn btn-light post-link link-to-tele" value={post.id} onClick={() => {handleOpen();setPostID(post.id)}}><img src={"imgUrl+link.png"} alt="link"/></button>
//                 </div>                
//               </section>

//                           <div className={`presentation-back ${(open && getPostID === post.id) ? 'show' : 'hidden'}`} onClick={() => {handleClose();setPostID('0')}}></div>
//                           <div className={`modal fade ${(open && getPostID === post.id) ? 'show' : 'hidden'}`} id={post.id}>
//                             <div className="modal-dialog" role="document">
//                               <div className="modal-content">
//                                 <article className="blog-post blog-post__modal">   
//                                   <Helmet>
//                                     <script src="https://telegram.org/js/telegram-widget.js?22" data-telegram-post={"nameChannel+/"+post.id} async></script>
//                                   </Helmet>                  
//                                   {/* <script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-post={"nameChannel+/"+post.id} data-width="100%"></script>  */}
//                                   <button type="button" className="btn btn-light link-to-tele" onClick={() => {handleClose();setPostID('0')}}>Close</button>
//                                 </article> 
//                               </div>
//                             </div>
//                           </div>                         



//             </article>

//           ))}

//           {showButton && 
//           <div className="text-center my-5">
//             <button className="btn btn-light py-2 button-more" onClick={()=>{fetchPostsAsync();handleShowMore();}}>View More</button>
//           </div>
//           }
//         </>
//   );
// }

// export default App;
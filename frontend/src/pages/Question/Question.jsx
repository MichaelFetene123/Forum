import React,{useState} from 'react'


const onSubmitHndler = () =>{
    
}
const Question = () => {
  return (
    <div className="container">
      <div className="">
        <h2>Steps to write a good question</h2>
        <ul>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>

      <div className=''>
        <h2>Ask Public Question</h2>
        <form onSubmit={onSubmitHndler}>
            <input type="text" />
            <textarea name="" id=""></textarea>
            <input type="text" />
            <button></button>
        </form>
      </div>
    </div>
  );
}

export default Question
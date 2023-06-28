import { useState } from 'react';
import './App.css';

function App() {

  let [title, setTitle] = useState([]);
  let [date, setDate] = useState([]);
  let [detail, setDetail] = useState([]);
  let [like, setLike] = useState([]);
  let [modal, setModal] = useState(false);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [boardTitle, setBoardTitle] = useState('');
  let [boardContent, setBoardContent] = useState('');

  function upLike(index) {
    let copy = [...like];
    copy[index]++;
    setLike(copy);
  }

  function removeBoard(index) {
    if (currentIndex == index) setModal(false);
    let copyTitle = [...title];
    let copyDate = [...date];
    let copyLike = [...like];
    let copyDetail = [...detail];
    copyTitle.splice(index, 1);
    copyDate.splice(index, 1);
    copyLike.splice(index, 1);
    copyDetail.splice(index, 1);
    setTitle(copyTitle);
    setDate(copyDate);
    setLike(copyLike);
    setDetail(copyDetail);
  }

  function modalView(index) {
    if (modal) {
      index == currentIndex ? setModal(false) : setCurrentIndex(index)
    } else {
      setCurrentIndex(index);
      setModal(true);
    }
  }

  function setWriteTitle(e) {
    setBoardTitle(e);
  }

  function setWriteContent(e) {
    setBoardContent(e);
  }

  function WriteBoard() {
    if (boardTitle == '' || boardContent == '') {
      alert('입력하세요!');
    } else {
      let today = new Date();
      let year = today.getFullYear(); // 년도
      let month = today.getMonth() + 1;  // 월
      let day = today.getDate();  // 날짜
      let dateString = year + "-" + month + "-" + day;
      let copyTitle = [...title];
      let copyDate = [...date];
      let copyLike = [...like];
      let copyDetail = [...detail];
      copyTitle.push(boardTitle);
      copyDetail.push(boardContent);
      copyLike.push(0);
      copyDate.push(dateString);
      setTitle(copyTitle);
      setDate(copyDate);
      setLike(copyLike);
      setDetail(copyDetail);
      setBoardTitle('');
      setBoardContent('');
    }
  }

  return (
    <div className="App">
      <div className='black-nav'>
        <h4>ReactBlog</h4>
      </div>
      {
        title.map((e, index) => {
          return (<div className='list' key={index}>
            <h4 onClick={() => { modalView(index) }}>{e}</h4>
            <span onClick={() => { upLike(index) }}>👍 {like[index]}</span>
            <h4>{date[index]}</h4>
            <button onClick={() => { removeBoard(index) }}>삭제</button>
          </div>)
        })
      }
      {
        modal ? <Modal title={title} date={date} like={like} detail={detail} currentIndex={currentIndex} /> : null
      }
      <div className='newBoard'>
        <input onChange={(e) => { setWriteTitle(e.target.value) }} value={boardTitle} />
        <textarea onChange={(e) => { setWriteContent(e.target.value) }} value={boardContent} />
        <button onClick={() => { WriteBoard() }}>작성완료</button>
      </div>
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.title[props.currentIndex]} <span>👍 {props.like[props.currentIndex]}</span></h4>
      <p>{props.date[props.currentIndex]}</p>
      <p>{props.detail[props.currentIndex]}</p>
    </div>
  )
}

export default App;
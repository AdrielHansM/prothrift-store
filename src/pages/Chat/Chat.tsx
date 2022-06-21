import Navigation from "../Components/Navigation"
import "../../assets/styles/Chat.css";
import { FormControl } from "react-bootstrap";

export default function chats() {

  return (
    <>
    <Navigation/>
    <body>
  <div className="container">
    <div className="row">

      <section className="discussions">
        <div className="discussion search">
          <div className="searchbar">
            <i className="fa fa-search" aria-hidden="true"></i>
            <input type="text" placeholder="Search..."></input>
          </div>
        </div>
        <div className="discussion message-active">
          <div className="photo">
            <div className="online"></div>
          </div>
          <div className="desc-contact">
            <p className="name">Megan Leib</p>
            <p className="message">9 pm at the bar if possible 😳</p>
          </div>
          <div className="timer">12 sec</div>
        </div>

        <div className="discussion">
          <div className="photo">
            <div className="online"></div>
          </div>
          <div className="desc-contact">
            <p className="name">Dave Corlew</p>
            <p className="message">Let's meet for a coffee or something today ?</p>
          </div>
          <div className="timer">3 min</div>
        </div>

        <div className="discussion">
          <div className="photo">
          </div>
          <div className="desc-contact">
            <p className="name">Jerome Seiber</p>
            <p className="message">I've sent you the annual report</p>
          </div>
          <div className="timer">42 min</div>
        </div>

        <div className="discussion">
          <div className="photo">
            <div className="online"></div>
          </div>
          <div className="desc-contact">
            <p className="name">Thomas Dbtn</p>
            <p className="message">See you tomorrow ! 🙂</p>
          </div>
          <div className="timer">2 hour</div>
        </div>

      </section>
      <section className="chat">
        <div className="header-chat">
          <i className="icon fa fa-user-o" aria-hidden="true"></i>
          <p className="name">Megan Leib</p>
          <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
        </div>
        <div className="messages-chat">
          <div className="message">
            <div className="photo">
              <div className="online"></div>
            </div>
            <p className="text"> Hi, how are you ? </p>
          </div>
          <div className="message text-only">
            <p className="text"> What are you doing tonight ? Want to go take a drink ?</p>
          </div>
          <p className="time"> 14h58</p>
          <div className="message text-only">
            <div className="response">
              <p className="text"> Hey Megan ! It's been a while 😃</p>
            </div>
          </div>
          <div className="message text-only">
            <div className="response">
              <p className="text"> When can we meet ?</p>
            </div>
          </div>
          <p className="response-time time"> 15h04</p>
          <div className="message">
            <div className="photo" >
              <div className="online"></div>
            </div>
            <p className="text"> 9 pm at the bar if possible 😳</p>
          </div>
          <p className="time"> 15h09</p>
        </div>
        <div className="fter-chat">
          <input type="text" className="write-message" placeholder="Type your message here"></input>
          <i className="fa-solid fa-image"></i>
        </div>
      </section>
    </div>
  </div>
</body>
    </>
  )
}
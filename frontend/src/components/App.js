import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/mestoAuth";
import InfoTooltip from "./InfoTooltip";
import errorImage from "../images/errorImage.svg";
import acceptImage from "../images/acceptImage.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [infoPic, setInfoPic] = useState("");
  const navigate = useNavigate();
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setDeletedCard(null);
    setSelectedCard(null);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    setDeletedCard(card);
  };

  function handleLogin(email) {
    setUserEmail(email);
    setLoggedIn(true);
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          handleLogin(res.email);
          navigate("/");
        })
        .catch(console.error);
    }
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setUserEmail("");
  }

  useEffect(() => {
    tokenCheck();
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, user]) => {
        setCards(cards.sort(function(a,b){
          return new Date(b.createdAt) - new Date(a.createdAt);
        }));
        setCurrentUser(user);
      })
      .catch(console.error);
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .editProfile({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddCard({ name, link }) {
    setIsLoading(true);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleDeleteSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deletedCard._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onHandleLogin(email, password) {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          const { token, ...rest } = data;
          setCurrentUser(rest);
          handleLogin(email);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setMessage(err);
        setInfoPic(errorImage);
      });
  }

  function onHandleRegister(email, password) {
    auth
      .register(password, email)
      .then(() => {
        setMessage("Вы успешно зарегистрировались!");
        setInfoPic(acceptImage);
      })
      .catch((err) => {
        setMessage(err);
        setInfoPic(errorImage);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  function closeInfoTools() {
    setIsInfoTooltipOpen(false);
    if (message === "Вы успешно зарегистрировались!") {
      navigate("/sign-in");
    }
  }

  return (
    <div className="page">
      <AppContext.Provider value={{ isLoading, closeAllPopups }}>
        <CurrentUserContext.Provider value={currentUser}>
          <Header userEmail={userEmail} onSignOut={onSignOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                  onEditProfile={() => setIsEditProfilePopupOpen(true)}
                  onAddPlace={() => setIsAddPlacePopupOpen(true)}
                  onCardClick={(card) => handleCardClick(card)}
                  onCardLike={(card) => handleCardLike(card)}
                  cards={cards}
                  onDeleteClick={(card) => handleDeleteClick(card)}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register onHandleRegister={onHandleRegister} />}
            />
            <Route
              path="/sign-in"
              element={<Login onHandleLogin={onHandleLogin} />}
            />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddCard}
          />
          <DeleteCardPopup
            isOpen={deletedCard !== null}
            onSubmit={handleDeleteSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup card={selectedCard} />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            isClose={closeInfoTools}
            message={message}
            infoPic={infoPic}
          />
        </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;

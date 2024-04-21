import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import styled from 'styled-components';
import api from '../../../../api';


// Styled components
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const UserField = styled.div`
  background: #f4f4f4;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Input = styled.input`
  margin-right: 10px;
  padding: 8px;
`;

// Modal.setAppElement('#root');

function ManagerStaff() {
  const [userData, setUserData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rating, setRating] = useState('');

  useEffect(() => {
    api.auth.getManagerStaff()
      .then(response => setUserData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const submitRating = () => {
    if (selectedUser && rating) {
      axios.post(`your-api-url/user/${selectedUser.id}/rate`, {
        newRating: rating,
        name: selectedUser.name
      })
        .then(() => {
          alert('Rating updated!');
          closeModal();
        })
        .catch(error => console.error('Error updating rating:', error));
    }
  };

  return (
    <Container>
      {userData.map(user => (
        <UserField key={user.id}>
          <span>{user.name}</span>
          <span>{user.surname}</span>
          {user.employeeAssessments ? (
                <div>
                  <span>Ваша оценка: {user.employeeAssessments.managerAssessment}</span>
                </div>
              ) : (
                <p>Нет активных дополнительных данных.</p>
              )}
          <Button onClick={() => openModal(user)}>Оценить</Button>
        </UserField>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="User Rating Modal"
        style={{
          content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)' }
        }}
      >
        <h2> {selectedUser?.name}</h2>
        <p>Введите новую оценку:</p>
        <Input type="number" value={rating} onChange={handleRatingChange} />
        <Button onClick={submitRating}>Отправить</Button>
        <Button onClick={closeModal}>Закрыть</Button>
      </Modal>
    </Container>
  );
}

export default ManagerStaff;

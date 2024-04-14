import React, { useState, useEffect } from 'react';
import axios from 'axios'; // импортируем axios
import api from '../../../../api';

const Profile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.auth.getProfile()
        setUser(response.data);
      } catch (error) {
        setError(error.message);
        console.error('There was an error!', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки профиля пользователя: {error}</p>;

  return (
    <div style={{textAlign: 'center', padding: '20px', border: '1px solid gray', borderRadius: '10px', margin: '20px'}}>
      {user ? (
        <>
          <h2>Профиль Пользователя</h2>
          <p><strong>Имя:</strong> {user.name}</p>
          <p><strong>Фамилия:</strong> {user.surname}</p>
          <p><strong>Логин:</strong> {user.login}</p>
          <p><strong>ID менеджера:</strong> {user.managerId}</p>
          <p><strong>ID эксперта:</strong> {user.expertId}</p>
          <p><strong>Дата следующей аттестации:</strong> {user.dateOfNextAssessment}не задана</p>
        </>
      ) : (
        <p>Данные пользователя не найдены.</p>
      )}
    </div>
  );
};

export default Profile;

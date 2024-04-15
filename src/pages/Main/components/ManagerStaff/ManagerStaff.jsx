import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../../../api';




const ManagerStaff = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Запрос данных пользователя по ID
        const response = await api.auth.getManagerStaff();
        // Обработать данные перед сохранением в состояние
        const data = response.data.map(item => {
          // Найти активный элемент в массиве item.subArray
          const activeSubItem = item.employeeAssessments.find(sub => sub.active === true);
          // Вернуть измененный объект, содержащий только активный подэлемент
          return {...item, employeeAssessments: activeSubItem || []};
        });
        setUserData(data);
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <div>Загрузка...</div>;

return (
    <div>
    {userData && userData.length > 0 ? (
    <div style={{ padding: '20px' }}>
      <h2>Список аттестаций</h2>
      {userData.map(user => (
        <div
          key={user.id}
          style={{
            border: `3px solid orange`,
            margin: '10px',
            padding: '10px',
            borderRadius: '5px'
          }}
        >
          <h3>{user.login}</h3>
          <p><strong>Имя: </strong> {user.name}</p>
          <p><strong>Фамилия</strong> {user.surname}</p>
          <p><strong>ID менеджера: </strong> {user.managerId}</p>
          {user.employeeAssessments ? (
                <div>
                  <h4>Дополнительная информация:</h4>
                  <p>Ваша оценка: {user.employeeAssessments.managerAssessment}</p>
                </div>
              ) : (
                <p>Нет активных дополнительных данных.</p>
              )}
        </div>
        
      ))}
    </div>
          ) : (
        <p>Аттестации не найдены.</p>
      )}
    </div>
  );
};

export default ManagerStaff;

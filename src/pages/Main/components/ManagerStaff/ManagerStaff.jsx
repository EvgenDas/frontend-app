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
        <ul>
          {userData.map((user, index) => (
            <li key={index}>
              <h3>{user.login}</h3>
              <p>Имя: {user.name}</p>
              <p>Фамилия: {user.surname}</p>
              <p>ID менеджера: {user.managerId}</p>
              {/* Проверка и вывод активного подэлемента */}
              {user.employeeAssessments ? (
                <div>
                  <h4>Дополнительная информация:</h4>
                  <p>Ваша оценка: {user.employeeAssessments.managerAssessment}</p>
                </div>
              ) : (
                <p>Нет активных дополнительных данных.</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Аттестации не найдены.</p>
      )}
    </div>
  );
};

export default ManagerStaff;

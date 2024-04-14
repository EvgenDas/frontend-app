// UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../../../../api';

const Assessments = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.auth.getAssessments()
        setUsers(response.data);
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
  if (error) return <p>Ошибка загрузки аттестаций пользователя: {error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Аттестации</h2>
      {users.map(user => (
        <div
          key={user.id}
          style={{
            border: `3px solid ${user.active ? 'green' : 'red'}`,
            margin: '10px',
            padding: '10px',
            borderRadius: '5px'
          }}
        >
          <p><strong>Собственная оценка:</strong> {user.ownAssessment}</p>
          <p><strong>Оценка руководителя:</strong> {user.managerAssessment}</p>
          <p><strong>Оценка эксперта:</strong> {user.expertAssessment}</p>
          <p><strong>Совокупная оценка:</strong> {user.finalAssessment}</p>
          <p><strong>Дата аттестации:</strong> {user.dateOfAssessment}</p>
        </div>
      ))}
    </div>
  );
};

export default Assessments;


{/* <th style={{ border: '1px solid black', padding: '8px' }}>Собственная оценка</th>
<th style={{ border: '1px solid black', padding: '8px' }}>Оценка руководителя</th>
<th style={{ border: '1px solid black', padding: '8px' }}>Оценка эксперта</th>
<th style={{ border: '1px solid black', padding: '8px' }}>Совокупная оценка</th>
<th style={{ border: '1px solid black', padding: '8px' }}>Дата аттестации</th>
<th style={{ border: '1px solid black', padding: '8px' }}>Дата аттестации</th> */}
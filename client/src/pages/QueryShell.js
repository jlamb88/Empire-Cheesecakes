import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { USER_ORDER } from '../utils/queries'
import { useAuth } from '../contexts/AuthContext'


// Execute the query
const QueryShell = () => {
  const { userInfo, setUserInfo } = useAuth()
  const { loading, error, data } = useQuery(USER_ORDER
    ,
    { variables: { userId: userInfo.userId } })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="about-p">
      {/* Render your data here */}
      <h2>
        {JSON.stringify(data.userOrders, null, 2)}
      </h2>
    </div>
  );
};

export default QueryShell;
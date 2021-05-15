import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';
const localStorage = require('localStorage');

const client = new ApolloClient({
  link: createUploadLink({
    useGETForQueries : true,
    uri:'http://localhost:5000/graphql',
    credentials : "include",
    headers : {
      authorization : `Bearer ${localStorage.getItem('access_token')}`
    }       
  }),
  cache : new InMemoryCache()
});


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

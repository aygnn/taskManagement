import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap stil dosyasını içe aktarıyoruz
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './Config/Store';
import MainPage from './Main Page/MainPage';
// import ClassNavbar from './MyClass/ClassNavbar/ClassNavbar';
import MyPage from './MyClass/MyPage';
import People from './MyClass/People/People'
// import Classwork from './MyClass/Classwork/MyClass'
import MyClass from './MyClass/Classwork/MyClass';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <MainPage/>,
      },
      {
        path: "mypage",
        element: <MyPage/>,
        children:[
          {
            path: "classwork",
            element: <MyClass/>,
          },
       
          {
            path: "people",
            element: <People/>,
          },
        ]
      },
     
 
   
    

    ]

  },
 
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />

  </Provider>
);



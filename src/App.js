import { useAppSelector } from "./app/hooks";
import { Navigate, Route, Routes } from "react-router-dom";
import './App.css';

const App = () => {
  const { user } = useAppSelector((state) => state.userState);
  
  const publicRoutes = (
    <>
    </>
  );
  
  const privateRoutes = (
    <>
      {/*<Route*/}
      {/*  path='my-applications'*/}
      {/*  element={<Suspense fallback={<></>}>*/}
      {/*    <MyApplications/>*/}
      {/*  </Suspense>}*/}
      {/*/>*/}
    </>
  );
  
  return (
    <div className='App'>
      <Routes>
        <Route
          path='*'
          element={<Navigate
            to='/'
            replace
          />}
        />
        {user ? privateRoutes : publicRoutes}
      </Routes>
    </div>
  );
}

export default App;

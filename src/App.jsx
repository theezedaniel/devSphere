import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/AppLayout"

import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PostPage from "./pages/PostPage";
import Posts from "./pages/Posts";
import Stories from "./pages/Stories";
import WritePost from "./pages/WritePost";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* <Route index element= {<Navigate replace to="/" />} /> */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/posts/:slug" element={<PostPage />} />
          <Route path="/stories/write" element={
            <ProtectedRoute>
              <WritePost />
            </ProtectedRoute >
          }/> 
          <Route path="/stories/write/:postId" element={
            <ProtectedRoute>
              <WritePost />
            </ProtectedRoute >
          }/> 
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute >
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute >
          } />

        </Route>
      </Routes>
    </BrowserRouter>
    <Toaster 
    position="top-center"
    gutter={12}
    containerStyle={{margin: "8px"}}
    toastOptions={{
      success: {
        duration: 3000,
      },
      error: {
        duration: 5000,
      },
      style: {
        fontSize: "16px",
        maxWidth: "500px",
        padding: "16px 20px",
        backgroundColor: "white",
        color: "black"
      }
    }}
    />
    </>
  )
}

export default App

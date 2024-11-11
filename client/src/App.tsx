import {Routes,Route,Navigate,Outlet,useLocation} from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Tasks } from './pages/Tasks'
import { Users } from './pages/Users'
import { Trash } from './pages/Trash'
import { TaskDetails } from './pages/TaskDetails'
import { Login } from './pages/Login'
import { Toaster } from 'sonner'
import { useSelector } from 'react-redux'
import { Sidebar } from './components/Sidebar'
import { Navbar } from './components/Navbar'
import { MobileSidebar } from './components/MobileSidebar'


function Layout() {
  const {user,isSidebarOpen} = useSelector((state:any) => state.auth);
  const location = useLocation();

  return user ? (
    <div className="flex h-screen flex-col md:flex-row w-full">
      <Sidebar />

      {/* Mobile Sidebar */}
      {isSidebarOpen && <MobileSidebar />}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </div>
      </div>

    </div>
  ): (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

function App() {
  return (
    <main className='w-full min-h-screen bg-[#f3f4f6]'>
      <Routes>
        <Route element = {<Layout />}> {/* protected routes */}
          <Route path="/" element={<Navigate to='/dashboard' />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/completed/:status' element={<Tasks />} />
          <Route path='/in-progress/:status' element={<Tasks />} />
          <Route path='/todo/:status' element={<Tasks />} />
          <Route path='/team' element={<Users />} />
          <Route path='/trashed' element={<Trash />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Route>

        <Route path='/login' element={<Login />} />

      </Routes>

      <Toaster richColors />
    </main>
  )
}

export default App

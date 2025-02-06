import AllRoutes from "./routes/AllRoutes"
import "bootstrap/dist/js/bootstrap.bundle"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import '../index.css'
import { CmsNav } from "./components"

function App() {
  return <AllRoutes />
  // return <div className="text-3xl font-bold underline">hello</div>
  // return (
  //   <>
  //     <div className='text-3xl font-bold underline'>
  //       hello
  //     </div>
  //   </>
  // )
}

export default App

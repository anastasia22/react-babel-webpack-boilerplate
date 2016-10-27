import App from './app/components/App'
import Login from './app/components/Login'
import Register from './app/components/Register'
import Cabinet from './app/components/Cabinet'
import SideMenu from './app/components/SideMenu'

export default {
  path: '/',
  component: App,
	childRoutes: [
    {
			path: 'login',
			component: Login
		},
    {
      path: 'register',
      component: Register
    },
    {
      path: 'cabinet',
      component: Cabinet
    }
  ]
}

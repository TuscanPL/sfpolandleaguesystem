import HomeView from '@/views/HomeView.vue'
const leagueStandings = () => import('@/views/LeagueStandingsView.vue')
const reportScores = () => import('@/views/ReportScoresView.vue')
const upcomingMatches = () => import('@/views/UpcomingMatchesView.vue')
const userSettings = () => import('@/views/UserSettingsView.vue')
const signUp = () => import('@/views/SignUpView.vue')
const loginCallback = () => import('@/views/LoginCallback.vue')
const adminPanel = () => import('@/views/AdminPanelView.vue')

const routerPaths = {
  home: '/:reload?',
  leagueStandings: '/league-standings',
  reportScores: '/report-scores',
  upcomingMatches: '/upcoming-matches',
  userSettings: '/user-settings',
  signUp: '/sign-up',
  loginCallback: '/login-callback',
  adminPanel: '/admin-panel'
}

const routes = [
  {
    path: routerPaths.home,
    name: 'home',
    component: HomeView,
    redirect: { name: 'signUp' }
  },
  {
    path: routerPaths.leagueStandings,
    name: 'leagueStandings',
    component: leagueStandings,
    redirect: { name: 'signUp' }
  },
  {
    path: routerPaths.reportScores,
    name: 'reportScores',
    component: reportScores,
    redirect: { name: 'signUp' }
  },
  {
    path: routerPaths.upcomingMatches,
    name: 'upcomingMatches',
    component: upcomingMatches
  },
  {
    path: routerPaths.userSettings,
    name: 'userSettings',
    component: userSettings,
    redirect: { name: 'signUp' }
  },
  {
    path: routerPaths.signUp,
    name: 'signUp',
    component: signUp
  },
  {
    path: routerPaths.loginCallback,
    name: 'loginCallback',
    component: loginCallback
  },
  {
    path: routerPaths.adminPanel,
    name: 'adminPanel',
    component: adminPanel
  }
]

export { routes, routerPaths }

import HomeView from '@/views/HomeView.vue'
const leagueStandings = () => import('@/views/LeagueStandingsView.vue')
const reportScores = () => import('@/views/ReportScoresView.vue')
const upcomingMatches = () => import('@/views/UpcomingMatchesView.vue')
const userSettings = () => import('@/views/UserSettingsView.vue')

const routerPaths = {
    home: '/',
    leagueStandings: '/league-standings',
    reportScores: '/report-scores',
    upcomingMatches: '/upcoming-matches',
    userSettings: '/user-settings'
}

const routes = [
    {
        path: routerPaths.home,
        name: 'home',
        component: HomeView
    },
    {
        path: routerPaths.leagueStandings,
        name: 'leagueStandings',
        component: leagueStandings
    },
    {
        path: routerPaths.reportScores,
        name: 'reportScores',
        component: reportScores
    },
    {
        path: routerPaths.upcomingMatches,
        name: 'upcomingMatches',
        component: upcomingMatches
    },
    {
        path: routerPaths.userSettings,
        name: 'userSettings',
        component: userSettings
    }
]

export { routes, routerPaths };
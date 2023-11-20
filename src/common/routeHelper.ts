import router from '@/router/index'

function goTo(route: string) {
    router.push(route)
}

export { goTo }
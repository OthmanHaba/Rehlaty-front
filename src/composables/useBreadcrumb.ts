import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

interface BreadcrumbItem {
    title: string
    path: string
    active?: boolean
}

export function useBreadcrumb() {
    const route = useRoute()
    const router = useRouter()
    const breadcrumbItems = ref<BreadcrumbItem[]>([])

    const i18n = useI18n()

    // Function to update breadcrumb items based on current route
    const updateBreadcrumb = () => {
        const paths = route.path.split('/').filter(Boolean)
        const items: BreadcrumbItem[] = []

        // Add home item
        items.push({
            title: i18n.t('app.pages.dashboard'),
            path: '/',
            active: route.path === '/',
        })

        // Build breadcrumb items based on route segments
        let currentPath = ''
        paths.forEach((segment) => {
            currentPath += `/${segment}`
            items.push({
                title: i18n.t(`app.pages.${segment}`),
                path: currentPath,
                active: currentPath === route.path,
            })
        })

        breadcrumbItems.value = items
    }

    // Watch for route changes to update breadcrumb
    watch(
        () => route.path,
        () => {
            updateBreadcrumb()
        },
        { immediate: true },
    )

    // Function to navigate to a breadcrumb item
    const navigateTo = (path: string) => {
        router.push(path)
    }

    return {
        breadcrumbItems,
        navigateTo,
    }
}

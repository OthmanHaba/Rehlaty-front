interface Modal {
    isOpen: boolean
    title: string
    content: string
    onClose: () => void
}

interface DataTableColumn {
    key: string
    label: string
    slot?: string
}

interface Response<T, M> {
    data: T
    meta: M
}

interface Meta {
    title: string
    description: string
    columns: DataTableColumn[]
}

interface Causer {
    id: number
    name: string
    [key: string]: unknown
}

interface Activity {
    id: number
    log_name: string
    description: string
    subject: Array<object> | object
    causer: Causer | null
    event: string
    properties: Array<object> | object
}
interface Record<T> {
    [key: string]: T
}

interface Group {
    id?: number
    name: string
    description?: string
    customers?: Customers[]
    created_at?: string
    updated_at?: string
}
interface Customers {
    id: number
    name: string
    phone: string
    created_at: string
    updated_at: string
    group?: Group
}

export type { Modal, DataTableColumn, Response, Meta, Record, Activity, Group, Causer }

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

export type { Modal, DataTableColumn, Response, Meta }

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

interface Activity {
    id: number;
    log_name: string;
    description: string;
    subject: Array<object>|object;
    causer: Array<object>|object;
    event: string;
    properties: Array<object>|object;
}
interface Record<T> {
    [key: string]: T
}

export type { Modal, DataTableColumn, Response, Meta, Record , Activity}

export interface Customer {
    id: number
    name: string
    phone: string
    gender: 'male' | 'female'
    passportNumber: string
    passportImage?: string | File
}

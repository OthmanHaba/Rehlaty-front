interface Modal {
    isOpen: boolean;
    title: string;
    content: string;
    onClose: () => void;
}


export type { Modal }

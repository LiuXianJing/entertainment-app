export type MessageType = {
    id: string,
    content: string,
    type: 'text' | 'image' | 'video' | 'file' | 'audio',
    ownerType: 'mine' | 'other',
    owner: string,
    time: string | Date,
}
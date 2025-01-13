export interface MapPin {
    id: string;
    coordinates: [number, number];
    title: string;
    description: string;
    type: 'project' | 'skill' | 'experience';
    date: string;
    skills?: string[];
    logo?: string;
}

export interface MapComponentProps {
    initialCenter?: [number, number];
    initialZoom?: number;
    pins?: MapPin[];
}

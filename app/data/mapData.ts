import { MapPin } from '../types/map';

export const samplePins: MapPin[] = [
    {
        id: 'experience-1',
        coordinates: [106.8255125, -6.2471177], // Koltiva
        title: 'Geographic Information System Developer',
        description:
            'Develop and maintain GIS maps for agricultural projects using Geoserver and GeoPandas, ensuring accurate spatial data representation.',
        type: 'experience',
        date: 'September 2023 - Present',
        skills: ['Geoserver', 'GeoPandas', 'Python', 'PostgreSQL', 'PostGIS'],
        logo: 'https://static.wixstatic.com/media/5c106a_b6c754455edb4d5b80396c0241db70ae~mv2.png/v1/fit/w_2500,h_1330,al_c/5c106a_b6c754455edb4d5b80396c0241db70ae~mv2.png',
    },
    {
        id: 'experience-2',
        coordinates: [106.6373389, -6.2911033], // YCorp
        title: 'API Engineer',
        description:
            'Designed and developed REST APIs for ordering platform systems using NestJS, improving system performance by 15%.',
        type: 'experience',
        date: 'January 2023 - September 2023',
        skills: ['NestJS', 'TypeScript', 'Google Cloud', 'Pub/Sub', 'Docker'],
        logo: 'https://media.licdn.com/dms/image/v2/C510BAQElxM8AGlzrVA/company-logo_200_200/company-logo_200_200/0/1631426352162/yummycorp_logo?e=2147483647&v=beta&t=7VW9Vbd9XaAt1oB5dUWaQsf2Fi07-TlHYxcPsYtx_Ws',
    },
    {
        id: 'experience-3',
        coordinates: [106.8278535, -6.2149331], // Sicepat
        title: 'Senior Backend Engineer',
        description:
            'Led backend development for various internal systems and integrations, streamlining processes and enhancing performance.',
        type: 'experience',
        date: 'September 2020 - November 2022',
        skills: ['NestJS', 'Go', 'Krakend', 'Redis', 'PostgreSQL'],
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaaFuc1nsjg0G-xcB8bpiHIIe4nJqGeiG4g&s',
    },
    {
        id: 'experience-4',
        coordinates: [106.8158391, -6.2884022], // IP
        title: 'Full Stack Developer',
        description:
            'Led full-stack development of web applications, including IoT monitoring systems and e-commerce platforms.',
        type: 'experience',
        date: 'September 2017 - September 2020',
        skills: ['Node.js', 'Angular', 'Laravel', 'Vue.js', 'GraphQL'],
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQImZI1okW4SzIECyjd7GzetXXxl8MtidFkZA&s',
    },
    {
        id: 'experience-5',
        coordinates: [106.8192727, -6.1856375], // ekomoditi
        title: 'GIS Programmer',
        description:
            'Developed GIS web applications using LeafletJS, Bootstrap, and PHP CodeIgniter, improving data visualization for clients.',
        type: 'experience',
        date: 'April 2017 - September 2017',
        skills: ['PHP', 'CodeIgniter', 'LeafletJS', 'MySQL', 'Bootstrap'],
        logo: 'https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/0422b7ba64a5d1d31fcd',
    },
    {
        id: 'experience-6',
        coordinates: [110.3844969, -7.0682516], // Semarang
        title: 'GIS Developer',
        description:
            'Developed various GIS-based websites and desktop applications for government and institutional clients.',
        type: 'experience',
        date: 'September 2015 - September 2016',
        skills: [
            'GIS',
            'Web Development',
            'Desktop Applications',
            'Spatial Planning',
        ],
        logo: 'https://img.logoipsum.com/346.svg',
    },
    {
        id: 'experience-7',
        coordinates: [111.4658005, 0.0610884], // Sintang
        title: 'Surveyor',
        description:
            'Conducted land surveys and analysis for agricultural cultivation projects, ensuring optimal land use.',
        type: 'experience',
        date: 'January 2014 - July 2015',
        skills: ['Land Surveying', 'Mapping', 'GIS', 'Field Analysis'],
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG1eSV5MbsdQjWiLQmXdA2PakrMJqsUThizQ&s',
    },
    {
        id: 'experience-8',
        coordinates: [110.3844969, -7.0682516], // Semarang
        title: 'GIS Specialist',
        description:
            'Led GIS projects and managed technical aspects of consulting projects.',
        type: 'experience',
        date: 'July 2011 - December 2013',
        skills: [
            'GIS',
            'Project Management',
            'Technical Writing',
            'Field Surveys',
        ],
        logo: 'https://cvtunas.wordpress.com/wp-content/uploads/2013/05/logo.jpg?w=300',
    },
    {
        id: 'project-1',
        coordinates: [106.8456, -6.2088], // Example coordinates (update as needed)
        title: 'Official Travel Information System',
        description:
            'Comprehensive travel management system for Wijaya Karya Industri dan Konstruksi with real-time updates.',
        type: 'project',
        date: '09/2023 - Present',
        skills: ['Angular 12', 'PostgreSQL', 'Node.js WebSocket', 'Laravel 9'],
        logo: 'https://img.logoipsum.com/346.svg',
    },
    {
        id: 'project-2',
        coordinates: [104.7643, -2.9909], // Palembang
        title: 'BKSDA Palembang Monitoring System',
        description:
            'A comprehensive monitoring system for the Natural Resources Conservation Agency.',
        type: 'project',
        date: '07/2023 - 09/2023',
        skills: [
            'Angular 5',
            'Node.js',
            'Express',
            'PostgreSQL',
            'GeoServer',
            'LeafletJS',
        ],
        logo: 'https://img.logoipsum.com/346.svg',
    },
    {
        id: 'project-3',
        coordinates: [106.8227, -6.1745], // Jakarta
        title: 'Environmental Impact Analysis System',
        description:
            'Advanced system for the Ministry of Environment and Forestry to analyze environmental impacts.',
        type: 'project',
        date: '04/2023 - 07/2023',
        skills: [
            'Vue',
            'Laravel 10',
            'PostgreSQL',
            'ArcGIS Server',
            'ArcGIS JS API',
        ],
        logo: 'https://img.logoipsum.com/346.svg',
    },
    {
        id: 'project-4',
        coordinates: [107.6, -2.7457], // Bangka Belitung
        title: 'Spatial Planning Information System',
        description:
            'Comprehensive spatial planning system implemented for multiple regencies including Banyuasin and Belitung.',
        type: 'project',
        date: '01/2023 - 04/2023',
        skills: ['Vue', 'Laravel 10', 'PostgreSQL', 'Python', 'OpenLayers'],
        logo: 'https://img.logoipsum.com/346.svg',
    },
    {
        id: 'project-5',
        coordinates: [104.7643, -2.9909], // Palembang
        title: 'KKPR Information System',
        description:
            'Land Use Permit system for Banyuasin Regency with advanced spatial features.',
        type: 'project',
        date: '10/2022 - 01/2023',
        skills: ['Vue', 'Laravel 10', 'PostgreSQL', 'Python', 'OpenLayers'],
        logo: 'https://img.logoipsum.com/346.svg',
    },
    {
        id: 'project-6',
        coordinates: [110.3666, -7.8014], // Yogyakarta
        title: 'HRIS for PT Pesonna Optima Jasa',
        description:
            'Complete Human Resource Information System with modern features.',
        type: 'project',
        date: '07/2022 - 10/2022',
        skills: ['Vue', 'Laravel 10', 'PostgreSQL', 'Python', 'Minio'],
        logo: 'https://img.logoipsum.com/346.svg',
    },
    {
        id: 'project-7',
        coordinates: [108.3279, -7.23], // Bandung
        title: 'Heartful Tower Apartment Website',
        description:
            'Modern and responsive website for a luxury apartment complex.',
        type: 'project',
        date: '04/2022 - 07/2022',
        skills: ['Next.js', 'React', 'Tailwind CSS'],
        logo: 'https://img.logoipsum.com/346.svg',
    },
    {
        id: 'project-8',
        coordinates: [106.7921, -6.4025], // Tangerang
        title: 'Galaksi Mineral Indonesia',
        description:
            'Corporate website with modern design and optimal performance.',
        type: 'project',
        date: '01/2022 - 04/2022',
        skills: ['Next.js', 'React', 'Tailwind CSS'],
        logo: 'https://img.logoipsum.com/346.svg',
    },
    {
        id: 'project-9',
        coordinates: [104.7643, -2.9909], // Palembang
        title: 'Monitoring and Evaluation System',
        description:
            'Comprehensive system for Banyuasin Regency to track and evaluate projects.',
        type: 'project',
        date: '10/2021 - 01/2022',
        skills: ['Vue', 'Laravel 8', 'MySQL'],
        logo: 'https://img.logoipsum.com/346.svg',
    },
    {
        id: 'project-10',
        coordinates: [106.8456, -6.2088], // Jakarta
        title: 'Judging Information System',
        description: 'Specialized system for the Ministry of Youth and Sports.',
        type: 'project',
        date: '07/2021 - 10/2021',
        skills: ['Laravel 8', 'MySQL', 'Bootstrap'],
        logo: 'https://img.logoipsum.com/346.svg',
    },
    {
        id: 'project-11',
        coordinates: [110.4258, -7.0051], // Semarang
        title: 'Billboard Information System',
        description:
            'GIS-based system for managing billboard locations in Semarang City.',
        type: 'project',
        date: '04/2021 - 07/2021',
        skills: ['PHP', 'CodeIgniter', 'MySQL', 'LeafletJS'],
        logo: 'https://img.logoipsum.com/346.svg',
    },
    {
        id: 'project-12',
        coordinates: [106.8227, -6.1745], // Jakarta
        title: 'Project Management System',
        description:
            'Custom project management solution with comprehensive features.',
        type: 'project',
        date: '01/2021 - 04/2021',
        skills: ['PHP', 'CodeIgniter', 'MySQL'],
        logo: 'https://img.logoipsum.com/346.svg',
    },
    {
        id: 'project-13',
        coordinates: [104.7643, -2.9909], // Palembang
        title: 'South Sumatra BKSDA Website',
        description:
            'Official website for the Natural Resources Conservation Agency.',
        type: 'project',
        date: '10/2020 - 01/2021',
        skills: ['CodeIgniter', 'Bootstrap', 'MySQL'],
        logo: 'https://img.logoipsum.com/346.svg',
    },
    {
        id: 'project-14',
        coordinates: [106.8456, -6.2088], // Jakarta
        title: 'Billboard Marketplace',
        description:
            'E-commerce platform for PT Adpoint specializing in billboard spaces.',
        type: 'project',
        date: '07/2020 - 10/2020',
        skills: ['Magento', 'PHP', 'MySQL'],
        logo: 'https://img.logoipsum.com/346.svg',
    },
];

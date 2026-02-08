export const BaseCrudService = {
    getAll: async <T>(collectionId: string): Promise<{ items: T[] }> => {
        console.log(`Mock fetching from ${collectionId}`);

        // Default mock data
        const mockData: Record<string, any[]> = {
            aboutme: [{
                _id: '1',
                name: 'Jackie Zhang',
                bio: 'Designer, thinker, and maker based in Cape Town. Crafting digital experiences that feel human, intuitive, and delightful.',
                profileImage: 'https://static.wixstatic.com/media/bc7755_f1933ee8f44443b69977904b940c0b67~mv2.png',
                professionalApproachText: 'I believe in clarity and impact.',
                contactEmail: 'hello@jackie.com'
            }],
            designphilosophy: [
                {
                    _id: 'p1',
                    title: 'Simplicity',
                    description: 'Software should be intuitive.',
                    tagline: 'Less is more.',
                    orderNumber: 1
                },
                {
                    _id: 'p2',
                    title: 'Empathy',
                    description: 'Design for humans.',
                    tagline: 'Users first.',
                    orderNumber: 2
                },
                {
                    _id: 'p3',
                    title: 'Impact',
                    description: 'Make a difference.',
                    tagline: 'Purposeful design.',
                    orderNumber: 3
                }
            ],
            portfolioprojects: [
                {
                    _id: 'proj1',
                    projectTitle: 'E-commerce Redesign',
                    description: 'A complete overhaul of a fashion retailer experience.',
                    clientName: 'Vogue',
                    projectImage: 'https://static.wixstatic.com/media/bc7755_f1933ee8f44443b69977904b940c0b67~mv2.png'
                },
                {
                    _id: 'proj2',
                    projectTitle: 'Health Track App',
                    description: 'Helping users stay on top of their fitness goals.',
                    clientName: 'HealthCo',
                    projectImage: 'https://static.wixstatic.com/media/bc7755_f1933ee8f44443b69977904b940c0b67~mv2.png'
                }
            ]
        };

        return { items: (mockData[collectionId] || []) as T[] };
    }
};

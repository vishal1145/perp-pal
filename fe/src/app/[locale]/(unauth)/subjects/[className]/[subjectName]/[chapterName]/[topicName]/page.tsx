'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Banner } from '@/components/Banner';
import PreppalFooter from '@/components/PreppalFooter';
import Footer from '@/components/Footer';

const TopicPage = () => {
    const { topicName } = useParams();
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        const id = sessionStorage.getItem('TopicId');
        if (id) {
            axios
                .get(`${process.env.NEXT_PUBLIC_Tutor_API_URI}/topicNotes/getTopicNotes?TopicId=${id}`)
                .then((response) => {
                    console.log('API response:', response.data);

                    if (response.data.TopicNotes && response.data.TopicNotes.length > 0) {
                        setContent(response.data.TopicNotes[0].content);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching topic notes:', error);
                });
        }
    }, []);

    return (
        <>
            <Banner notMainPage={true} />
            <div className="min-h-screen bg-gray-50 ">
                <div className='px-4 sm:px-8 py-12'>
                    <h1 className='text-3xl tracking-tight font-extrabold text-gray-900'>{topicName}</h1>

                    <p className=' font-light text-gray-500'>{content || 'No content available.'}</p>
                </div>
                <PreppalFooter />
                <Footer />
            </div>
        </>
    );
};

export default TopicPage;

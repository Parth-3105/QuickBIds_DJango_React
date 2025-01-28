import React, { useState, useEffect } from 'react';
import '../style/Category.css';
import { useNavigate } from 'react-router-dom';

const categories = [
    {
        name: 'Travel',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
                />
            </svg>
        ),
    },
    {
        name: 'Clothing, Shoes & Accessories',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
            </svg>
        ),
    },
    {
        name: 'Home & Garden',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                />
            </svg>
        ),
    },
    {
        name: 'Collectibles',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
            </svg>
        ),
    },
    {
        name: 'Jewelry & Watches',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
            </svg>
        ),
    },
    {
        name: 'Art',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
                />
            </svg>
        ),
    },
    {
        name: 'Antiques',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3Zm9-6v-9c0-1.103-.897-2-2-2h-4.5c-1.103 0-2 .897-2 2v9m9 0v1.5m0 0h-9m9 0v3c0 .552-.447 1-1 1h-3c-.553 0-1-.448-1-1v-3m0 0H6.5m3 0h1.5m-1.5 0V3.75m0 4.5v-1.5c0-.553.447-1 1-1h1.5c.553 0 1 .447 1 1v1.5"
                />
            </svg>
        ),
    },
    // {
    //     name: 'Sports & Outdoors',
    //     icon: (
    //         <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             strokeWidth="1.5"
    //             stroke="currentColor"
    //             className="size-6"
    //         >
    //             <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M4.5 15.75A7.5 7.5 0 0 1 12 9m0 0a7.5 7.5 0 0 1 7.5 7.5m-15 0A7.5 7.5 0 0 0 12 18m0 0a7.5 7.5 0 0 0 7.5-7.5m-15 0A7.5 7.5 0 0 0 12 9M3 21l3-3m3 3h6l3-3m-3 3l3-3"
    //             />
    //         </svg>
    //     ),
    // },
    // {
    //     name: 'Books & Media',
    //     icon: (
    //         <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             strokeWidth="1.5"
    //             stroke="currentColor"
    //             className="size-6"
    //         >
    //             <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M6 4.5h12c1.104 0 2 .896 2 2v11c0 1.104-.896 2-2 2H6c-1.104 0-2-.896-2-2V6.5c0-1.104.896-2 2-2Zm0 0h12m-6 0v15m-6-6h12"
    //             />
    //         </svg>
    //     ),
    // },
    // {
    //     name: 'Real Estate',
    //     icon: (
    //         <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             strokeWidth="1.5"
    //             stroke="currentColor"
    //             className="size-6"
    //         >
    //             <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M3 12l9-9 9 9-9 9-9-9Zm9 9v-3m0 0h3.75M12 21h-3.75m0 0a4.5 4.5 0 0 1-4.5-4.5V12m0 0L3 9.75"
    //             />
    //         </svg>
    //     ),
    // },
];

function Category() {
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if (categoryName) {
            navigate(`/products/category/${categoryName}`);
        }
    }, [categoryName, navigate]);

    return (
        <section className="category">
            <div className="category-list">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="category-item"
                        onClick={() => setCategoryName(category.name)}
                    >
                        {category.icon}
                        <h3>{category.name}</h3>
                    </div>
                ))}
            </div>
            <hr />
        </section>
    );
}

export default Category;

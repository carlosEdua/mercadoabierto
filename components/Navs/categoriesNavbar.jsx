import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; 
import { Dropdown } from 'semantic-ui-react';

const categoriesOptions = [
    {
        key: 'smartphones',
        text: 'Smartphones',
        value: 'smartphones',
        icon: 'mobile alternate'
    },
    {
        key: 'smartwatchs',
        text: 'Smartwatchs',
        value: 'smartwatchs',
        icon: 'clock'
    },
    {
        key: 'laptops',
        text: 'Laptops',
        value: 'laptops',
        icon: 'laptop'
    },
    {
        key: 'video-games',
        text: 'Videogames',
        value: 'video-games',
        icon: 'gamepad'
    },
    {
        key: 'tv',
        text: "TV's",
        value: 'tv',
        icon: 'tv'
    },
    {
        key: 'pc-components',
        text: "PC components",
        value: 'pc-components',
        icon: 'cog'
    },
]

const CategoriesNavbar = () => {

    const { pathname } = useRouter();
    const [value, setValue] = useState('');

    useEffect(() => {
        const actualCategory = /category/.test(pathname) ? pathname.split('/').pop() : '';
        setValue(actualCategory); 
    }, []);

    return (
        <div className="container">
            <Dropdown
                placeholder='category'
                fluid
                selection
                options={categoriesOptions}
                value={value}
                onChange={(ev, data) => setValue(data.value)}
            />

            <style jsx>{`
                .container{
                    width: 160px;
                    margin: 0 12px;
                }
                @media screen and (max-width: 1080px){
                    .container{
                        width: 300px;
                        padding: 20px 0;
                    }
                }
            `}</style>
        </div>
    );
}
 
export default CategoriesNavbar;
import React from 'react';
// components
import AppNavbar from '../Navs/appNavbar';
import Footer from '../Footers/footer';
// style
import s from './layoutsStyle/appLayout.module.css';

const AppLayout = ({ children }) => {
    return (
        <div className={s.container}>
            <AppNavbar />

            <div className={s.children}>
                {children}
            </div>

            <Footer />
        </div>
    );
}
 
export default AppLayout;
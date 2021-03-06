import React from 'react';
import Link from 'next/link';
import { Header, Button } from 'semantic-ui-react';
// store
import { useProductState } from '../../../store/productCreation';
import { useUserInfo } from '../../../store/user';
// style
import s from './product-forms.module.css';

const ProductCreated = ({ responseData }) => {

    const { id_product, cover, title, price } = responseData;
    const { username } = useUserInfo();
    const { isEditing } = useProductState();

    return (
        <div className={s.created}>
            <div className={s.heroCreated} />

            <div className={s.createdContent}>

                <Header as="h2" textAlign="center" content={`Awesome ${username}!`} style={{color: 'white'}}/>
                <Header as="h1" textAlign="center" content={'Your product is ' + isEditing ? 'updated' : 'saved'} style={{color: 'white'}}/>

                <div className={s.createdCard}>
                    <div className={s.left}>
                        <div className={s.leftInfo}>
                            <h2>{title}</h2>
                            <h4>${price}</h4>
                            <Link href={`/product/${id_product}`}>
                                <a>
                                    <Button fluid size="big" primary>View product!</Button>
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className={s.divider} />

                    <div className={s.right}>
                        <img src={cover} alt={title} width="120" />
                    </div>
                </div>

            </div>
        </div>
    );
}
 
export default ProductCreated;
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Message } from 'semantic-ui-react';
// components
import ProductsGrid from '../Products/gridView';
import Loader from '../Loaders/simple';
// requests
import productRequest from '../../requests/products';

const SalesTab = () => {
    const [loading, setLoading] = useState(true);
    const [userProducts, setUserProducts] = useState([]);
    const { query: { params } } = useRouter();

    useEffect(() => {
        const [username] = params;

        productRequest.getAllUserProducts(username)
            .then( products => {
                setUserProducts(products);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            {
                loading
                ?
                <Loader name="instagram" color="var(--black)" />
                :
                userProducts.length
                ?
                <ProductsGrid products={userProducts} />
                :
                <Message content="This user doesn't have products on sale right now" />
            }
        </div>
    );
}
 
export default SalesTab;
import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1,
    };
    
    componentDidMount() {
        this.loadProdutcs();
    };

    loadProdutcs = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo} = response.data;

        this.setState( { products: docs, productInfo, page } );
    };

    prevPage = () => {
        const { page } = this.state;

        if(page === 1) return;

        const pageNumber = page - 1;

        this.loadProdutcs(pageNumber);
    };

    nextPage = () => {
        const { page, productInfo } = this.state;

        if(page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProdutcs(pageNumber);
    };

    render() {
        const { products, productInfo, page } = this.state;
        
        return (
            <div className="product-list">

                {products.map(produtc => (
                   <article key={produtc._id}>
                       <strong>{produtc.title}</strong>
                       <p>{produtc.description}</p>

                       <Link to={`/products/${produtc._id}`}>Acessar</Link>
                   </article>
                ))}

                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}> Anterior </button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}> Próxima </button>
                </div>

            </div>
        )
    };
}
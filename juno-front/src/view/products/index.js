import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { index } from '../../store/actions/products.action'
import { addCart } from '../../store/actions/cart.action'
import Header from '../header'

export default function Products() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.productsReducer.products)

    const [ isLoading, setLoading ] = React.useState(true)

    React.useEffect(() => {
        dispatch(index()).then(res => res && setLoading(false))
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h3 className="font-weight-normal mb-4">Cursos</h3>
                {(isLoading) ? <div className="d-flex justify-content-center mt-5 pt-5"> <CircularProgress /> </div> : 
                    <div className="row">
                        {products.map((item, index) => (
                            <div key={index} className="col-md-3">
                                <div className="card">
                                    <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#868e96"></rect></svg>
                                    <div className="card-body mb-3">
                                        <h5 className="card-title mb-3">{item.title}</h5>
                                        <h4 className="mb-4 text-secondary">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(item.price)}</h4>
                                        <button onClick={() => dispatch(addCart(item))} type="button" className="btn btn-primary">Adicionar ao carrinho</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </>
    )
}

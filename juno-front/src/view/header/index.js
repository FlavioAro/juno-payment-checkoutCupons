import React from 'react'
import { Link } from 'react-router-dom'
import { MdShoppingCart } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { loadCart } from '../../store/actions/cart.action'

export default function Header() {
    const dispatch = useDispatch()
    const { count } = useSelector(state => state.cartReducer)

    React.useEffect(() => {
        dispatch(loadCart())
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <nav className="header navbar navbar-expand-lg navbar-light bg-white p-0">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src="/logo.png" alt="Juno Pagamentos" height="40" />
                </Link>

                <ul className="navbar-nav">
                    <li className="nav-item position-relative">
                        {(count > 0) &&
                            <span className="badge bg-danger badge-cart">{count}</span>
                        }
                        <Link className="nav-link" to="/checkout">
                            <MdShoppingCart className="icon-lg me-2"/> Checkout
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

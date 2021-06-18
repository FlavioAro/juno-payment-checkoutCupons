import React from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { show } from '../../store/actions/payment.action'
import { MdAccessTime, MdCached, MdCheckCircle, MdPrint } from 'react-icons/md'
import Header from '../header'

export default function TransactionShow(props) {
    const dispatch = useDispatch()
    const transaction = useSelector(state => state.paymentReducer.transaction)
    const transaction_id = props.match.params.id || null
    const [isLoading, setLoading] = React.useState(true)

    React.useEffect(() => {
        dispatch(show(transaction_id)).then(res => res && setLoading(false))
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        <Header />
        <div className="container mt-4 pt-3">
            {(isLoading) ? <div className="d-flex justify-content-center mt-5 pt-5"> <CircularProgress /> </div> :
                <>
                    <div className="mb-4">
                        <h3 className="font-weight-normal">{transaction.payNumber}</h3>
                    </div>

                    <div className="card mb-3">
                        <div className="card-header d-flex justify-content-between">
                            <h5 className="mb-md-0">Recebimento</h5>
                            <h4 className="mb-md-0">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.amount)}</h4>
                        </div>
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="me-4">
                                    {(transaction.status === 'ACTIVE') &&
                                        <MdAccessTime className="h1 text-primary" />
                                    }
                                    {(transaction.status === 'PAID') &&
                                        <MdCheckCircle className="h1 text-success" />
                                    }
                                    {(transaction.status === 'FAILED') &&
                                        <MdCached className="h1 text-danger" />
                                    }
                                </div>
                                <div>
                                    <h5>{transaction.description}</h5>
                                    <span className="fw-bold ">{transaction.status}</span>
                                </div>
                            </div>
                        </div>
                        
                        {(transaction.link) &&
                        <div className="card">
                            <div className="card-header d-flex align-items-center pt-3 pb-3">
                                <img className="me-3" alt="" src="/boleto.svg" />
                                <div>
                                    <h5 className="mb-md-0">Boleto de pagamento</h5>
                                    <label className="text-muted">#{transaction.code} - STATUS {transaction.status}</label>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="d-flex">
                                    <a href={transaction.link} target="_blank" rel="noopener noreferrer">
                                        <Button
                                            variant="contained"
                                            size="large"
                                            startIcon={<MdPrint />}
                                            className="mt-3 mb-5 font-weight-bold"
                                        >
                                            Imprimir Boleto
                                            </Button>
                                    </a>
                                </div>
                                <strong>O seu pagamento será aprovado em até 1 ou 3 dias uteis</strong>
                                <label className="text-muted d-block">Enviamos estas informações para o seu e-mail para que você as tenha a mão.</label>
                            </div>
                        </div>
                        }

                        {(!transaction.link) &&
                            <div className="card">
                                <div className="card-header d-flex align-items-center pt-3 pb-3">
                                    <img className="me-3" alt="" src="/card.png" />
                                    <div>
                                        <h5 className="mb-md-0">Cartão de crédito</h5>
                                        <label className="text-muted">#{transaction.code} - Pagamento {transaction.status}</label>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </>
            }
        </div>
        </>
    )
}

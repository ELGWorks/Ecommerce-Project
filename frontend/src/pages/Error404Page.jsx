import { Header } from '../components/Header';
import './Error404Page.css'

export function Error404Page() {
    return (
        <>
            <Header />
            <div className="error-container">
                <p className="error-message">Page not found</p>
            </div>
        </>
    )
}
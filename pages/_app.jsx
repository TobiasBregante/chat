import '../src/App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const MyApp = ({ Component, pageProps })=>{
    return <Component {...pageProps} />
}

export default MyApp
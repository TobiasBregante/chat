import Head from './_head.component'


const Body = ({ children }) => {
    return(
        <>
        <Head/>
        <div className='container-fluid d-flex flex-column min-vh-100'>
            { children }
        </div>
        </>
    )
}

export default Body
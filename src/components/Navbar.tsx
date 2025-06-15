import bgImage from '../assets/bg.png';
import brandImage from '../assets/brand.png';

const Navbar = () => {
    return(
        <nav>
            <img src={bgImage} alt="Background Image" className='bg'/>
            <img src={brandImage} alt="Brand Crud" className='brand'/>
        </nav>
    )
}

export default Navbar;
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-customBlack w-full text-white py-10 mt-10">
            <div className="container mx-auto">
                <ul className="flex flex-wrap justify-center gap-4 md:gap-8 mb-5 md:mb-10">
                    <li className="transition-all cursor-pointer text-xs md:text-base hover:text-pink">
                        Terms Of Use
                    </li>
                    <li className="transition-all cursor-pointer text-xs md:text-base hover:text-pink">
                        Privacy-Policy
                    </li>
                    <li className="transition-all cursor-pointer text-xs md:text-base hover:text-pink">
                        About
                    </li>
                    <li className="transition-all cursor-pointer text-xs md:text-base hover:text-pink">
                        Blog
                    </li>
                    <li className="transition-all cursor-pointer text-xs md:text-base hover:text-pink">
                        FAQ
                    </li>
                </ul>
                <div className="text-xs md:text-sm text-center opacity-50 mb-5 md:mb-10 max-w-md mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                </div>
                <div className="flex justify-center gap-4">
                    <span className="w-12 h-12 flex items-center justify-center rounded-full bg-black transition-all hover:shadow-pink">
                        <FaFacebookF />
                    </span>
                    <span className="w-12 h-12 flex items-center justify-center rounded-full bg-black transition-all hover:shadow-pink">
                        <FaInstagram />
                    </span>
                    <span className="w-12 h-12 flex items-center justify-center rounded-full bg-black transition-all hover:shadow-pink">
                        <FaTwitter />
                    </span>
                    <span className="w-12 h-12 flex items-center justify-center rounded-full bg-black transition-all hover:shadow-pink">
                        <FaLinkedin />
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

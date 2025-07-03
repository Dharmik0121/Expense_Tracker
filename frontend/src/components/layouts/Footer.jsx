const Footer = () => {
    return (
        <footer className="text-center border-t border-gray-200/50 bg-gray-100 text-sm text-gray-500 py-4">
            © {new Date().getFullYear()} Expense Tracker • Built by Dharmik
        </footer>
    );
};

export default Footer;
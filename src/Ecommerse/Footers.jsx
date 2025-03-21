export const Footers = () => {
    return (
        <div className="bg-gray-800 text-white py-8">
            <footer className="max-w-screen-xl mx-auto px-4">
                <ul className="flex justify-between space-x-8">
                    <li className="flex flex-col space-y-2">
                        <span className="font-bold">Contact No.</span>
                        <span>931320....</span>
                    </li>
                    <li className="flex flex-col space-y-2">
                        <span className="font-bold">E-mail Address</span>
                        <span>mehtaneer@gmail.com</span>
                    </li>
                    <li className="flex flex-col space-y-2">
                        <span className="font-bold">Address</span>
                        <span>Ahmedabad</span>
                    </li>
                </ul>
            </footer>
        </div>
    );
};

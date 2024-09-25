import { Avatar, Dropdown, Navbar } from "flowbite-react";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";

import React, { useState, useEffect } from "react";
import MainCard from "./MainCard";

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  const [currentId, SetCurrentId] = useState("electronics");

  const [electronics, setElectronics] = useState([]); // State for storing fetched data

  const [clothings, setClothings] = useState([]);
  const [appliances, setAppliances] = useState([]);
  const [beatuyProducts, setBeatuyProducts] = useState([]);

  const [loading, setLoading] = useState(true); // State for loading status

  const [searchQuery, setSearchQuery] = useState("");

  const allItems = [
    ...electronics,
    ...clothings,
    ...appliances,
    ...beatuyProducts,
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async (category, state) => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/${category}`);

        if (!res.ok) {
          // Check if response is not ok
          throw new Error("Network response was not ok");
        }

        const data = await res.json();

        state(data); // Update state with fetched data
      } catch (error) {
        console.log(error.message); // Log error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchData("electronics", setElectronics);
    fetchData("clothings", setClothings);
    fetchData("homeappliances", setAppliances);
    fetchData("beautyproducts", setBeatuyProducts);
  }, []);

  const handleNavClick = (id) => {
    SetCurrentId(id);
  };
  return (
    <div className="">
      {/* HEADER  */}

      <header
        className={`w-full sticky top-0  z-50  
         `}
      >
        <Navbar fluid rounded className="bg-slate-200">
          <Navbar.Brand className="     p-1 bg-gradient-to-r from-blue-500 to-pink-500 rounded-lg">
            <div className="bg-white flex p-1">
              <img
                src="/cart.png"
                className="mr-3 h-6 sm:h-9   "
                alt="cart Logo"
              />
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white gra">
                <i className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                  SHOPPERS STOP
                </i>
              </span>
            </div>
          </Navbar.Brand>

          {/* INPUT AND CART  */}

          <div className="flex justify-center items-center p-4">
            <div className="relative flex items-center">
              <input
                type="text"
                className="w-full py-2 px-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Search products..."
                onChange={handleSearchChange}
              />
              <FaSearch
                color="blue"
                size={20}
                className="absolute right-2 text-gray-500 cursor-pointer"
              />
            </div>
          </div>

          {/* CART  */}
          <div className="relative flex items-center">
            <FaShoppingCart color="blue" size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-4  text-white bg-orange-400 rounded-full text-sm font-bold  px-2 py-0.5  ">
                {cartCount}
              </span>
            )}
          </div>

          {/* DROPDOWN  */}

          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img="/user.png" rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@shoppersstop.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item className="flex gap-1">
                Cart <FaShoppingCart color="pink" size={20} />{" "}
              </Dropdown.Item>
              <Dropdown.Item>My-Orders</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link
              href="#electronics"
              active={currentId === "electronics"}
              onClick={() => handleNavClick("electronics")}
            >
              Electronics
            </Navbar.Link>
            <Navbar.Link
              href="#clothings"
              active={currentId === "clothings"}
              onClick={() => handleNavClick("clothings")}
            >
              Clothings
            </Navbar.Link>
            <Navbar.Link
              href="#homeappliances"
              active={currentId === "homeappliances"}
              onClick={() => handleNavClick("homeappliances")}
            >
              Home-Appliances
            </Navbar.Link>
            <Navbar.Link
              href="#beautyproducts"
              active={currentId === "beautyproducts"}
              onClick={() => handleNavClick("beautyproducts")}
            >
              Beauty-Products
            </Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </header>

      {/* MAIN  */}

      <main className="mt-2">
        {filteredItems > 0 ? (
          <MainCard
            loading={loading}
            items={filteredItems} // Pass filtered items to MainCard
            setCartCount={setCartCount}
          />
        ) : (
          <>
            <MainCard
              loading={loading}
              items={electronics}
              setCartCount={setCartCount}
            />
            <MainCard
              loading={loading}
              items={clothings}
              setCartCount={setCartCount}
            />
            <MainCard
              loading={loading}
              items={appliances}
              setCartCount={setCartCount}
            />
            <MainCard
              loading={loading}
              items={beatuyProducts} // Fixed typo from 'beatuyProducts'
              setCartCount={setCartCount}
            />
          </>
        )}
      </main>

      {/* FOOTER  */}
      <footer className=" bg-slate-200 text-gray-800 py-8  ">
        <div className="container mx-auto text-center flex flex-col justify-center items-center gap-2">
          {/* BRAND LOGO  */}
          <div className=" p-1 bg-gradient-to-r from-blue-500 to-pink-500 rounded-lg w-fit ">
            <div className="bg-white flex p-1">
              <img
                src="/cart.png"
                className="mr-3 h-6 sm:h-9   "
                alt="cart Logo"
              />
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white gra">
                <i className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                  SHOPPERS STOP
                </i>
              </span>
            </div>
          </div>

          <p className="mb-4">Follow us on social media:</p>

          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-3xl hover:text-blue-500" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-3xl hover:text-blue-400" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-3xl hover:text-pink-500" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-3xl hover:text-blue-700" />
            </a>
          </div>

          <p className="text-sm">
            &copy; {new Date().getFullYear()} Shoppers Stop. All Rights
            Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

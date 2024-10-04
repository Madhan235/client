import React, { useState } from "react";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { ModalComp } from "./ModalComp";
import Review from "./Review";
import confetti from "canvas-confetti";

export default function ProductCard({ product, setCartCount }) {
  const [showModal, setShowModal] = useState(false);

  function triggerConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
  const handleCart = () => {
    setCartCount((prev) => prev + 1);
    triggerConfetti();
  };
  return (
    <div className=" text-center m-3">
      {showModal && (
        <ModalComp
          showModal={showModal}
          setShowModal={setShowModal}
          product={product}
          setCartCount={setCartCount}
        />
      )}
      <Card className="max-w-xs mt-8  ">
        <img
          alt={product.name}
          src={product.img}
          className="card-img cursor-pointer"
          onClick={() => setShowModal(true)}
        />

        <Link to={"/"}>
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.name.length > 12 && product.name.substring(0, 15) + "..."}
          </h5>
        </Link>

        <p className="text-lg leading-relaxed text-gray-800   font-semibold flex justify-center">
          <Review />
        </p>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-black-800 dark:text-white mr-1">
            ₹{product.price}
          </span>
          <Button
            gradientDuoTone={"purpleToPink"}
            className="rounded-lg   px-5 py-2.5 text-center text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-cyan-300  "
            onClick={handleCart}
          >
            Add to cart
          </Button>
        </div>
      </Card>
    </div>
  );
}

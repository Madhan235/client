import { Button, Modal } from "flowbite-react";
import Review from "./Review";

export function ModalComp({ showModal, setShowModal, product, setCartCount }) {
  const handleClick = () => {
    setCartCount((prev) => prev + 1);
    setShowModal(false);
  };
  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)} className=" ">
        <Modal.Header className="mx-auto">
          <img src={product.img} className="card-img" alt="Product" />
        </Modal.Header>

        <Modal.Body className="text-center">
          <div className="space-y-6">
            <p className="leading-relaxed text-gray-900  text-xl font-semibold">
              {product.name}
            </p>
            <p className="text-lg leading-relaxed text-gray-800   font-semibold">
              ₹ {product.price}
            </p>
            <p className="text-lg leading-relaxed text-gray-800   font-semibold cursor-pointer   flex justify-center">
              <Review />
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center">
          <Button gradientDuoTone={"purpleToPink"} onClick={handleClick}>
            Add to Cart
          </Button>
          {/* <Button color="gray" onClick={() => setShowModal(false)}>
            Decline
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

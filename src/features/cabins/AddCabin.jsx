import Button from "../../ui/Button";import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export function AddCabin(){
    return (
        <Modal>
            <Modal.Open opens="cabin-form">
                <div>
                <Button>Add new Cabin</Button>
                </div>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateCabinForm/>
            </Modal.Window>
        </Modal>
    )
}

// export function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal(!isOpenModal)}>
//         Add new Cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={()=> setIsOpenModal(false)}>
//           <CreateCabinForm onClose={()=> setIsOpenModal(false)}/>
//         </Modal>
//       )}
//     </div>
//   );
// }
